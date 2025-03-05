'use strict';
const sql = require('mssql');
const procedureNames = {};

function ProcedureInfo() {}
ProcedureInfo.prototype.setProcedureInfo = (procedureName, procedureInfo) => {
  this[procedureName] = procedureInfo;
};

ProcedureInfo.prototype.getProcedureInfo = (procedureName) => {
  return this[procedureName];
};
const procedureInfo = new ProcedureInfo();

let currentName = 'SP_MEMBER_LOGIN';
let currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'inUser_ID',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'inUser_Pwd',
      type: sql.NVarChar(150),
      required: true,
    },
    {
      name: 'inUser_IP',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'sessionID',
      type: sql.VarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['signin'] = {
  name: currentName,
  returnName: 'SIGNIN',
};

currentName = 'SP_TOKEN_LIST';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['my_token'] = {
  name: currentName,
  returnName: 'MY_TOKEN',
};

currentName = 'SP_MY_WITHDRAW_TOKEN';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'GUBUN',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'D_AMOUNT',
      type: sql.Float,
      required: true,
    },
    {
      name: 'D_BIDNO',
      type: sql.VarChar(80),
      required: true,
    },
    {
      name: 'D_PASS2',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['mywithdraw_token'] = {
  name: currentName,
  returnName: 'MYWITHDRAW_TOKEN',
};

currentName = 'SP_COIN_BALANCE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['coin_balance'] = {
  name: currentName,
  returnName: 'COIN_BALANCE',
};

currentName = 'SP_MY_POINT_BALANCE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['coin_token_balance'] = {
  name: currentName,
  returnName: 'COIN_token_BALANCE',
};

currentName = 'SALE_ADD';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_NO',
      type: sql.Int,
      required: true,
    },
    {
      name: 'MS_KEY',
      type: sql.BigInt,
      required: true,
    },
    {
      name: 'QTY',
      type: sql.Int,
      required: true,
    },
    {
      name: 'GCODE',
      type: sql.NVarChar(10),
      required: true,
    },
    {
      name: 'AMOUNT',
      type: sql.Decimal(18, 2),
      required: true,
    },
    {
      name: 'TXID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'RATE',
      type: sql.Decimal(18, 2),
      required: true,
    },
    {
      name: 'GUBUN',
      type: sql.NVarChar(10),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['saleadd'] = {
  name: currentName,
  returnName: 'SALEADD',
};

currentName = 'SP_TRANSFORM';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.VarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['my_transorm'] = {
  name: currentName,
  returnName: 'MY_TRANSORM',
};

currentName = 'SP_MY_OTP_KEY_GET';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(150),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['otpkey_get'] = {
  name: currentName,
  returnName: 'OTPKEY_GET',
};

currentName = 'SP_MY_OTP_KEY';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(150),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_OTP_KEY_SET';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(150),
      required: true,
    },
    {
      name: 'ASCKEY',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'BASKEY',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_CHECK_ADDRESS';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'D_GUBUN',
      type: sql.NVarChar(10),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_DISTRIBU_ADD';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_COUNTRY',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_PASS',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_NAME',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_CENCODE',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_CODE',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_IDNO',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_OWNER',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_EMAIL',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_SID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_RID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_HP',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_POST',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_ADDR1',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_ADDR2',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CAREER',
      type: sql.NText,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['signup'] = {
  name: currentName,
  returnName: 'SIGNUP',
};

currentName = 'SP_DISTRIBU_ADD_DIRECT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_COUNTRY',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_PASS',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_NAME',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_CENCODE',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_CODE',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_IDNO',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_OWNER',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_EMAIL',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_SID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_RID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_HP',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_POST',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_ADDR1',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_ADDR2',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CAREER',
      type: sql.NText,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['signup_link'] = {
  name: currentName,
  returnName: 'SIGNUP_LINK',
};

currentName = 'SP_MY_DESPOSIT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'GUBUN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'SNAME',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'STAN_COIN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'SELL_KEY',
      type: sql.Int,
      required: true,
    },
    {
      name: 'BUY_KEY',
      type: sql.Int,
      required: true,
    },
    {
      name: 'FILE_PATH',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['deposit'] = {
  name: currentName,
  returnName: 'DEPOSIT',
};

currentName = 'SP_MY_INFO';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['userinfo'] = {
  name: currentName,
  returnName: 'USERINFO',
};

currentName = 'SP_MY_INFOR_UPDATE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_EMAIL',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'D_NAME_H',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'D_PASS2',
      type: sql.NVarChar(10),
      required: true,
    },
    {
      name: 'D_COUNTRY',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_HP',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['updateUserInfo'] = {
  name: currentName,
  returnName: 'UPDATEUSERINFO',
};



