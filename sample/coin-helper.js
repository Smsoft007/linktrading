const commonLib = require('./commonLib');
const Web3 = require('web3');
const logger = require('../lib/logger');
const resolve = require('path');
const appRoot = require('app-root-path');
const keythereum = require('keythereum-pure-js');
const sqlHelper = require('./mssql-helper');
const tronCoinHelper = require('./tron-helper');
const coinhelper = require('./web3-helper');
const fs = require('fs');
const { send } = require('process');
//erc20 , bep20 처리

// 테스트 진행  환경 설정 정보 및 인스턴스 생성
coinInfo = {
  BEP: {
    provider: 'https://bsc-dataseed.binance.org/',
    token: '0x55d398326f99059fF775485246999027B3197955',
    abiPath: '../abi/bscUsdt.json',
  },
  BET: {
    provider: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    token: '0xEe127932C2c1409f779F4B752262946F1Be40F51',

    abiPath: '../abi/bscSUsdt.json',
  },
  ERC: {
    provider: 'https://mainnet.infura.io/v3/19503f2f97db4c85a9d3e91ed82bc3f2',
    token: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    abiPath: '../abi/ethUsdt.json',
  },
};

exports.createEthAddress = (pass) => {
  logger.info('create ethereum address');
  const dk = keythereum.create({
    keyBytes: 32,
    ivBytes: 16,
  });

  const keyObject = keythereum.dump(pass, dk.privateKey, dk.salt, dk.iv, {
    kdf: 'pbkdf2',
    cipher: 'aes-128-ctr',
    kdfparams: {
      c: 262144,
      dklen: 32,
      prf: 'hmac-sha256',
    },
  });
  keythereum.exportToFile(keyObject, appRoot.path + '/keystore');
  logger.info(`create eth key is 0x${keyObject.address}`);
  logger.info(`create eth pass is ${pass}`);
  return '0x' + keyObject.address;
};

exports.handleBEPTransfer = async (sendInfo) => {
  // 토큰 전송을 위한 잔액 확인
  const bnbBalance = await coinhelper.getBalance('BEP', sendInfo.MS_RECIVEADDR);
  const bepusdtBalance = await coinhelper.getBusdtBalance(
    sendInfo.MS_RECIVEADDR
  );

  logger.info(`BNB 잔액: ${bnbBalance}`);
  logger.info(`BEPUSDT 잔액: ${bepusdtBalance}`);
  logger.info(`bepusdtBalance: ${bepusdtBalance}`);
  logger.info(`sendInfo.MS_AMT1: ${sendInfo.MS_AMT1-2}`);
  
  // 잔액 확인 후 가스 가격과 가스 한도 조회
  if ((bepusdtBalance ) >= sendInfo.MS_AMT1- 2.00000 ) {
    const { gasPrice, gasLimit, requiredGasWei, requiredGasBNB } =
      await coinhelper.calculateGasCost(
        'BEP',
        sendInfo.MS_RECIVEADDR,
        sendInfo.MS_RADDR,
        sendInfo.MS_AMT1 // 전송시 가스비 계산 amount
      );

    logger.info(`현재 가스 가격 (Wei): ${gasPrice}`);
    logger.info(`추정 가스 비용 (Wei): ${requiredGasWei}`);
    logger.info(`추정 전송 비용 (BNB): ${requiredGasBNB}`);

    const bnbAmount = parseFloat(requiredGasBNB);
    let bnb_txid;
    let usdt_txid;

    // 가스 한도 있고 보내려는 잔액도 보유하고 있는 경우
    if (bepusdtBalance >= 0 && bnbBalance >= bnbAmount) {
      logger.info('가스 비용이 충분 USDT 전송 시작 !');
      const decimals = 18; // USDT 토큰의 소수점 자릿수
      // const usdtAmount = sendInfo.MS_AMT1 * Math.pow(10, decimals); // USDT의 decimals를 고려한 금액 계산
      usdt_txid = await coinhelper.transferbepUSDT(
        'BEP',
        sendInfo.MS_RADDR,
        sendInfo.MS_RECIVEADDR,
        bepusdtBalance,
        sendInfo.PRIVATE_KEY
      );

      logger.info(`USDT 전송 결과: ${usdt_txid}`);

      if (usdt_txid) {
        logger.info('USDT 전송 성공');
        var Param = {
          D_NO: sendInfo.MS_DNO,
          MS_KEY: sendInfo.MS_KEY,
          QTY: sendInfo.MS_QTY,
          GCODE: sendInfo.MS_GPCODE,
          AMOUNT: sendInfo.MS_AMT1, // 실제 전송된 금액으로 기록
          TXID: usdt_txid,
          RATE: '0.1',
          GUBUN: sendInfo.MS_SNAME,
        };
        await sqlHelper.callProcedure('SP_COIN_COMPLETE', Param);
      } else {
        logger.error('USDT 전송 실패');
      }
    } else {
      bnb_txid = await coinhelper.transferBep(
        'BEP',
        sendInfo.MS_RECIVEADDR,
        bnbAmount,
        sendInfo.AD_ADDR,
        sendInfo.AD_PRIVATE_KEY
      );

      if (bnb_txid && bepusdtBalance > 0) {
        logger.info('2 => BNB 전송 완료 수수료 TXID : ' + bnb_txid);
        // const usdtAmount = sendInfo.MS_AMT1 * Math.pow(10, decimals);
        usdt_txid = await coinhelper.transferbepUSDT(
          'BEP',
          sendInfo.MS_RADDR,
          sendInfo.MS_RECIVEADDR,
          bepusdtBalance,
          sendInfo.PRIVATE_KEY
        );
        logger.info(`USDT 전송 결과: ${usdt_txid}`);

        if (usdt_txid) {
          logger.info('USDT 전송 성공');
          var Param = {
            D_NO: sendInfo.MS_DNO,
            MS_KEY: sendInfo.MS_KEY,
            QTY: sendInfo.MS_QTY,
            GCODE: sendInfo.MS_GPCODE,
            AMOUNT: sendInfo.MS_AMT1, // 실제 전송된 금액으로 기록
            TXID: usdt_txid,
            RATE: '0.1',
            GUBUN: sendInfo.MS_SNAME,
          };
          await sqlHelper.callProcedure('SP_COIN_COMPLETE', Param);
        } else {
          logger.error('USDT 전송 실패');
        }
      }
    }
  } else {
    logger.error('잔액 부족으로 전송을 진행할 수 없습니다.');
  }
};

