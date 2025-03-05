import { TYPES } from 'mssql';
import procedureService from '../services/procedure.service';

// 게시판 목록 개수 조회
const countResult = await procedureService.execute('SP_BOARD_MAIN_LIST_CNT', [
  { name: 'B_UID', type: TYPES.NVarChar(100), value: 'user1', required: true },
  { name: 'B_GUBUN', type: TYPES.NVarChar(100), value: 'notice', required: true },
  { name: 'IP_NO', type: TYPES.NVarChar(100), value: '127.0.0.1', required: true },
  { name: 'D_SDATE', type: TYPES.NVarChar(100), value: '2025-01-01', required: true },
  { name: 'D_EDATE', type: TYPES.NVarChar(100), value: '2025-12-31', required: true },
  { name: 'MY_NOTICE', type: TYPES.NVarChar(100), value: 'Y', required: true }
]);

// 게시판 목록 조회
const listResult = await procedureService.execute('SP_BOARD_MAIN_LIST', [
  { name: 'B_UID', type: TYPES.NVarChar(100), value: 'user1', required: true },
  { name: 'B_GUBUN', type: TYPES.NVarChar(100), value: 'notice', required: true },
  { name: 'IP_NO', type: TYPES.NVarChar(100), value: '127.0.0.1', required: true },
  { name: 'D_SDATE', type: TYPES.NVarChar(100), value: '2025-01-01', required: true },
  { name: 'D_EDATE', type: TYPES.NVarChar(100), value: '2025-12-31', required: true },
  { name: 'MY_NOTICE', type: TYPES.NVarChar(100), value: 'Y', required: true },
  { name: 'PAGE_SIZE', type: TYPES.Int, value: 10, required: true },
  { name: 'PAGE_NO', type: TYPES.Int, value: 1, required: true }
]);