currentName = 'SP_MY_BANK_UPDATE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_CODE',
      type: sql.NVarChar(50),
      required: true,
    },

    {
      name: 'B_IDNO',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'B_OWNER',
      type: sql.NVarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['updateBankInfo'] = {
  name: currentName,
  returnName: 'UPDATEBANKINFO',
};

currentName = 'SP_PW2_CHAGNE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PW',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'NEW_PW',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['updatePass2'] = {
  name: currentName,
  returnName: 'UPDATEPASS2',
};

currentName = 'SP_PRODUCT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getProduct'] = {
  name: currentName,
  returnName: 'PRODUCT',
};

currentName = 'DAY_AUTO';
currentInfo = {
  usingCache: false,
  params: [],
};

procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_COIN_WAITING';
currentInfo = {
  usingCache: false,
  params: [],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_COIN_DEPOSIT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'GUBUN',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'AMOUNT',
      type: sql.Decimal(18, 9),
      required: true,
    },
    {
      name: 'QTY',
      type: sql.Decimal(18, 9),
      required: true,
    },
    {
      name: 'RATE',
      type: sql.Decimal(18, 9),
      required: true,
    },
    {
      name: 'G_PCODE',
      type: sql.NVarChar(10),
      required: true,
    },
    {
      name: 'SELLGUBUN',
      type: sql.NVarChar(1),
      required: true,
    },
    {
      name: 'TO_ADDR',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'FEE',
      type: sql.Decimal(18, 9),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['coinDeposit'] = {
  name: currentName,
  returnName: 'DEPSTATE',
};

procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_SALE_ADD';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_CODE',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'QTY',
      type: sql.Int,
      required: true,
    },
    {
      name: 'TXID',
      type: sql.NVarChar(100),
      required: true,
    },

    {
      name: 'RATE',
      type: sql.Decimal(18, 9),
      required: true,
    },

    {
      name: 'AMOUNT_BBC',
      type: sql.Decimal(18, 9),
      required: true,
    },
    {
      name: 'ADDRESS',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'GUBUN',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['addSaleSP'] = {
  name: currentName,
  returnName: 'ADDSALESP',
};

currentName = 'SP_SALE_ADD_RE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'D_CODE',
      type: sql.NVarChar(10),
      required: true,
    },
    {
      name: 'QTY',
      type: sql.Int,
      required: true,
    },
    {
      name: 'TXID',
      type: sql.NVarChar(100),
      required: true,
    },

    {
      name: 'RATE',
      type: sql.Decimal(18, 9),
      required: true,
    },

    {
      name: 'AMOUNT_BBC',
      type: sql.Decimal(18, 9),
      required: true,
    },
    {
      name: 'ADDRESS',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'GUBUN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_SID',
      type: sql.NVarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['add_RE_SaleSP'] = {
  name: currentName,
  returnName: 'ADD_RE_SALESP',
};


currentName = 'SP_KRW_DEPOSIT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    
    {
      name: 'BCODE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'BNAME',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'BIDNO',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'BOWNER',
      type: sql.NVarChar(10),
      required: true,
    },
    {
      name: 'AMT',
      type: sql.Decimal(18,2),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['mybankdeposit'] = {
  name: currentName,
  returnName: 'MYBANKDEPOSiT',
};


currentName = 'SP_KRW_DEPOSIT_LIST';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['mybankdeposit_list'] = {
  name: currentName,
  returnName: 'MYBANKDEPOSIT_LIST',
};

currentName = 'SP_MY_WITHDRAW_AMOUNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'GUBUN',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'D_AMOUNT',
      type: sql.Float,
      required: true,
    },
    {
      name: 'D_BCODE',
      type: sql.VarChar(20),
      required: true,
    },
    {
      name: 'D_BNAME',
      type: sql.VarChar(20),
      required: true,
    },
    {
      name: 'D_BIDNO',
      type: sql.VarChar(80),
      required: true,
    },
    {
      name: 'D_BOWNER',
      type: sql.VarChar(20),
      required: true,
    },
    {
      name: 'D_PASS2',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['my_withdraw_amt'] = {
  name: currentName,
  returnName: 'WITHDRAW_AMT',
};

currentName = 'SP_MY_DASHBOARD';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getMyDash'] = {
  name: currentName,
  returnName: 'MYDASH',
};

currentName = 'SP_MY_ADDR';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_GUBUN',
      type: sql.NVarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getaddr'] = {
  name: currentName,
  returnName: 'MYADDR',
};