// ##################TRX ########################################
exports.handleTRCTransfer = async function (sendInfo) {
  const usdtFee = 30; // USDT 전송에 필요한 TRX 수수료
  const trxFee = 1; // 일반 TRX 전송에 필요한 수수료
  let txid = null;

  // 토큰 잔액 및 TRX 잔액 확인
  const balance = await tronCoinHelper.getTRXBalance(sendInfo.MS_RECIVEADDR);
  const trcBalance = await tronCoinHelper.getTRCBalance(sendInfo.MS_RECIVEADDR);
  logger.info(`TRX 잔액: ${balance}`);
  logger.info(`TRC 잔액: ${trcBalance}`);

  // TRC 토큰 전송 로직
  if (trcBalance >= sendInfo.MS_AMT1 && balance >= usdtFee) {
    logger.info('TRC 토큰 및 TRX 수수료 잔액이 충분하여 USDT 전송 시작');
    txid = await tronCoinHelper.transferUSDT(
      sendInfo.MS_RADDR,
      sendInfo.MS_AMT1,
      sendInfo.MS_RECIVEADDR,
      sendInfo.PRIVATE_KEY
    );
  } else if (trcBalance >= sendInfo.MS_AMT1) {
    const trxAmount = usdtFee - balance; // 필요한 TRX 수량 계산
    logger.info(`TRX 수수료 부족. 추가로 필요한 TRX 수량: ${trxAmount}`);
    // TRX를 이체하여 수수료 보충
    txid = await tronCoinHelper.transferTrx(
      sendInfo.MS_RECIVEADDR,
      trxAmount,
      sendInfo.AD_ADDR,
      sendInfo.AD_PRIVATE_KEY
    );

    // TRX 이체 후 USDT 이체 시도
    if (txid != null) {
      logger.info('추가 TRX 이체 성공. USDT 전송 시도');
      txid = await tronCoinHelper.transferUSDT(
        sendInfo.MS_RADDR,
        sendInfo.MS_AMT1,
        sendInfo.MS_RECIVEADDR,
        sendInfo.PRIVATE_KEY
      );
    }
  }

  // 트랜잭션 성공 여부에 따른 후속 처리
  if (txid != null) {
    logger.info(`트랜잭션 성공. TXID: ${txid}`);
    var Param = {
      D_NO: sendInfo.MS_DNO,
      MS_KEY: sendInfo.MS_KEY,
      QTY: sendInfo.MS_QTY,
      GCODE: sendInfo.MS_GPCODE,
      AMOUNT: sendInfo.MS_AMT1, // 실제 전송된 금액으로 기록
      TXID: txid,
      RATE: '0.1',
      GUBUN: sendInfo.MS_SNAME,
    };
    await sqlHelper.callProcedure('SP_COIN_COMPLETE', Param);
  } else {
    logger.error(`트랜잭션 실패', ${sendInfo.MS_KEY}`);
  }
};
// ##################TRX ########################################
