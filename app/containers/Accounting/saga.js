import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../App/selectors';
import * as AppActions from '../App/actions';
import * as Selectors from './selectors';
import { BaseUrl } from '../../components/BaseUrl';
import request from '../../utils/request';
import * as Endpoints from '../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';


export function* getAllAccountTypeSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetAllAccountTypeApi}`;

  try {
    const allAccountTypeResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('allAccountTypeResponse -->', allAccountTypeResponse);
    yield put(Actions.getAllAccountTypeSuccessAction(allAccountTypeResponse));

  } catch (err) {
    console.log('getAllAccountTypeErrorAction--->', err);
    yield put(Actions.getAllAccountTypeErrorAction(err));
  }
}

export function* getDetailTypeSaga({type, payload}) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetDetailTypeApi}/${payload.type}`;

  try {
    const detailTypeResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('detailTypeResponse -->', detailTypeResponse);
    yield put(Actions.getDetailTypeSuccessAction(detailTypeResponse));

  } catch (err) {
    console.log('getDetailTypeErrorAction--->', err);
    yield put(Actions.getDetailTypeErrorAction(err));
  }
}

// Create new chart of account
export function* createNewChartOfAccountSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const chartOfAccountPostData = yield select(
    Selectors.makeSelectChartOfAccountPostData(),
  );

  chartOfAccountPostData.orgId = currentUser.organisation.orgId;
  const requestURL = `${Endpoints.CreateChartOfAccountApi}`;

  try {
    const chartOfAccountResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(chartOfAccountPostData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('chartOfAccountResponse -> ', chartOfAccountResponse);
    alert(`Account Name: ${chartOfAccountResponse.accountName} was saved successfully!`);
    yield put(Actions.createNewChartOfAccountSuccessAction(chartOfAccountResponse));
    yield put(Actions.getAllChartOfAccountTypeAction());
  } catch (err) {
    console.log('createNewChartOfAccountErrorAction -> ', err);
    alert(`Something went wrong.`);
    yield put(Actions.createNewChartOfAccountErrorAction(err));
  }
}

// Update a chart of account
export function* updateChartOfAccountSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateChartOfAccountApi}`;

  const updateChartOfAccountData = yield select(
    Selectors.makeSelectChartOfAccountPostData(),
  );
  
  try {
    const updateChartOfAccountResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(updateChartOfAccountData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('updateChartOfAccountResponse -> ', updateChartOfAccountResponse);
    alert(`Account was updated successfully!`);
    yield put(Actions.updateChartOfAccountSuccessAction(updateChartOfAccountResponse));
    yield put(Actions.getAllChartOfAccountTypeAction());
  } catch (err) {
    alert(`Something went wrong.`);
    yield put(Actions.updateChartOfAccountErrorAction(err));
  }
}

// Delete a chart of account
export function* deleteChartOfAccountSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const deleteChartOfAccountData = yield select(
    Selectors.makeSelectChartOfAccountPostData(),
  );
  const requestURL = `${Endpoints.DeleteChartOfAccountApi}/${deleteChartOfAccountData.id}`;
  
  try {
    const deleteChartOfAccountResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(deleteChartOfAccountData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('deleteChartOfAccountResponse -> ', deleteChartOfAccountResponse);
    alert(`Account deleted successfully!`);
    yield put(Actions.deleteChartOfAccountSuccessAction(deleteChartOfAccountResponse));
    yield put(Actions.getAllChartOfAccountTypeAction());
  } catch (err) {
    alert(`Something went wrong.`);
    yield put(Actions.deleteChartOfAccountErrorAction(err));
  }
}


// Get list of chart of account
export function* getAllChartOfAccountSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllChartOfAccountApi}/${currentUser.organisation.orgId}`;

  try {
    const chartOfAccountListResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('chartOfAccountListResponse -->', chartOfAccountListResponse);
    yield put(Actions.getAllChartOfAccountTypeSuccessAction(chartOfAccountListResponse));
  } catch (err) {
    console.log('getAllChartOfAccountTypeErrorAction--->', err);
    yield put(Actions.getAllChartOfAccountTypeErrorAction(err));
  }
}