currentName = 'SP_MY_GETINFO';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getMinfo'] = {
  name: currentName,
  returnName: 'PROFILE',
};

currentName = 'SP_MY_SETATTEND';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['set_attend'] = {
  name: currentName,
  returnName: 'MY_ATTEND',
};

currentName = 'SP_MY_GET_HP';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['gethp'] = {
  name: currentName,
  returnName: 'MY_GETHP',
};

currentName = 'SP_DIDNO_CHAGNE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'B_CODE',
      type: sql.NVarChar(10),
      required: true,
    },
    {
      name: 'B_OWNER',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'B_IDNO',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_PASS2',
      type: sql.NVarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['setDidno'] = {
  name: currentName,
  returnName: 'SETDIDNO',
};

currentName = 'SP_ID_SEARCH_P';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'SEARCH_ID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['searchP'] = {
  name: currentName,
  returnName: 'SEARCHP',
};

currentName = 'SP_UID_SEARCH';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['search_uid'] = {
  name: currentName,
  returnName: 'SEARCH_UID',
};

currentName = 'SP_ID_SEARCH_S';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'SEARCH_ID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['searchS'] = {
  name: currentName,
  returnName: 'SEARCHS',
};

currentName = 'SP_ID_SEARCH2';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'P_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_GUBUN',
      type: sql.NVarChar(1),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['search2'] = {
  name: currentName,
  returnName: 'SEARCH2',
};

currentName = 'SP_ID_SEARCH2_S';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'S_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'P_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_GUBUN',
      type: sql.NVarChar(1),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['search2S'] = {
  name: currentName,
  returnName: 'SEARCHS',
};

currentName = 'SP_ID_SEARCH3';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'P_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['search3'] = {
  name: currentName,
  returnName: 'SEARCH3',
};

currentName = 'SP_USD_BALANCE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getUSDBalance'] = {
  name: currentName,
  returnName: 'USDBALANCE',
};

currentName = 'SP_SLCOIN_BALANCE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getSLCOINBalance'] = {
  name: currentName,
  returnName: 'SLCOINBALANCE',
};

currentName = 'SP_KSP_BALANCE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getKSPBalance'] = {
  name: currentName,
  returnName: 'KSPBALANCE',
};

procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['withdrawAmount2'] = {
  name: currentName,
  returnName: 'WITHDRAWAMOUNT2',
};

currentName = 'SP_TRANSFER_CASH_TO_INVESTMENT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'AMOUNT',
      type: sql.Decimal(18, 8),
      required: true,
    },
    {
      name: 'D_PASS2',
      type: sql.VarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['transferToCashAmount'] = {
  name: currentName,
  returnName: 'TRANSFERTOCASHAMOUNT',
};

currentName = 'SP_SET_AGGREET';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['set_aggreet'] = {
  name: currentName,
  returnName: 'SET_AGGREET',
};

currentName = 'SP_COUNTRY';
currentInfo = {
  usingCache: false,
  params: [],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getCountry'] = {
  name: currentName,
  returnName: 'GETCOUNTRY',
};

currentName = 'SP_CENTER_LIST';
currentInfo = {
  usingCache: false,
  params: [],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getCenterList'] = {
  name: currentName,
  returnName: 'CENTERLIST',
};

currentName = 'SP_ADDRESS_LIST';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getaddrList'] = {
  name: currentName,
  returnName: 'ADDRLIST',
};

