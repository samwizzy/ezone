import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../../../App/selectors';
// import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../../utils/request';
import swal from 'sweetalert';
import * as Endpoints from '../../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';

export function* getGeneralJournal({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = payload;

  const requestURL = `${
    Endpoints.GetGeneralJournalApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }`;
  console.log('requestURL', requestURL);

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(Actions.getGeneralJournalsSuccess(response));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getGeneralJournalsError(err));
  }
}

/** General chart of accounts */
export function* getChartOfAccount({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = payload;

  const requestURL = `${
    Endpoints.GetChartOfAccountApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }&pageFrom=0&pageTo=0`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
      }),
    });
    yield put(Actions.getChartOfAccountsSuccess(response));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getChartOfAccountsError(err));
  }
}

/** General Ledger */
export function* getGeneralLedger({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = payload;
  console.log(payload, 'get ledgers payload');

  const requestURL = `${
    Endpoints.GetGeneralLedgerApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }`;
  console.log('requestURL', requestURL);

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    console.log(response, 'response');
    yield put(Actions.getGeneralLedgersSuccess(response));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getGeneralLedgersError(err));
  }
}
/** Get Fixed Asset Register saga */

export function* getFixedAssetRegister({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = payload;

  const requestURL = `${
    Endpoints.GetFixedAssetRegisterApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }`;
  console.log('getFixedAssetRegister payload', payload);

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(Actions.getFixedAssetRegisterSuccess(response));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getFixedAssetRegisterError(err));
  }
}

/** Get Fixed Asset Schedule saga */

export function* getFixedAssetSchedule({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = payload;

  const requestURL = `${
    Endpoints.GetFixedAssetScheduleApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }`;
  console.log('getFixedAssetSchedule payload', payload);

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(Actions.getFixedAssetScheduleSuccess(response));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getFixedAssetScheduleError(err));
  }
}

/** Get Income statement API */

export function* getIncomeStatementSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = yield select(Selectors.makeSelectTime());

  const requestURL = `${
    Endpoints.GetIncomeStatementReportApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }`;
  console.log('requestURL', requestURL);

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(Actions.getIncomeStatementSuccesAction(response));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getIncomeStatementErrorAction(err));
  }
}

/** Get Cash Flow API */

export function* getCashFlow({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = payload;

  const requestURL = `${
    Endpoints.GetCashFlowReportApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }`;
  console.log('requestURL', requestURL);

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(Actions.getCashFlowSuccess(response));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getCashFlowError(err));
  }
}

/** Get Financial Position API */

export function* getFinancialPosition({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = payload;

  const requestURL = `${
    Endpoints.GetFinancialPositionReportApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }`;
  console.log('requestURL', requestURL);

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(Actions.getFinancialPositionSuccess(response));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getFinancialPositionError(err));
  }
}

/** Get trial balance saga */
export function* getTrialBalance({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = payload;

  const requestURL = `${
    Endpoints.GetTrialBalanceApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }`;
  console.log('requestURL', requestURL);

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(Actions.getAllTrialBalanceSuccess(response));
    console.log('ttttttttttttttttttttt', response);
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getAllTrialBalanceError(err));
  }
}

/** Get Cash account register */
export function* getCashAccountRegister({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = payload;

  console.log(payload, 'getCashAccountRegister payload');

  const requestURL = `${
    Endpoints.GetCashAccountRegisterApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(Actions.getCashAccountRegisterSuccess(response));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getCashAccountRegisterError(err));
  }
}

// Individual exports for testing
export default function* ReportSaga() {
  yield takeLatest(Constants.GET_GENERAL_JOURNALS, getGeneralJournal);
  yield takeLatest(Constants.GET_CHART_OF_ACCOUNTS, getChartOfAccount);
  yield takeLatest(Constants.GET_GENERAL_LEDGERS, getGeneralLedger);
  yield takeLatest(Constants.GET_ALL_TRIAL_BALANCE, getTrialBalance);
  yield takeLatest(Constants.GET_FIXED_ASSET_REGISTER, getFixedAssetRegister);
  yield takeLatest(Constants.GET_FIXED_ASSET_SCHEDULE, getFixedAssetSchedule);
  yield takeLatest(
    Constants.GET_ALL_INCOME_STATEMENT_TYPES,
    getIncomeStatementSaga,
  );
  yield takeLatest(Constants.GET_CASH_FLOW, getCashFlow);
  yield takeLatest(Constants.GET_FINANCIAL_POSITION, getFinancialPosition);
  yield takeLatest(Constants.GET_CASH_ACCOUNT_REGISTER, getCashAccountRegister);
}
