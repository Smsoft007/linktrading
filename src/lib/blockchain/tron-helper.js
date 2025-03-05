/**
 * Tron Helper
 * Tron 블록체인과 상호작용하기 위한 유틸리티 함수들
 */

const TronWeb = require('tronweb');

// 네트워크 설정
const NETWORKS = {
  mainnet: {
    fullNode: 'https://api.trongrid.io',
    solidityNode: 'https://api.trongrid.io',
    eventServer: 'https://api.trongrid.io',
    explorer: 'https://tronscan.org'
  },
  shasta: {
    fullNode: 'https://api.shasta.trongrid.io',
    solidityNode: 'https://api.shasta.trongrid.io',
    eventServer: 'https://api.shasta.trongrid.io',
    explorer: 'https://shasta.tronscan.org'
  }
};

// USDT 컨트랙트 주소 (TRC20)
const USDT_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'; // Tron 메인넷 USDT

/**
 * TronWeb 인스턴스 가져오기
 * @param {boolean} isTestnet - 테스트넷 사용 여부
 * @param {string} privateKey - 개인키 (선택 사항)
 * @returns {TronWeb} TronWeb 인스턴스
 */
function getTronWebInstance(isTestnet = false, privateKey = null) {
  const network = isTestnet ? NETWORKS.shasta : NETWORKS.mainnet;
  
  const tronWeb = new TronWeb(
    network.fullNode,
    network.solidityNode,
    network.eventServer
  );
  
  if (privateKey) {
    tronWeb.setPrivateKey(privateKey);
  }
  
  return tronWeb;
}

/**
 * 새 Tron 지갑 생성
 * @returns {Promise<Object>} 생성된 지갑 정보 (주소, 개인키, 공개키)
 */
async function createTron() {
  try {
    const tronWeb = getTronWebInstance();
    const account = await tronWeb.createAccount();
    
    return {
      address: {
        base58: account.address.base58,
        hex: account.address.hex
      },
      privateKey: account.privateKey,
      publicKey: account.publicKey
    };
  } catch (error) {
    console.error(`Tron 지갑 생성 오류: ${error.message}`);
    throw error;
  }
}

/**
 * TRX 잔액 조회
 * @param {string} address - 지갑 주소 (base58 형식)
 * @param {boolean} isTestnet - 테스트넷 사용 여부
 * @returns {Promise<string>} TRX 잔액
 */
async function getTRXBalance(address, isTestnet = false) {
  try {
    const tronWeb = getTronWebInstance(isTestnet);
    const balanceSun = await tronWeb.trx.getBalance(address);
    
    // Sun에서 TRX로 변환 (1 TRX = 1,000,000 Sun)
    return (balanceSun / 1000000).toString();
  } catch (error) {
    console.error(`TRX 잔액 조회 오류: ${error.message}`);
    throw error;
  }
}

/**
 * 주소가 활성화되었는지 확인
 * @param {string} address - 지갑 주소 (base58 형식)
 * @param {boolean} isTestnet - 테스트넷 사용 여부
 * @returns {Promise<boolean>} 활성화 여부
 */
async function isAddressActivated(address, isTestnet = false) {
  try {
    const tronWeb = getTronWebInstance(isTestnet);
    const account = await tronWeb.trx.getAccount(address);
    
    return Object.keys(account).length > 0;
  } catch (error) {
    return false;
  }
}

/**
 * USDT(TRC20) 잔액 조회
 * @param {string} address - 지갑 주소 (base58 형식)
 * @param {boolean} isTestnet - 테스트넷 사용 여부
 * @returns {Promise<string>} USDT 잔액
 */
async function getUSDTBalance(address, isTestnet = false) {
  try {
    const tronWeb = getTronWebInstance(isTestnet);
    const contract = await tronWeb.contract().at(USDT_CONTRACT);
    
    const balance = await contract.balanceOf(address).call();
    const decimals = await contract.decimals().call();
    
    // 적절한 소수점으로 변환
    return (balance.toString() / Math.pow(10, decimals)).toString();
  } catch (error) {
    console.error(`USDT 잔액 조회 오류: ${error.message}`);
    throw error;
  }
}