currentName = 'SP_ADDRESS';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getaddr'] = {
  name: currentName,
  returnName: 'ADDR',
};

currentName = 'SP_PW_CHAGNE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PW',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'NEW_PW',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_IDX',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['passwodChange'] = {
  name: currentName,
  returnName: 'PASSWODCHANGE',
};

currentName = 'SP_COIN_ORDER';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CON_TYPE',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'STAN_COIN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'ORDER_COIN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'RATE_TYPE',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'RATE',
      type: sql.Decimal(18, 2),
      required: true,
    },
    {
      name: 'QTY',
      type: sql.Decimal(18, 2),
      required: true,
    },
    {
      name: 'AMOUNT',
      type: sql.Decimal(18, 2),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['coinOrder'] = {
  name: currentName,
  returnName: 'COINORDER',
};

currentName = 'SP_COIN_ADDR_LIST';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['addrlist'] = {
  name: currentName,
  returnName: 'ADDRLIST',
};

currentName = 'SP_BANK_LIST';
currentInfo = {
  usingCache: false,
  params: [],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getBankList'] = {
  name: currentName,
  returnName: 'BANKLIST',
};

currentName = 'SP_BUY_LIST';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'SNAME',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'STAN_COIN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'QGUBUN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'TORDER',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'ORDER',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['buyList'] = {
  name: currentName,
  returnName: 'BUYLIST',
};

currentName = 'SP_SELL_LIST';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'SNAME',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'STAN_COIN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'QGUBUN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'TORDER',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'ORDER',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['sellList'] = {
  name: currentName,
  returnName: 'sellList',
};

currentName = 'SP_MY_COIN_SELL';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'B_SEQ',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'BUY_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'SELL_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'SNAME',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'STAN_SNAME',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['myCoinSell'] = {
  name: currentName,
  returnName: 'MYCOINSELL',
};

currentName = 'SP_MY_COIN_BUY';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'S_SEQ',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'BUY_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'SELL_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'SNAME',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'STAN_SNAME',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['myCoinBuy'] = {
  name: currentName,
  returnName: 'MYCOINBUY',
};

currentName = 'SP_BOARD_MAIN_VIEW';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'B_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_GUBUN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_IDX',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['boardView'] = {
  name: currentName,
  returnName: 'BOARDVIEW',
};

currentName = 'SP_MY_TRADE_LIST';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_STATUS',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'T_GUBUN',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['myTradeList'] = {
  name: currentName,
  returnName: 'MYTRADELIST',
};

currentName = 'SP_MY_PASS2_RESULT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'PASS',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['myPass2Result'] = {
  name: currentName,
  returnName: 'MYPASS1RESULT',
};

currentName = 'SP_MY_MAIN_BS2';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getMyMainBS2'] = {
  name: currentName,
  returnName: 'BS2',
};

currentName = 'SP_MY_MAIN_BS3';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getMyMainBS3'] = {
  name: currentName,
  returnName: 'BS3',
};

currentName = 'SP_MY_MAIN_BS4';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getMyMainBS4'] = {
  name: currentName,
  returnName: 'BS4',
};

currentName = 'SP_MY_MAIN_BS5';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getMyMainBS5'] = {
  name: currentName,
  returnName: 'BS5',
};

currentName = 'SP_MY_MAIN_BS6';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getMyMainBS6'] = {
  name: currentName,
  returnName: 'BS6',
};

currentName = 'SP_MY_MAIN_BS1';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getMyMainBS1'] = {
  name: currentName,
  returnName: 'BS1',
};

currentName = 'SP_PW1_CHAGNE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PW',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'NEW_PW',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['myPass1Change'] = {
  name: currentName,
  returnName: 'MYPASS1CHANGE',
};

