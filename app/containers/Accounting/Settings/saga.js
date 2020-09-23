import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import swal from 'sweetalert';
import * as Constants from './constants';

export function* createAccountSetup({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.CreateAccountingSetupApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal("Success", "Accounting setup successful", "success");
    yield put(Actions.getAccountingSetup());
    yield put(Actions.createAccountingSetupSuccess(response));
  } catch (err) {
    swal("Error", "Something went wrong", "error");
    yield put(Actions.createAccountingSetupError(err));
  }
}

export function* getAccountingSetup() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAccountingSetupApi}/${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAccountingSetupSuccess(response));
  } catch (err) {
    yield put(Actions.getAccountingSetupError(err));
  }
}


export function* getAllAccountingPeriod() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllAccountingPeriodApi}/${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllAccountingPeriodSuccess(response));
  } catch (err) {
    yield put(Actions.getAllAccountingPeriodError(err));
  }
}

export function* GetDefaultChartOfAccounts() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllChartOfAccountApi}/${currentUser.organisation.orgId}`; // API for the default charts pending

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getDefaultChartOfAccountsSuccess(response));
  } catch (err) {
    yield put(Actions.getDefaultChartOfAccountsError(err));
  }
}

export function* GetDepreciationArea() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetDepreciationAreaByOrgIdApi}/${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getDepreciationAreaSuccess(response));
  } catch (err) {
    yield put(Actions.getDepreciationAreaError(err));
  }
}

export function* GetChartOfAccounts() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllChartOfAccountApi}/${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getChartOfAccountsSuccess(response));
  } catch (err) {
    yield put(Actions.getChartOfAccountsError(err));
  }
}

export function* GetAllBusinessTypes() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetAllBusinessTypesApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "response GetAllBusinessTypes")

    yield put(Actions.getBusinessTypesSuccess(response));
  } catch (err) {
    yield put(Actions.getBusinessTypesError(err));
  }
}

export function* GetCurrencies() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetCurrencyByOrgIdApi}?orgId=${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "response getCurrencies")

    yield put(Actions.getCurrenciesSuccess(response));
  } catch (err) {
    yield put(Actions.getCurrenciesError(err));
  }
}

export function* createAccountPeriod({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateAccountPeriodApi}`;
  payload.orgId = currentUser.organisation.orgId

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal("Success", "Accounting period created successfully", "success");
    yield put(Actions.getAllAccountingPeriod());
    yield put(Actions.createAccountPeriodSuccess(response));
    yield put(Actions.closeAccountPeriodDialog());
  } catch (err) {
    swal("Error", "Something went wrong", "error");
    yield put(Actions.createAccountPeriodError(err));
  }
}

export function* updateAccountPeriod({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateAccountPeriodStatusApi}?id=${payload.id}&status=false`;
  delete payload.id

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal("Success", "Accounting period updated successfully", "success");
    yield put(Actions.getAllAccountingPeriod());
    yield put(Actions.updateAccountPeriodSuccess(response));
    yield put(Actions.closeAccountPeriodDialog());
  } catch (err) {
    swal("Error", "Something went wrong", "error");
    yield put(Actions.updateAccountPeriodError(err));
  }
}

export function* updateAccountPeriodStatus({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateAccountPeriodStatusApi}?id=${payload.id}&status=${payload.status}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal("Success", "Accounting period status updated successfully", "success");
    yield put(Actions.getAllAccountingPeriod());
    yield put(Actions.updateAccountPeriodStatusSuccess(response));
  } catch (err) {
    swal("Error", "Something went wrong", "error");
    yield put(Actions.updateAccountPeriodStatusError(err));
  }
}

export function* setAccountPeriodAsActive({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.SetAccountPeriodAsActiveApi}?id=${payload.id}&orgId=${currentUser.organisation.orgId}&year=true`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "response setAccountPeriodAsActive")

    swal("Success", "Accounting period has been activated successfully", "success");
    yield put(Actions.getAllAccountingPeriod());
    yield put(Actions.setAccountPeriodAsActiveSuccess(response));
    yield put(Actions.closeAccountPeriodDialog());
  } catch (err) {
    swal("Error", "Something went wrong", "error");
    yield put(Actions.setAccountPeriodAsActiveError(err));
  }
}


// Individual exports for testing
export default function* SettingsSaga() {
  yield takeLatest(Constants.CREATE_ACCOUNTING_SETUP, createAccountSetup);
  yield takeLatest(Constants.GET_ACCOUNTING_SETUP, getAccountingSetup);
  yield takeLatest(Constants.GET_ALL_ACCOUNTING_PERIOD, getAllAccountingPeriod);
  yield takeLatest(Constants.GET_CHART_OF_ACCOUNTS, GetChartOfAccounts);
  yield takeLatest(Constants.GET_DEFAULT_CHART_OF_ACCOUNTS, GetDefaultChartOfAccounts);
  yield takeLatest(Constants.GET_BUSINESS_TYPES, GetAllBusinessTypes);
  yield takeLatest(Constants.GET_DEPRECIATION_AREA, GetDepreciationArea);
  yield takeLatest(Constants.GET_CURRENCIES, GetCurrencies);
  yield takeLatest(Constants.CREATE_ACCOUNT_PERIOD, createAccountPeriod);
  yield takeLatest(Constants.UPDATE_ACCOUNT_PERIOD, updateAccountPeriod);
  yield takeLatest(Constants.UPDATE_ACCOUNT_PERIOD_STATUS, updateAccountPeriodStatus);
  yield takeLatest(Constants.SET_ACCOUNT_PERIOD_AS_ACTIVE, setAccountPeriodAsActive);
}

