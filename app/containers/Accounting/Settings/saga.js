import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';


// Create accounting setup
export function* createAccountSetupSaga() {
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


// Get accounting setup data
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

    yield put(Actions.getAccountingSetupSuccessAction(accountingSetupResponse));
  } catch (err) {
    console.log('getAccountingSetupErrorAction --> ', err);
    yield put(Actions.getAccountingSetupErrorAction(err));
  }
}


// Get list of accounting period data
export function* getAllAccountingPeriodSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllAccountingPeriodApi}/${currentUser.organisation.orgId}`;

  console.log('acc period requestURL -> ', requestURL);

  try {
    const accountingPeriodResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('accountingPeriodResponse -> ', accountingPeriodResponse);
    yield put(Actions.getAllAccountingPeriodSuccessAction(accountingPeriodResponse));
  } catch (err) {
    console.log('getAllAccountingPeriodErrorAction --> ', err);
    yield put(Actions.getAllAccountingPeriodErrorAction(err));
  }
}


// Create accounting period
export function* createAccountPeriodSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const accountPeriodPostData = yield select(
    Selectors.makeSelectAccountPeriodPostData(),
  );
  const requestURL = `${Endpoints.CreateAccountPeriodApi}`;

  try {
    const accountPeriodResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(accountPeriodPostData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('accountPeriodResponse -> ', accountPeriodResponse);
    alert(`Accounting period created successfully!`);
    yield put(Actions.getAllAccountingPeriodAction());
    yield put(Actions.createAccountPeriodSuccessAction(accountPeriodResponse));
    yield put(Actions.closeAccountPeriodDialog());
  } catch (err) {
    console.log('createAccountPeriodErrorAction -> ', err);
    alert(`Something went wrong.`);
    yield put(Actions.createAccountPeriodErrorAction(err));
  }
}


// Create accounting period
export function* updateAccountPeriodSaga({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const accountPeriodPostData = yield select(
    Selectors.makeSelectAccountPeriodPostData(),
  );
  const requestURL = `${Endpoints.UpdateAccountPeriodApi}?id=${payload.id}&status=false`;

  console.log('payload -> ', payload);

  try {
    const updatedAccountPeriodResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(accountPeriodPostData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('updatedAccountPeriodResponse -> ', updatedAccountPeriodResponse);
    alert(`Accounting period updated successfully!`);
    yield put(Actions.getAllAccountingPeriodAction());
    yield put(Actions.updateAccountPeriodSuccessAction(accountPeriodResponse));
    yield put(Actions.closeAccountPeriodDialog());
  } catch (err) {
    console.log('updateAccountPeriodErrorAction -> ', err);
    alert(`Something went wrong.`);
    yield put(Actions.updateAccountPeriodErrorAction(err));
  }
}


// Set accounting period as active
export function* setAccountPeriodAsActiveSaga({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());  
  const requestURL = `${Endpoints.SetAccountPeriodAsActiveApi}?id=${payload.id}&orgId=${payload.orgId}&year=true`;

  try {
    const accountActiveResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: "",
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('accountActiveResponse -> ', accountActiveResponse);
    alert(`Accounting period set successfully!`);
    yield put(Actions.getAllAccountingPeriodAction());
    yield put(Actions.setAccountPeriodAsActiveSuccessAction(accountActiveResponse));
    yield put(Actions.closeAccountPeriodDialog());
  } catch (err) {
    console.log('updateAccountPeriodErrorAction -> ', err);
    alert(`Something went wrong.`);
    yield put(Actions.setAccountPeriodAsActiveErrorAction(err));
  }
}


// Individual exports for testing
export default function* SettingsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(Constants.CREATE_ACCOUNTING_SETUP, createAccountSetupSaga);
  yield takeLatest(Constants.GET_ACCOUNTING_SETUP, getAccountingSetupSaga);
  yield takeLatest(Constants.GET_ALL_ACCOUNTING_PERIOD, getAllAccountingPeriodSaga);
  yield takeLatest(Constants.CREATE_ACCOUNT_PERIOD, createAccountPeriodSaga);
  yield takeLatest(Constants.UPDATE_ACCOUNT_PERIOD, updateAccountPeriodSaga);
  yield takeLatest(Constants.SET_ACCOUNT_PERIOD_AS_ACTIVE, setAccountPeriodAsActiveSaga);
}

