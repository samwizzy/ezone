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

export function* getFixedAssetRegisterSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = yield select(Selectors.makeSelectTime());

  const requestURL = `${
    Endpoints.GetFixedAssetRegisterApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }`;
  console.log('requestURL', requestURL);

  try {
    const fixedAssetRegisterResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(
      Actions.getFixedAssetRegisterSuccesAction(fixedAssetRegisterResponse),
    );
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getFixedAssetRegisterErrorAction(err));
  }
}

/** Get Fixed Asset Schedule saga */

export function* getFixedAssetScheduleSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = yield select(Selectors.makeSelectTime());

  const requestURL = `${
    Endpoints.GetFixedAssetScheduleApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }`;
  console.log('requestURL', requestURL);

  try {
    const fixedAssetScheduleResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(
      Actions.getFixedAssetScheduleSuccesAction(fixedAssetScheduleResponse),
    );
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getFixedAssetScheduleErrorAction(err));
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
    const incomeStatementResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(Actions.getIncomeStatementSuccesAction(incomeStatementResponse));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getIncomeStatementErrorAction(err));
  }
}

/** Get Cash Flow API */

export function* getCashFlowSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = yield select(Selectors.makeSelectTime());

  const requestURL = `${
    Endpoints.GetCashFlowReportApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }`;
  console.log('requestURL', requestURL);

  try {
    const cashFlowResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(Actions.getCashFlowSuccesAction(cashFlowResponse));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getCashFlowErrorAction(err));
  }
}

/** Get Financial Position API */

export function* getFinancialPositionSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = yield select(Selectors.makeSelectTime());

  const requestURL = `${
    Endpoints.GetFinancialPositionReportApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }`;
  console.log('requestURL', requestURL);

  try {
    const financialPositionResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(
      Actions.getFinancialPositionSuccesAction(financialPositionResponse),
    );
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getFinancialPositionErrorAction(err));
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

/** Get Cash account register*/

export function* getCashAccountRegisterSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = yield select(Selectors.makeSelectTime());

  const requestURL = `${
    Endpoints.GetCashAccountRegisterApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }`;
  console.log('requestURL', requestURL);

  try {
    const cashAccountRegisterResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(
      Actions.getCashAccountRegisterSuccesAction(cashAccountRegisterResponse),
    );
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getCashAccountRegisterErrorAction(err));
  }
}

// Individual exports for testing
export default function* ReportSaga() {
  yield takeLatest(Constants.GET_GENERAL_JOURNALS, getGeneralJournal);
  yield takeLatest(Constants.GET_CHART_OF_ACCOUNTS, getChartOfAccount);
  yield takeLatest(Constants.GET_GENERAL_LEDGERS, getGeneralLedger);
  yield takeLatest(Constants.GET_ALL_TRIAL_BALANCE, getTrialBalance);
  yield takeLatest(
    Constants.GET_ALL_FIXED_ASSET_REGISTER_TYPES,
    getFixedAssetRegisterSaga,
  );
  yield takeLatest(
    Constants.GET_ALL_FIXED_ASSET_SCHEDULE_TYPES,
    getFixedAssetScheduleSaga,
  );
  yield takeLatest(
    Constants.GET_ALL_INCOME_STATEMENT_TYPES,
    getIncomeStatementSaga,
  );
  yield takeLatest(Constants.GET_ALL_CASH_FLOW_TYPES, getCashFlowSaga);
  yield takeLatest(
    Constants.GET_ALL_FINANCIAL_POSITION_TYPES,
    getFinancialPositionSaga,
  );
  yield takeLatest(
    Constants.GET_ALL_CASH_ACCOUNT_REGISTER_TYPES,
    getCashAccountRegisterSaga,
  );
}
