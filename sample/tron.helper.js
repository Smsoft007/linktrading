const TronWeb = require('tronweb');
const usdtContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
// const usjd = "TLBaRhANQoJFTqre9Nf1mjuwNWjCJeYqUL"
const mainNetUrl = 'https://api.trongrid.io';
// const nailUrl = "https://nile.trongrid.io"
const apiKey = 'ce3e2c6a-cb26-444c-8320-d6c4521c0f26';

const tronWeb = new TronWeb({
  fullHost: mainNetUrl,
  headers: { 
    'Authorization': apiKey 
  },
  eventServer: mainNetUrl,
});
async function createTron() {
  return await tronWeb.createAccount();
}
async function getTRXBalance(address) {
  const balance = await tronWeb.trx.getBalance(address);
  return balance / 1000000;
}

// USDT 이체
async function transferUSDT(target, amount, address, privateKey) {
  try {
    const contractInstance = await tronWeb.contract().at(usdtContractAddress);
    tronWeb.setAddress(address);
    tronWeb.setPrivateKey(privateKey);
    const balance = await contractInstance.balanceOf(address).call();
    const decimals = 6; // USDT의 소수점 자릿수를 6으로 설정
    const tokenAmount = amount * 10 ** decimals;

    if (Number(balance._hex) < tokenAmount) {
      throw new Error('Not enough balance');
    }

    const transaction = await contractInstance
      .transfer(target, tokenAmount.toString())
      .send();
    return transaction;
  } catch (error) {
    console.error('USDT Transfer Error:', error);
    return null; //
  }
}

//TRX 이체 (받는사람 , 수량 ,주는사람, 키 )
// target (받는 사람의 주소): TRX 코인을 받을
// amount (이체할 수량): 받는 사람에게 전송할 TRX
// address (주는 사람의 주소): TRX 코인을 보내는 사람의 지갑
// privateKey (주는 사람의 개인 키): 주는 사람의 지갑에서 코인을 이체하는 데 사용되는 개인 키
async function transferTrx(target, amount, address, privateKey) {
  const balance = await tronWeb.trx.getBalance(address);
  const decimals = 6;
  const tokenAmount = amount * 10 ** decimals;

  if (balance < tokenAmount) {
    console.log('Not enough balance');
    tronWeb.setAddress('');
    tronWeb.setPrivateKey('');
    return null;
  }
  try {
    const tradeobj = await tronWeb.transactionBuilder.sendTrx(
      target,
      tokenAmount,
      address
    );
    const signedtxn = await tronWeb.trx.sign(tradeobj, privateKey);
    const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);

    return receipt.result ? receipt.txid : 'FAILE';
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getTRCBalance(address) {
  try {
    tronWeb.setAddress(address); // 주소 설정
    const contractInstance = await tronWeb.contract().at(usdtContractAddress);
    const balance = await contractInstance.balanceOf(address).call();
    const decimals = 6;
    const tokenBalance = Number(balance._hex) / 10 ** decimals;

    return tokenBalance;
  } catch (error) {
    console.error('Error fetching TRC token balance:', error);
    return null;
  }
}

// 주소 활성화 여부 확인
async function isAddressActivated(address) {
  try {
    const balance = await tronWeb.trx.getBalance(address);
    // 잔액이 0보다 크면 활성화된 것으로 간주
    if (balance > 0) {
      return true;
    } else {
      //
      return false;
    }
  } catch (error) {
    console.error('Error checking address activation:', error);
    throw error; //
  }
}

//사용//
//  const address = "TWLXaGtLrBN44kwFKJLQw5qicptESAd5uU"
//  const addressPk = "1E7EA3B0BF35CCAF3F90EDB5A22BA94D0C970C465005B3762551277FFDF1ADCB";
//  const target = "TW4kkywxiAcf5LHdwAg3gzLaHKN2b9FmvR"

// transferTrx(target, 25, address, addressPk)
//  transferUSDT(target, 100, address, addressPk)
// getTRXBalance(address)
//getTRCBalance;
exports.transferTrx = transferTrx;
exports.transferUSDT = transferUSDT;
exports.getTRCBalance = getTRCBalance;
exports.getTRXBalance = getTRXBalance;
exports.createTron = createTron;
