/**
 * Web3 Helper
 * 이더리움 및 기타 블록체인 네트워크와 상호작용하기 위한 유틸리티 함수들
 */

const { Web3 } = require('web3');
const { ethers } = require('ethers');

// ERC20 토큰 ABI (기본 함수만 포함)
const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{ "name": "", "type": "string" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{ "name": "", "type": "string" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{ "name": "", "type": "uint8" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{ "name": "_owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      { "name": "_to", "type": "address" },
      { "name": "_value", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "name": "", "type": "bool" }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// 네트워크 설정
const NETWORKS = {
  ETH: {
    mainnet: {
      rpcUrl: 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
      chainId: 1,
      name: 'Ethereum Mainnet',
      explorer: 'https://etherscan.io'
    },
    testnet: {
      rpcUrl: 'https://goerli.infura.io/v3/YOUR_INFURA_KEY',
      chainId: 5,
      name: 'Goerli Testnet',
      explorer: 'https://goerli.etherscan.io'
    }
  },
  BSC: {
    mainnet: {
      rpcUrl: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
      name: 'Binance Smart Chain',
      explorer: 'https://bscscan.com'
    },
    testnet: {
      rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      chainId: 97,
      name: 'BSC Testnet',
      explorer: 'https://testnet.bscscan.com'
    }
  }
};

// USDT 컨트랙트 주소
const USDT_CONTRACTS = {
  ETH: '0xdAC17F958D2ee523a2206206994597C13D831ec7', // 이더리움 메인넷 USDT
  BSC: '0x55d398326f99059fF775485246999027B3197955'  // BSC 메인넷 USDT (BSC-USD)
};

/**
 * Web3 인스턴스 가져오기
 * @param {string} type - 'ETH' 또는 'BSC'
 * @param {boolean} isTestnet - 테스트넷 사용 여부
 * @returns {Web3} Web3 인스턴스
 */
function getWeb3Instance(type = 'ETH', isTestnet = false) {
  const network = isTestnet ? NETWORKS[type].testnet : NETWORKS[type].mainnet;
  return new Web3(new Web3.providers.HttpProvider(network.rpcUrl));
}

/**
 * Ethers 프로바이더 가져오기
 * @param {string} type - 'ETH' 또는 'BSC'
 * @param {boolean} isTestnet - 테스트넷 사용 여부
 * @returns {ethers.providers.JsonRpcProvider} Ethers 프로바이더
 */
function getEthersProvider(type = 'ETH', isTestnet = false) {
  const network = isTestnet ? NETWORKS[type].testnet : NETWORKS[type].mainnet;
  return new ethers.providers.JsonRpcProvider(network.rpcUrl);
}

/**
 * 새 지갑 주소 생성
 * @param {string} type - 'ETH' 또는 'BSC'
 * @returns {Object} 생성된 지갑 정보 (주소, 개인키)
 */
function createAddress(type = 'ETH') {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey
  };
}

/**
 * 잔액 조회
 * @param {string} type - 'ETH' 또는 'BSC'
 * @param {string} address - 지갑 주소
 * @param {boolean} isTestnet - 테스트넷 사용 여부
 * @returns {Promise<string>} 잔액 (ETH 또는 BNB)
 */
async function getBalance(type = 'ETH', address, isTestnet = false) {
  try {
    const web3 = getWeb3Instance(type, isTestnet);
    const balanceWei = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balanceWei, 'ether');
  } catch (error) {
    console.error(`잔액 조회 오류: ${error.message}`);
    throw error;
  }
}

/**
 * USDT 잔액 조회
 * @param {string} type - 'ETH' 또는 'BSC'
 * @param {string} address - 지갑 주소
 * @param {boolean} isTestnet - 테스트넷 사용 여부
 * @returns {Promise<string>} USDT 잔액
 */
async function getUSDTBalance(type = 'ETH', address, isTestnet = false) {
  try {
    const web3 = getWeb3Instance(type, isTestnet);
    const contractAddress = USDT_CONTRACTS[type];
    const contract = new web3.eth.Contract(ERC20_ABI, contractAddress);
    
    const balance = await contract.methods.balanceOf(address).call();
    const decimals = await contract.methods.decimals().call();
    
    return (balance / Math.pow(10, decimals)).toString();
  } catch (error) {
    console.error(`USDT 잔액 조회 오류: ${error.message}`);
    throw error;
  }
}

/**
 * 이더리움/BNB 전송
 * @param {string} type - 'ETH' 또는 'BSC'
 * @param {string} toAddress - 받는 주소
 * @param {string} amount - 전송할 금액 (ETH 또는 BNB)
 * @param {string} privateKey - 보내는 지갑의 개인키
 * @param {boolean} isTestnet - 테스트넷 사용 여부
 * @returns {Promise<string>} 트랜잭션 해시
 */
async function transferCoin(type = 'ETH', toAddress, amount, privateKey, isTestnet = false) {
  try {
    const provider = getEthersProvider(type, isTestnet);
    const wallet = new ethers.Wallet(privateKey, provider);
    
    const tx = {
      to: toAddress,
      value: ethers.utils.parseEther(amount)
    };
    
    const transaction = await wallet.sendTransaction(tx);
    await transaction.wait();
    
    return transaction.hash;
  } catch (error) {
    console.error(`코인 전송 오류: ${error.message}`);
    throw error;
  }
}

/**
 * USDT 전송
 * @param {string} type - 'ETH' 또는 'BSC'
 * @param {string} toAddress - 받는 주소
 * @param {string} amount - 전송할 USDT 금액
 * @param {string} privateKey - 보내는 지갑의 개인키
 * @param {boolean} isTestnet - 테스트넷 사용 여부
 * @returns {Promise<string>} 트랜잭션 해시
 */
async function transferUSDT(type = 'ETH', toAddress, amount, privateKey, isTestnet = false) {
  try {
    const provider = getEthersProvider(type, isTestnet);
    const wallet = new ethers.Wallet(privateKey, provider);
    
    const contractAddress = USDT_CONTRACTS[type];
    const contract = new ethers.Contract(contractAddress, ERC20_ABI, wallet);
    
    const decimals = await contract.decimals();
    const amountToSend = ethers.utils.parseUnits(amount, decimals);
    
    const transaction = await contract.transfer(toAddress, amountToSend);
    await transaction.wait();
    
    return transaction.hash;
  } catch (error) {
    console.error(`USDT 전송 오류: ${error.message}`);
    throw error;
  }
}

/**
 * 가스 비용 계산
 * @param {string} type - 'ETH' 또는 'BSC'
 * @param {string} fromAddress - 보내는 주소
 * @param {string} toAddress - 받는 주소
 * @param {string} amount - 전송할 금액
 * @param {boolean} isTestnet - 테스트넷 사용 여부
 * @returns {Promise<Object>} 가스 비용 정보
 */
async function calculateGasCost(type = 'ETH', fromAddress, toAddress, amount, isTestnet = false) {
  try {
    const web3 = getWeb3Instance(type, isTestnet);
    
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 21000; // 기본 전송 가스 한도
    
    const gasCost = web3.utils.toBN(gasPrice).mul(web3.utils.toBN(gasLimit));
    const gasCostEther = web3.utils.fromWei(gasCost, 'ether');
    
    return {
      gasPrice: web3.utils.fromWei(gasPrice, 'gwei') + ' Gwei',
      gasLimit,
      gasCost: gasCostEther + ' ' + (type === 'ETH' ? 'ETH' : 'BNB')
    };
  } catch (error) {
    console.error(`가스 비용 계산 오류: ${error.message}`);
    throw error;
  }
}

/**
 * 트랜잭션 상태 확인
 * @param {string} type - 'ETH' 또는 'BSC'
 * @param {string} txHash - 트랜잭션 해시
 * @param {boolean} isTestnet - 테스트넷 사용 여부
 * @returns {Promise<Object>} 트랜잭션 정보
 */
async function getTransactionStatus(type = 'ETH', txHash, isTestnet = false) {
  try {
    const web3 = getWeb3Instance(type, isTestnet);
    const tx = await web3.eth.getTransaction(txHash);
    
    if (!tx) {
      return { status: 'not_found' };
    }
    
    const receipt = await web3.eth.getTransactionReceipt(txHash);
    
    if (!receipt) {
      return { status: 'pending', transaction: tx };
    }
    
    return {
      status: receipt.status ? 'success' : 'failed',
      transaction: tx,
      receipt
    };
  } catch (error) {
    console.error(`트랜잭션 상태 확인 오류: ${error.message}`);
    throw error;
  }
}

module.exports = {
  getWeb3Instance,
  getEthersProvider,
  createAddress,
  getBalance,
  getUSDTBalance,
  transferCoin,
  transferUSDT,
  calculateGasCost,
  getTransactionStatus,
  NETWORKS,
  USDT_CONTRACTS,
  ERC20_ABI
}; 