/**
 * TRX 전송
 * @param {string} toAddress - 받는 주소 (base58 형식)
 * @param {string} amount - 전송할 TRX 금액
 * @param {string} privateKey - 보내는 지갑의 개인키
 * @param {boolean} isTestnet - 테스트넷 사용 여부
 * @returns {Promise<Object>} 트랜잭션 결과
 */
async function transferTRX(toAddress, amount, privateKey, isTestnet = false) {
  try {
    const tronWeb = getTronWebInstance(isTestnet, privateKey);
    
    // TRX를 Sun으로 변환 (1 TRX = 1,000,000 Sun)
    const amountSun = Math.floor(parseFloat(amount) * 1000000);
    
    const transaction = await tronWeb.trx.sendTransaction(
      toAddress,
      amountSun
    );
    
    return transaction;
  } catch (error) {
    console.error(`TRX 전송 오류: ${error.message}`);
    throw error;
  }
}

/**
 * USDT(TRC20) 전송
 * @param {string} toAddress - 받는 주소 (base58 형식)
 * @param {string} amount - 전송할 USDT 금액
 * @param {string} privateKey - 보내는 지갑의 개인키
 * @param {boolean} isTestnet - 테스트넷 사용 여부
 * @returns {Promise<Object>} 트랜잭션 결과
 */
async function transferUSDT(toAddress, amount, privateKey, isTestnet = false) {
  try {
    const tronWeb = getTronWebInstance(isTestnet, privateKey);
    const contract = await tronWeb.contract().at(USDT_CONTRACT);
    
    // 소수점 처리
    const decimals = await contract.decimals().call();
    const amountToSend = Math.floor(parseFloat(amount) * Math.pow(10, decimals));
    
    const transaction = await contract.transfer(
      toAddress,
      amountToSend.toString()
    ).send();
    
    return transaction;
  } catch (error) {
    console.error(`USDT 전송 오류: ${error.message}`);
    throw error;
  }
}

/**
 * 트랜잭션 상태 확인
 * @param {string} txId - 트랜잭션 ID
 * @param {boolean} isTestnet - 테스트넷 사용 여부
 * @returns {Promise<Object>} 트랜잭션 정보
 */
async function getTransactionInfo(txId, isTestnet = false) {
  try {
    const tronWeb = getTronWebInstance(isTestnet);
    const txInfo = await tronWeb.trx.getTransactionInfo(txId);
    
    if (!txInfo || Object.keys(txInfo).length === 0) {
      return { status: 'pending' };
    }
    
    return {
      status: txInfo.receipt?.result === 'SUCCESS' ? 'success' : 'failed',
      blockNumber: txInfo.blockNumber,
      fee: txInfo.fee,
      result: txInfo.receipt?.result,
      info: txInfo
    };
  } catch (error) {
    console.error(`트랜잭션 정보 조회 오류: ${error.message}`);
    throw error;
  }
}

/**
 * 트랜잭션 수수료 추정
 * @param {string} fromAddress - 보내는 주소 (base58 형식)
 * @param {string} toAddress - 받는 주소 (base58 형식)
 * @param {string} amount - 전송할 TRX 금액
 * @param {boolean} isTestnet - 테스트넷 사용 여부
 * @returns {Promise<Object>} 수수료 정보
 */
async function estimateFee(fromAddress, toAddress, amount, isTestnet = false) {
  try {
    const tronWeb = getTronWebInstance(isTestnet);
    
    // TRX를 Sun으로 변환
    const amountSun = Math.floor(parseFloat(amount) * 1000000);
    
    // 트랜잭션 생성 (서명하지 않음)
    const transaction = await tronWeb.transactionBuilder.sendTrx(
      toAddress,
      amountSun,
      fromAddress
    );
    
    // 기본 수수료는 약 0.1 TRX
    return {
      estimatedFee: '0.1 TRX',
      bandwidth: 'Approximately 200-300 bandwidth points'
    };
  } catch (error) {
    console.error(`수수료 추정 오류: ${error.message}`);
    throw error;
  }
}

module.exports = {
  getTronWebInstance,
  createTron,
  getTRXBalance,
  isAddressActivated,
  getUSDTBalance,
  transferTRX,
  transferUSDT,
  getTransactionInfo,
  estimateFee,
  NETWORKS,
  USDT_CONTRACT
}; 