currentName = 'SP_BOARD_MAIN_LIST';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'B_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_GUBUN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'IP_NO',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_SDATE',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_EDATE',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
    {
      name: 'MY_NOTICE',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['boardList'] = {
  name: currentName,
  returnName: 'BOARDLIST',
};

currentName = 'SP_BOARD_MAIN_LIST_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'B_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_GUBUN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'IP_NO',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_SDATE',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_EDATE',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'MY_NOTICE',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_SALE_LIST';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'GS_ID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_SDATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'D_EDATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'ALL_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['myList'] = {
  name: currentName,
  returnName: 'MYLIST',
};

currentName = 'SP_MY_SALE_LIST_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'GS_ID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_SDATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'D_EDATE',
      type: sql.VarChar(10),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_PNO_LIST_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
currentName = 'SP_MY_PNO_LIST';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['mypnolist'] = {
  name: currentName,
  returnName: 'MYPNOLIST',
};

currentName = 'SP_COIN_COMPLETE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_NO',
      type: sql.Int,
      required: true,
    },
    {
      name: 'MS_KEY',
      type: sql.BigInt,
      required: true,
    },
    {
      name: 'QTY',
      type: sql.NVarChar(18, 2),
      required: true,
    },
    {
      name: 'GCODE',
      type: sql.NVarChar(10),
      required: true,
    },
    {
      name: 'AMOUNT',
      type: sql.NVarChar(18, 2),
      required: true,
    },
    {
      name: 'TXID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CQTY',
      type: sql.Decimal(18, 2),
      required: true,
    },
    {
      name: 'GUBUN',
      type: sql.NVarChar(10),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['coin_complete_txid'] = {
  name: currentName,
  returnName: 'COIN_COMPLETE_TXID',
};

currentName = 'SP_MY_OTP_COPY_OK';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['verifyconfirm_ok'] = {
  name: currentName,
  returnName: 'VERIFYCONFIRM',
};

currentName = 'SP_MY_OTP_RESULT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['verifyconfirm'] = {
  name: currentName,
  returnName: 'VERIFYCONFIRM',
};

currentName = 'SP_TOKEN_LIST_DETAIL';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'T_CODE',
      type: sql.VarChar(3),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['clist01'] = {
  name: currentName,
  returnName: 'MY_TOKENLIST',
};

currentName = 'SP_TOKEN_LIST_DETAIL_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'T_CODE',
      type: sql.VarChar(3),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_BS1';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'ALL_PAGING',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['myBS1'] = {
  name: currentName,
  returnName: 'MYBS1',
};

currentName = 'SP_MY_SUMMRY';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'ALL_PAGING',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['my_summry'] = {
  name: currentName,
  returnName: 'MYSUMMRY',
};

currentName = 'SP_MY_LEFT_SILJUK';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'ALL_PAGING',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['my_LeftSilJuk'] = {
  name: currentName,
  returnName: 'MYLEFTSILJUK',
};

currentName = 'SP_MY_RIGHT_SILJUK';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'ALL_PAGING',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['my_RightSilJuk'] = {
  name: currentName,
  returnName: 'MYRIGHTSILJUK',
};

currentName = 'SP_MY_LEFT_SILJUK_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_RIGHT_SILJUK_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_SUMMRY_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_BS1_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_KRW_WALLET_LIST_LIST';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['krwwalletList'] = {
  name: currentName,
  returnName: 'KRWWALLETLIST',
};

currentName = 'SP_MY_SGRP';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['mySgrp'] = {
  name: currentName,
  returnName: 'MYSGRP',
};

currentName = 'SP_MY_SGRP_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_KRW_WALLET_LIST_LIST_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_BS_ALL';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'S_DATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'E_DATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'ALL_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['allpoint'] = {
  name: currentName,
  returnName: 'ALLPOINT',
};

currentName = 'SP_MY_BS_ALL_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'S_DATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'E_DATE',
      type: sql.VarChar(10),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_WLIST_1';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['wlist1'] = {
  name: currentName,
  returnName: 'WLIST1',
};

currentName = 'SP_WLIST_1_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_CLIST';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'TYPE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'D_SDATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'D_EDATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['coinlist'] = {
  name: currentName,
  returnName: 'COINLIST',
};

currentName = 'SP_CLIST_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'TYPE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'D_SDATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'D_EDATE',
      type: sql.VarChar(10),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_POINT_LIST';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'S_DATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'E_DATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['pointlist'] = {
  name: currentName,
  returnName: 'POINTLIST',
};

