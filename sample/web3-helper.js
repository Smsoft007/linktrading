const Web3 = require('web3');
const logger = require('../lib/logger');
const { default: Common, Chain } = require('@ethereumjs/common');
const { Transaction: Tx } = require('ethereumjs-tx');

// const { default: Common, CustomChain } = require('@ethereumjs/common');
coinInfo = {
  BEP: {
    provider: 'https://bsc-dataseed.binance.org/',
    token: '0x55d398326f99059fF775485246999027B3197955',
    abiPath: './abi/bscUsdt.json',
  },
  BET: {
    provider: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    token: '0xEe127932C2c1409f779F4B752262946F1Be40F51',

    abiPath: './abi/bscSUsdt.json',
  },
  ERC: {
    provider: 'https://mainnet.infura.io/v3/19503f2f97db4c85a9d3e91ed82bc3f2',
    token: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    abiPath: './abi/ethUsdt.json',
  },
};

function getInstance(type) {
  if (coinInfo[type] == null) {
    return null;
  }
  const provider = coinInfo[type]['provider'];
  const client = new Web3(provider);
  return client;
}

const getBalance = async (type, address) => {
  const web3 = getInstance(type);
  const balance = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balance, 'ether');
};

const getBusdtBalance = async (address) => {
  const web3 = getInstance('BEP');
  const tokenContractAddress = coinInfo['BEP'].token;
  const contractAbi = require(coinInfo['BEP'].abiPath);
  const tokenContract = new web3.eth.Contract(
    contractAbi,
    tokenContractAddress
  );

  const balanceWei = await tokenContract.methods.balanceOf(address).call();
  return web3.utils.fromWei(balanceWei, 'ether');
};

const calculateGasCost = async (type, fromAddress, toAddress, amount) => {
  const web3 = getInstance(type);
  const tokenContractAddress = coinInfo[type].token;

  const txCount = await web3.eth.getTransactionCount(fromAddress);
  const transferAmount = web3.utils.toWei(amount.toString(), 'ether');

  const txData = {
    to: tokenContractAddress,
    from: fromAddress,
    value: '0x0',
    data: web3.eth.abi.encodeFunctionCall(
      {
        name: 'transfer',
        type: 'function',
        inputs: [
          {
            type: 'address',
            name: 'to',
          },
          {
            type: 'uint256',
            name: 'value',
          },
        ],
      },
      [toAddress, web3.utils.toHex(transferAmount)]
    ),
    nonce: web3.utils.toHex(txCount),
    chainId: web3.utils.toHex(56),
  };

  let gasPrice = await web3.eth.getGasPrice();
  const minimumGasPrice = web3.utils.toWei('5', 'gwei');

  if (web3.utils.toBN(gasPrice).lt(web3.utils.toBN(minimumGasPrice))) {
    gasPrice = minimumGasPrice;
  }

  const estimatedGas = await web3.eth.estimateGas({
    to: txData.to,
    from: txData.from,
    value: txData.value,
    data: txData.data,
  });

  const txCost = web3.utils.toBN(gasPrice).mul(web3.utils.toBN(estimatedGas));
  const txCostBNB = web3.utils.fromWei(txCost, 'ether');

  logger.info(
    `gas price : ${web3.utils.fromWei(gasPrice.toString(), 'gwei')} Gwei`
  );
  logger.info(`gas maxprice : ${estimatedGas}`);
  logger.info(`tr gas price : ${txCostBNB} BNB`);

  return {
    gasPrice,
    gasLimit: estimatedGas,
    requiredGasWei: txCost,
    requiredGasBNB: txCostBNB,
  };
};

const createAddress = (type) => {
  const web3 = getInstance(type);
  return web3.eth.accounts.create();
};

const transferBep = async (
  type,
  target,
  balance,
  address,
  privateKeyString
) => {
  if (!privateKeyString) {
    throw new Error('privateKeyString is undefined');
  }
  const web3 = getInstance(type);
  const privateKey = Buffer.from(privateKeyString.slice(2), 'hex');

  const txCount = await web3.eth.getTransactionCount(address);
  const txData = {
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    to: target,
    from: address,
    value: web3.utils.toHex(web3.utils.toWei(balance.toString(), 'ether')),
    nonce: web3.utils.toHex(txCount),
    chainId: 56,
  };

  const signedTx = await web3.eth.accounts.signTransaction(
    txData,
    privateKeyString
  );

  const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  logger.info('txid :', txHash);
  return txHash;
};

