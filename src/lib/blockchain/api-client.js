/**
 * Blockchain API Client
 * 파이썬으로 구현된 블록체인 API를 호출하기 위한 클라이언트 함수들
 */

import { apiClient } from '../api.client';

/**
 * 코인 전송 요청
 * @param {string} type - 'ETH', 'BSC', 'TRC' 등
 * @param {string} fromAddress - 보내는 주소
 * @param {string} toAddress - 받는 주소
 * @param {string} amount - 전송할 금액
 * @param {string} privateKey - 프라이빗 키 (암호화된 형태로 전송)
 * @returns {Promise<Object>} 전송 결과
 */
export async function requestTransferCoin(type, fromAddress, toAddress, amount, privateKey) {
  try {
    const response = await apiClient.post('/api/blockchain/transfer', {
      type,
      fromAddress,
      toAddress,
      amount,
      privateKey
    });
    
    return response.data;
  } catch (error) {
    console.error(`코인 전송 요청 오류: ${error.message}`);
    throw error;
  }
}

/**
 * 토큰(USDT 등) 전송 요청
 * @param {string} type - 'ETH', 'BSC', 'TRC' 등
 * @param {string} fromAddress - 보내는 주소
 * @param {string} toAddress - 받는 주소
 * @param {string} amount - 전송할 금액
 * @param {string} privateKey - 프라이빗 키 (암호화된 형태로 전송)
 * @param {string} tokenType - 'USDT', 'USDC' 등
 * @returns {Promise<Object>} 전송 결과
 */
export async function requestTransferToken(type, fromAddress, toAddress, amount, privateKey, tokenType = 'USDT') {
  try {
    const response = await apiClient.post('/api/blockchain/transfer-token', {
      type,
      fromAddress,
      toAddress,
      amount,
      privateKey,
      tokenType
    });
    
    return response.data;
  } catch (error) {
    console.error(`토큰 전송 요청 오류: ${error.message}`);
    throw error;
  }
}

/**
 * 지갑 주소 생성 요청
 * @param {string} type - 'ETH', 'BSC', 'TRC' 등
 * @returns {Promise<Object>} 생성된 지갑 정보
 */
export async function requestCreateWallet(type) {
  try {
    const response = await apiClient.post('/api/blockchain/create-wallet', {
      type
    });
    
    return response.data;
  } catch (error) {
    console.error(`지갑 생성 요청 오류: ${error.message}`);
    throw error;
  }
}

/**
 * 잔액 조회 요청
 * @param {string} type - 'ETH', 'BSC', 'TRC' 등
 * @param {string} address - 지갑 주소
 * @returns {Promise<Object>} 잔액 정보
 */
export async function requestGetBalance(type, address) {
  try {
    const response = await apiClient.get('/api/blockchain/balance', {
      params: {
        type,
        address
      }
    });
    
    return response.data;
  } catch (error) {
    console.error(`잔액 조회 요청 오류: ${error.message}`);
    throw error;
  }
}

/**
 * 토큰 잔액 조회 요청
 * @param {string} type - 'ETH', 'BSC', 'TRC' 등
 * @param {string} address - 지갑 주소
 * @param {string} tokenType - 'USDT', 'USDC' 등
 * @returns {Promise<Object>} 토큰 잔액 정보
 */
export async function requestGetTokenBalance(type, address, tokenType = 'USDT') {
  try {
    const response = await apiClient.get('/api/blockchain/token-balance', {
      params: {
        type,
        address,
        tokenType
      }
    });
    
    return response.data;
  } catch (error) {
    console.error(`토큰 잔액 조회 요청 오류: ${error.message}`);
    throw error;
  }
}

/**
 * 트랜잭션 상태 조회 요청
 * @param {string} type - 'ETH', 'BSC', 'TRC' 등
 * @param {string} txHash - 트랜잭션 해시
 * @returns {Promise<Object>} 트랜잭션 상태 정보
 */
export async function requestGetTransactionStatus(type, txHash) {
  try {
    const response = await apiClient.get('/api/blockchain/transaction-status', {
      params: {
        type,
        txHash
      }
    });
    
    return response.data;
  } catch (error) {
    console.error(`트랜잭션 상태 조회 요청 오류: ${error.message}`);
    throw error;
  }
} 