currentName = 'SP_MY_POINT_LIST_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'S_DATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'E_DATE',
      type: sql.VarChar(10),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_POINT_WITHDRAWAL_LIST';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'S_DATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'E_DATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['pointwidthlist'] = {
  name: currentName,
  returnName: 'POINTWIDTHLIST',
};

currentName = 'SP_MY_POINT_WITHDRAWAL_LIST_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'S_DATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'E_DATE',
      type: sql.VarChar(10),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_OLIST';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },

    {
      name: 'D_SDATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'D_EDATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['coinoutlist'] = {
  name: currentName,
  returnName: 'COINOUTLIST',
};

currentName = 'SP_OLIST_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_SDATE',
      type: sql.VarChar(10),
      required: true,
    },
    {
      name: 'D_EDATE',
      type: sql.VarChar(10),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_OUTCOIN_ADDR';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['my_outaddr'] = {
  name: currentName,
  returnName: 'MY_OUTADDR',
};

currentName = 'SP_WLIST_3';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['wlist3'] = {
  name: currentName,
  returnName: 'WLIST3',
};

currentName = 'SP_WLIST_3_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_BS2';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'ALL_PAGING',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['myBS2'] = {
  name: currentName,
  returnName: 'MYBS2',
};

currentName = 'SP_MY_BS2_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_SPOINT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'ALL_PAGING',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['myspoint'] = {
  name: currentName,
  returnName: 'MYSPOINT',
};

currentName = 'SP_MY_SASUL';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['mysasultext'] = {
  name: currentName,
  returnName: 'MYSASULTEXT',
};

currentName = 'SP_MY_SPOINT_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_BS3';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'ALL_PAGING',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['myBS3'] = {
  name: currentName,
  returnName: 'MYBS3',
};

currentName = 'SP_MY_BS3_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_BS4';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'ALL_PAGING',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['myBS4'] = {
  name: currentName,
  returnName: 'MYBS4',
};

currentName = 'SP_MY_BS4_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_BS5';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'ALL_PAGING',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['myBS5'] = {
  name: currentName,
  returnName: 'MYBS5',
};

currentName = 'SP_MY_BS5_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_BS6';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'ALL_PAGING',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['myBS6'] = {
  name: currentName,
  returnName: 'MYBS6',
};

currentName = 'SP_MY_BS6_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MAIN_BARCHAT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['my_mainchart'] = {
  name: currentName,
  returnName: 'MAIN_BARCHAT',
};

currentName = 'SP_BOX_CHART';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'S_UID',
      type: sql.NVarChar(50),
      required: true,
    }
  ]
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['my_BPXchart'] = {
  name: currentName,
  returnName: 'MY_BPXCHART'
};

currentName = 'SP_WLIST_1';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['main_wlist1'] = {
  name: currentName,
  returnName: 'MAINLIST1',
};

currentName = 'SP_MY_LEFT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['left_data'] = {
  name: currentName,
  returnName: 'LEFTDATA',
};

currentName = 'SP_MY_WALLET_INOUT_LIST';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_GUBUN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_SDATE',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_EDATE',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['walletList'] = {
  name: currentName,
  returnName: 'WALLETLIST',
};

