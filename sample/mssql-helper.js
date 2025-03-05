"use strict";
var allProcedureInfo = require("./procedure-info").procedureInfo;
var commonLib = require("./commonLib");
const { createClient } = require('redis');
var logger = require("./logger");
var pool = null;
const sql = require('mssql');  // mssql 모듈 추가

// env 모듈 대신 dotenv 사용
require('dotenv').config();
const env = process.env;

var _options = {
  CACHE_TTL: 3600 // 1시간
};

// Redis 클라이언트 설정
const redisClient = createClient({
  socket: {
    host: 'localhost',
    port: 6379,
    connectTimeout: 10000,  // 타임아웃 증가
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        logger.error("Redis: Max reconnection attempts reached");
        return new Error("Max reconnection attempts reached");
      }
      return Math.min(retries * 100, 3000); // 재시도 간격 조정
    }
  },
  legacyMode: false
});

// Redis 이벤트 핸들러
redisClient.on('error', (err) => {
  logger.error('Redis Error: ' + err);
});

redisClient.on('reconnecting', () => {
  logger.info('Redis: Attempting to reconnect...');
});

redisClient.on('connect', () => {
  logger.info('Redis: Successfully connected');
});

// Redis 연결 함수
async function connectRedis() {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      logger.info('Redis Cache Connected');
    }
  } catch (err) {
    logger.error('Redis Cache Connection Failed: ' + err);
    // 연결 실패시 5초 후 재시도
    setTimeout(connectRedis, 5000);
  }
}

// 초기 연결 시도
connectRedis();

// 데이터베이스 설정 디버깅
logger.info("Database Configuration Check:", {
  server: env.MSSQL_SERVER || 'not set',
  database: env.MSSQL_DATABASE || 'not set',
  user: env.MSSQL_USER || 'not set',
  port: env.MSSQL_PORT || 'not set'
});

const config = {
  user: env.MSSQL_USER,
  password: env.MSSQL_PASSWORD,
  server: env.MSSQL_SERVER,
  database: env.MSSQL_DATABASE,
  port: parseInt(env.MSSQL_PORT),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  connectionTimeout: 30000,
  requestTimeout: 30000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

// 중복 연결 제거
async function init() {
    try {
        if (!pool) {
            // 설정 객체 유효성 검사
            if (!config.server || !config.database || !config.user || !config.password) {
                const error = new Error("Database configuration is incomplete. Please check your environment variables.");
                logger.error(error.message);
                throw error;
            }
            pool = await sql.connect(config);
            logger.info("Database connection pool created successfully");
        }
        return pool;
    } catch (err) {
        logger.error("Create connection pool failed: " + err);
        logger.error("Please check your database configuration and connection.");
        throw err;  // 에러를 상위로 전파
    }
}

// 초기 연결 시도
init().catch(err => {
    logger.error("Initial database connection failed:", err);
    // 데이터베이스 연결 실패 시 재시도 로직 추가
    setTimeout(() => {
        logger.info("Attempting to reconnect to database...");
        init().catch(err => {
            logger.error("Database reconnection failed:", err);
        });
    }, 5000);  // 5초 후 재시도
});

var callProcedure = async (procedureName, params) => {
  try {
    logger.info("callProcedure start - " + procedureName);
    logger.info("Parameters:", params);  // 파라미터 로깅 추가

    var procedureInfo = allProcedureInfo.getProcedureInfo(procedureName);
    
    if (commonLib.isNull(procedureInfo)) {
      logger.error("Failed to find procedure info for: " + procedureName);
      throw new Error("Failed to find procedure information");
    }

    if (!paramsCheck(procedureInfo, params)) {
      logger.error("Parameter check failed for: " + procedureName);
      logger.error("Required params:", procedureInfo.params);
      logger.error("Received params:", params);
      throw new Error("Parameter check failed");
    }

    const request = await getRequest();
    const preparedRequest = settingRequestParams(request, procedureInfo, params);
    
    if (!preparedRequest) {
      throw new Error("Failed to prepare request parameters");
    }

    const returnData = await executeProcedure(preparedRequest, procedureName);
    
    if (!returnData) {
      throw new Error("Procedure execution failed");
    }

    logger.info("Procedure result:", returnData);  // 결과 로깅 추가
    return returnData;

  } catch (error) {
    logger.error("Error in callProcedure(" + procedureName + "):", error);
    throw error;
  }
};

async function getRequest() {
  try {
    if (!pool) {
      logger.info("Pool not initialized, attempting to connect...");
      await init();  // pool 초기화 시도
      if (!pool) {
        throw new Error("Database pool initialization failed");
      }
    }
    var request = await pool.request();
    return request;
  } catch (err) {
    logger.error("getRequest failed : " + err);
    throw err;  // 에러를 throw하여 상위에서 처리하도록 함
  }
}

function getCacheKey(procedureName, procedureInfo, params) {
  var cacheKey = "proc:" + procedureName + ":";
  var defiendParams = procedureInfo.params;
  
  for (var i = 0; i < defiendParams.length; i++) {
    var paramName = defiendParams[i].name;
    var paramValue = commonLib.isNull(params[paramName]) ? "" : params[paramName];
    cacheKey += paramName + "=" + paramValue + ":";
  }
  
  return cacheKey;
}

function paramsCheck(procedureInfo, params) {
  var defiendParams = procedureInfo.params;
  var paramInfo = null;
  var paramName = "";
  var paramType = "";
  var required = false;
  var paramValue = "";
  for (var i = 0; i < defiendParams.length; i++) {
    paramInfo = defiendParams[i];
    paramName = paramInfo.name;
    paramType = paramInfo.type;
    required = paramInfo.required;

    paramValue = params[paramName];
    logger.info("NAME : " + paramName + ", VALUE : " + paramValue);
    if (commonLib.isNull(paramValue)) {
      if (required) {
        logger.error("paramsCheck failed");
        return false;
      }
    }
  }
  return true;
}

function settingRequestParams(request, procedureInfo, params) {
  var defiendParams = procedureInfo.params;
  var paramInfo = null;
  var paramName = "";
  var paramType = "";
  var required = false;
  var paramValue = "";

  for (var i = 0; i < defiendParams.length; i++) {
    paramInfo = defiendParams[i];
    paramName = paramInfo.name;
    paramType = paramInfo.type;
    required = paramInfo.required;

    paramValue = params[paramName];
    if (commonLib.isNull(paramValue)) {
      if (required) {
        logger.error("settingRequestParams failed");
        return null;
      } else {
        paramValue = "";
      }
    }
    request.input(paramName, paramType, paramValue);
  }
  return request;
}

async function executeProcedure(request, procedureName) {
  try {
    var returnData = await request.execute(procedureName);
    return returnData;
  } catch (err) {
    logger.error("executeProcedure failed : " + err);
    return null;
  }
}

exports.callProcedure = callProcedure;