// Get accounting setup
export function* getAccountingSetupSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAccountingSetupApi}/${currentUser.organisation.orgId}`;

  try {
    const accountingSetupResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('accountingSetupResponse -->', accountingSetupResponse);
    yield put(Actions.getAccountingSetupSuccessAction(accountingSetupResponse));
  } catch (err) {
    console.log('getAccountingSetupErrorAction --> ', err);
    yield put(Actions.getAccountingSetupErrorAction(err));
  }
}

// Create accounting setup
export function* createAccountingSetupSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const accountingSetupPostData = yield select(
    Selectors.makeSelectAccountingSetupPostData(),
  );
  const requestURL = `${Endpoints.CreateAccountingSetupApi}`;

  try {
    const accountingSetupResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(accountingSetupPostData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('accountingSetupResponse -> ', accountingSetupResponse);
    alert(`Accounting setup successful!`);
    yield put(Actions.getAccountingSetupAction());
    yield put(Actions.createAccountingSetupSuccessAction(accountingSetupResponse));
  } catch (err) {
    console.log('createAccountingSetupErrorAction -> ', err);
    alert(`Something went wrong.`);
    yield put(Actions.createAccountingSetupErrorAction(err));
  }
}


export function* getAccountPeriodSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAccountPeriodApi}/${currentUser.organisation.orgId}`;
  console.log('getAccountPeriodSaga requestURL', requestURL);

  try {
    const accountPeriodResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('accountPeriodResponse -->', accountPeriodResponse);
    yield put(Actions.getAccountPeriodSuccessAction(accountPeriodResponse));
  } catch (err) {
    console.log('getAllAccountPeriodErrorAction--->', err);
    yield put(Actions.getAccountPeriodErrorAction(err));
  }
}


// Create accounting setup
export function* createAccountJournalSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const accountJournalPostData = yield select(
    Selectors.makeSelectNewAccountJournalPostData(),
  );
  const requestURL = `${Endpoints.CreateAccountJournalApi}`;
  console.log('journal requestURL ', requestURL);

  try {
    const accountJournalResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(accountJournalPostData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('accountJournalResponse -> ', accountJournalResponse);
    alert(`Account journal successful!`);
    yield put(Actions.createNewAccountJournalSuccessAction(accountJournalResponse));
  } catch (err) {
    console.log('createAccountingSetupErrorAction -> ', err);
    alert(`Something went wrong.`);
    yield put(Actions.createNewAccountJournalErrorAction(err));
  }
}


// Individual exports for testing
export default function* AccountingSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(Constants.GET_ALL_ACCOUNT_TYPES, getAllAccountTypeSaga);
  yield takeLatest(Constants.GET_DETAIL_TYPES, getDetailTypeSaga);
  yield takeLatest(Constants.CREATE_NEW_CHART_OF_ACCOUNT, createNewChartOfAccountSaga);
  yield takeLatest(Constants.GET_ALL_CHART_OF_ACCOUNT, getAllChartOfAccountSaga);
  yield takeLatest(Constants.UPDATE_CHART_OF_ACCOUNT, updateChartOfAccountSaga);
  yield takeLatest(Constants.DELETE_CHART_OF_ACCOUNT, deleteChartOfAccountSaga);
  yield takeLatest(Constants.GET_ACCOUNTING_SETUP, getAccountingSetupSaga);
  yield takeLatest(Constants.CREATE_ACCOUNTING_SETUP, createAccountingSetupSaga);
  yield takeLatest(Constants.GET_ACCOUNT_PERIOD, getAccountPeriodSaga);
  yield takeLatest(Constants.CREATE_NEW_ACCOUNT_JOURNAL, createAccountJournalSaga);
}