// BEP-USDT 이체 --------------------------------------------
const transferbepUSDT = async (
  type,
  target,
  address,
  amount,
  privateKeyString,
  gasPriceMultiplier = 1
) => {
  const web3 = getInstance(type);
  const tokenContractAddress = coinInfo[type]?.token;

  if (!tokenContractAddress) {
    logger.error('토큰 컨트랙트 주소를 가져오지 못했습니다.');
    throw new Error('no token');
  }
  logger.info(`USDT 토큰 컨트랙트 주소: ${tokenContractAddress}`);

  if (!privateKeyString) {
    logger.error('privateKeyString이 정의되지 않음');
    throw new Error('privateKeyString is undefined');
  }

  const privateKey = Buffer.from(privateKeyString.slice(2), 'hex');
  const txCount = await web3.eth.getTransactionCount(address);

  // 전송자 잔액 확인
  const tokenContract = new web3.eth.Contract(
    [
      {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ],
    tokenContractAddress
  );

  const balance = await tokenContract.methods.balanceOf(address).call();
  const transferAmount = web3.utils.toWei(amount.toString(), 'ether');

  if (web3.utils.toBN(balance).lt(web3.utils.toBN(transferAmount))) {
    throw new Error(
      `BEP20: transfer amount exceeds balance. Balance: ${balance}, Transfer Amount: ${transferAmount}`
    );
  }

  // 가스 가격과 가스 한도 추정
  let gasPrice = await web3.eth.getGasPrice();
  const minimumGasPrice = web3.utils.toWei('5', 'gwei'); // 최소 5 Gwei
  if (web3.utils.toBN(gasPrice).lt(web3.utils.toBN(minimumGasPrice))) {
    gasPrice = minimumGasPrice;
  } else {
    gasPrice = web3.utils
      .toBN(gasPrice)
      .mul(web3.utils.toBN(gasPriceMultiplier));
  }

  const estimatedGas = await web3.eth.estimateGas({
    to: tokenContractAddress,
    from: address,
    value: '0x0',
    data: web3.eth.abi.encodeFunctionCall(
      {
        name: 'transfer',
        type: 'function',
        inputs: [
          {
            type: 'address',
            name: 'to',
          },
          {
            type: 'uint256',
            name: 'value',
          },
        ],
      },
      [target, web3.utils.toHex(transferAmount)]
    ),
  });

  // 트랜잭션 비용 계산
  const txCost = web3.utils.toBN(gasPrice).mul(web3.utils.toBN(estimatedGas));
  const txCostBNB = web3.utils.fromWei(txCost, 'ether');

  const bnbBalance = await web3.eth.getBalance(address);
  const bnbBalanceBNB = web3.utils.fromWei(bnbBalance, 'ether');

  if (web3.utils.toBN(bnbBalance).lt(txCost)) {
    const shortage = txCost.sub(web3.utils.toBN(bnbBalance));
    const shortageBNB = web3.utils.fromWei(shortage, 'ether');
  }

  const txData = {
    to: tokenContractAddress,
    from: address,
    value: '0x0',
    data: web3.eth.abi.encodeFunctionCall(
      {
        name: 'transfer',
        type: 'function',
        inputs: [
          {
            type: 'address',
            name: 'to',
          },
          {
            type: 'uint256',
            name: 'value',
          },
        ],
      },
      [target, web3.utils.toHex(transferAmount)]
    ),
    nonce: web3.utils.toHex(txCount),
    chainId: 56,
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(estimatedGas),
  };

  logger.info('트랜잭션 데이터:', txData);

  const signedTx = await web3.eth.accounts.signTransaction(
    txData,
    privateKeyString
  );
  logger.info('트랜잭션 서명 완료');
  try {
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    const txHash = receipt.transactionHash; // transactionHash 값 추출
    logger.info('트랜잭션 전송 완료:', txHash);
    return txHash;
  } catch (error) {
    logger.error('트랜잭션 전송 실패:', error);
    return null;
  }
};

exports.getBalance = getBalance;
exports.getBusdtBalance = getBusdtBalance;
exports.createAddress = createAddress;
// exports.transferErc = transferErc;
exports.transferBep = transferBep;
exports.transferbepUSDT = transferbepUSDT;
exports.calculateGasCost = calculateGasCost; //
