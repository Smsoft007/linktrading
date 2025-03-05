const TronWeb = require('tronweb');
const bbcContractAddress = 'TRrkeSxEypfiTn7gU3Gg3tP756cEhK493b'; // BBC 토큰 계약 주소
const mainNetUrl = 'https://api.trongrid.io';

// const nailUrl = "https://nile.trongrid.io"
const apiKey = 'ce3e2c6a-cb26-444c-8320-d6c4521c0f26';

const tronWeb = new TronWeb({
  fullHost: mainNetUrl,
  headers: {
    Authorization: apiKey,
  },
  eventServer: mainNetUrl,
});

async function createTron() {
  return await tronWeb.createAccount();
}

async function getTRXBalance(address) {
  const balance = await tronWeb.trx.getBalance(address);
  return balance / 1000000; // TRX 단위로 변환
}

async function isAddressActivated(address) {
  try {
    const balance = await tronWeb.trx.getBalance(address);
    return balance > 0;
  } catch (error) {
    console.error('Error checking address activation:', error.message);
    throw error;
  }
}

async function estimateBBCTransferFee(target, amount, address) {
  try {
    const contractInstance = await tronWeb.contract().at(bbcContractAddress);
    const decimals = 18; // BBC의 소수점 자릿수 설정
    const tokenAmount = amount * 10 ** decimals;

    // Assuming transfer is a transaction function and you want to send it
    // If you're looking to estimate gas without sending, use the appropriate simulation method
    const transaction = await contractInstance
      .transfer(target, tokenAmount.toString())
      .send({
        feeLimit: 100000000, // Set an appropriate fee limit for the transaction
        callValue: 0,
        shouldPollResponse: false, // Adjust based on whether you want to wait for the transaction to be mined
      });

    // After sending, you would typically obtain the transaction result or receipt to calculate fees
    // The following lines are placeholders and should be adjusted based on actual logic to obtain fees
    const energyUsage = transaction.energy_usage_total || 0; // 사용된 에너지
    const energyFee = energyUsage * 420; // 1 에너지는 420 sun (0.00042 TRX)
    const bandwidthUsage = transaction.bandwidth_usage || 0; // 사용된 대역폭
    const bandwidthFee = bandwidthUsage * 10; // 1 대역폭은 10 sun (0.00001 TRX)

    let totalFee = energyFee + bandwidthFee; // 총 수수료

    // 활성화되지 않은 주소에 대한 추가 수수료 1 TRX
    const isTargetActivated = await isAddressActivated(target);
    if (!isTargetActivated) {
      totalFee += 1000000; // 1 TRX 추가
    }

    const feeLimit = Math.max(totalFee, 11000000); // 최소 11 TRX (11,000,000 sun)

    return feeLimit / 1000000; // TRX 단위로 변환
  } catch (error) {
    console.error('Estimate BBC Transfer Fee Error:', error);
    return null;
  }
}
async function transferBBC(target, amount, address, privateKey) {
  try {
    const contractInstance = await tronWeb.contract().at(bbcContractAddress);
    tronWeb.setAddress(address);
    tronWeb.setPrivateKey(privateKey);
    const balance = await contractInstance.balanceOf(address).call();
    const decimals = 18; // BBC의 소수점 자릿수 설정
    const tokenAmount = amount * 10 ** decimals;

    if (Number(balance._hex) < tokenAmount) {
      throw new Error('Not enough BBC balance');
    }

    const feeLimit = await estimateBBCTransferFee(target, amount, address);
    const trxBalance = await getTRXBalance(address);

    if (trxBalance < feeLimit) {
      throw new Error('Not enough TRX balance to cover the fee');
    }

    const transaction = await contractInstance
      .transfer(target, tokenAmount.toString())
      .send({
        feeLimit: feeLimit * 1000000,
      });
    return transaction;
  } catch (error) {
    console.error('BBC Transfer Error:', error.message);
    return null;
  }
}

async function transferTrx(target, amount, address, privateKey) {
  const balance = await tronWeb.trx.getBalance(address);
  const tokenAmount = amount * 1000000; // TRX의 소수점 자릿수

  if (balance < tokenAmount) {
    console.log('Not enough TRX balance');
    tronWeb.setAddress('');
    tronWeb.setPrivateKey('');
    return null;
  }

  try {
    const feeLimit = 1000000; // 기본 트랜잭션 수수료 제한 (1 TRX)
    const trxBalance = await getTRXBalance(address);

    if (trxBalance < feeLimit / 1000000) {
      throw new Error('Not enough TRX balance to cover the fee');
    }

    const tradeobj = await tronWeb.transactionBuilder.sendTrx(
      target,
      tokenAmount,
      address
    );
    const signedtxn = await tronWeb.trx.sign(tradeobj, privateKey);
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);

    return receipt.result ? receipt.txid : 'FAIL';
  } catch (error) {
    console.log('TRX Transfer Error:', error.message);
    return null;
  }
}

async function getBBCBalance(address) {
  try {
    tronWeb.setAddress(address); // 주소 설정
    const contractInstance = await tronWeb.contract().at(bbcContractAddress);
    const balance = await contractInstance.balanceOf(address).call();
    const decimals = 18;
    const tokenBalance = Number(balance._hex) / 10 ** decimals;

    return tokenBalance;
  } catch (error) {
    console.error('Error fetching BBC token balance:', error.message);
    return null;
  }
}

// 사용 예시
// const address = "TWLXaGtLrBN44kwFKJLQw5qicptESAd5uU"
// const addressPk = "1E7EA3B0BF35CCAF3F90EDB5A22BA94D0C970C465005B3762551277FFDF1ADCB";
// const target = "TW4kkywxiAcf5LHdwAg3gzLaHKN2b9FmvR"

// 수수료 계산
// const fee = await estimateBBCTransferFee(target, 100, address);
// console.log('Estimated Fee:', fee, 'TRX');

// 전송 실행
// transferTrx(target, 25, address, addressPk)
// transferBBC(target, 100, address, addressPk)
// getTRXBalance(address)
// getBBCBalance(address)

exports.transferTrx = transferTrx;
exports.transferBBC = transferBBC;
exports.getBBCBalance = getBBCBalance;
exports.getTRXBalance = getTRXBalance;
exports.createTron = createTron;
// exports.estimateBBCTransferFee = estimateBBCTransferFee;
exports.isAddressActivated = isAddressActivated;