currentName = 'SP_MY_WALLET_INOUT_LIST_CNT';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_GUBUN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_SDATE',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'D_EDATE',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MAIN_LIST_1';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'CUR_PAGING',
      type: sql.Int,
      required: true,
    },
    {
      name: 'PAGING_NO',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['main_list1'] = {
  name: currentName,
  returnName: 'MAINLIST1',
};

currentName = 'SP_BOARD_USER_WRITE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'B_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_GUBUN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_TITLE',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_CONTENTS',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'IP_NO',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_FILE_PATH1',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_FILE_PATH2',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_FILE_PATH3',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_FILE_PATH4',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_FILE_PATH5',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['writeBoard'] = {
  name: currentName,
  returnName: 'WRITEBOARD',
};
currentName = 'SP_COIN_ADDR_CREATE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'GUBUN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'ADDR',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'PASS',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'PUBIC_KEY',
      type: sql.NVarChar(250),
      required: true,
    },
    {
      name: 'PRIVATEKEY',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'HEX',
      type: sql.NVarChar(255),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['createAddr'] = {
  name: currentName,
  returnName: 'CREATEADDR',
};

currentName = 'SP_COIN_OUT_ADDR_CREATE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'GUBUN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'ADDR',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'PASS',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'PUBIC_KEY',
      type: sql.NVarChar(250),
      required: true,
    },
    {
      name: 'PRIVATEKEY',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'HEX',
      type: sql.NVarChar(255),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['createOUTAddr'] = {
  name: currentName,
  returnName: 'CREATEOUTADDR',
};

currentName = 'SP_COIN_OUT_ADDR_UPDATE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },

    {
      name: 'USDT_ADDR',
      type: sql.NVarChar(200),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['updateOUTAddr'] = {
  name: currentName,
  returnName: 'UPDATEOUTADDR',
};


currentName = 'SP_MY_POINT_BALANCE';
currentInfo = {
    usingCache: false,
    params: [
        {
            name: 'D_UID',
            type: sql.NVarChar(100),
            required: true,
        },
    ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getpointBalance'] = {
    name: currentName,
    returnName: 'GETPOINTBALANCE',
};

currentName = 'SP_UPDATE_EXCHANGE_RATES';
currentInfo = {
    usingCache: false,
    params: [
        {
            name: 'usd_rate',
            type: sql.Decimal(18, 8),
            required: true,
        },
        {
            name: 'krw_rate',
            type: sql.Decimal(18, 8),
            required: true,
        },
    ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_MY_COIN_BALANCE2';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['getCoinBalance2'] = {
  name: currentName,
  returnName: 'GETCOINBALANCE2',
};


currentName = 'SP_CHECK_USER_RECOM';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'D_UID',
      type: sql.NVarChar(50),
      required: true,
    },
  ],
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
procedureNames['pnocnt'] = {
  name: currentName,
  returnName: 'PNOCNT',
};

currentName = 'WEB_ORG';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'myuid',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'gs_IP',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'gs_date1',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'gs_date2',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'gsuid',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'gs_isSNo',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'gnlevel',
      type: sql.Int,
      required: true,
    },
  ],
};
procedureNames['getWebOrg'] = {
  name: currentName,
  returnName: 'WEBORG',
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_BOARD_MAIN_WRITE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'B_UID',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'B_GUBUN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_TITLE',
      type: sql.NVarChar(400),
      required: true,
    },
    {
      name: 'B_CONTENTS',
      type: sql.NText,
      required: true,
    },
    {
      name: 'B_FILE_PATH1',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_FILE_PATH2',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_FILE_PATH3',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_FILE_PATH4',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_FILE_PATH5',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureNames['noticeBoardWrite'] = {
  name: currentName,
  returnName: 'NOTICE_BOARD_WRITE',
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

currentName = 'SP_BOARD_MAIN_UPDATE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'B_UID',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'B_IDX',
      type: sql.BigInt,
      required: true,
    },
    {
      name: 'B_GUBUN',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_TITLE',
      type: sql.NVarChar(400),
      required: true,
    },
    {
      name: 'B_CONTENTS',
      type: sql.NText,
      required: true,
    },
    {
      name: 'B_FILE_PATH1',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_FILE_PATH2',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_FILE_PATH3',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_FILE_PATH4',
      type: sql.NVarChar(100),
      required: true,
    },
    {
      name: 'B_FILE_PATH5',
      type: sql.NVarChar(100),
      required: true,
    },
  ],
};
procedureNames['noticeBoardUpdate'] = {
  name: currentName,
  returnName: 'NOTICE_BOARD_UPDATE',
};
procedureInfo.setProcedureInfo(currentName, currentInfo);
currentName = 'SP_BOARD_MAIN_DELETE';
currentInfo = {
  usingCache: false,
  params: [
    {
      name: 'B_UID',
      type: sql.NVarChar(50),
      required: true,
    },
    {
      name: 'B_IDX',
      type: sql.BigInt,
      required: true,
    },
  ],
};
procedureNames['noticeBoardDelete'] = {
  name: currentName,
  returnName: 'NOTICE_BOARD_DELETE',
};
procedureInfo.setProcedureInfo(currentName, currentInfo);

exports.procedureInfo = procedureInfo;
exports.procedureNames = procedureNames;
