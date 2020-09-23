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
    yield put(Actions.getAccountingSetupAction());
    yield put(Actions.createAccountingSetupSuccessAction(response));
  } catch (err) {
    swal("Error", "Something went wrong", "error");
    yield put(Actions.createAccountingSetupErrorAction(err));
  }
}

export function* getAccountingSetup() {
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
    yield put(Actions.getAccountingSetupErrorAction(err));
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

    yield put(Actions.getAllAccountingPeriodSuccessAction(response));
  } catch (err) {
    yield put(Actions.getAllAccountingPeriodErrorAction(err));
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
  const accountPeriodPostData = yield select(
    Selectors.makeSelectAccountPeriodPostData(),
  );
  const requestURL = `${Endpoints.CreateAccountPeriodApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(accountPeriodPostData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal("Success", "Accounting period created successfully", "success");
    yield put(Actions.getAllAccountingPeriodAction());
    yield put(Actions.createAccountPeriodSuccessAction(response));
    yield put(Actions.closeAccountPeriodDialog());
  } catch (err) {
    swal("Error", "Something went wrong", "error");
    yield put(Actions.createAccountPeriodErrorAction(err));
  }
}

export function* updateAccountPeriodSaga({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const accountPeriodPostData = yield select(
    Selectors.makeSelectAccountPeriodPostData(),
  );
  const requestURL = `${Endpoints.UpdateAccountPeriodApi}?id=${payload.id}&status=false`;
  console.log('payload -> ', payload);

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(accountPeriodPostData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal("Success", "Accounting period updated successfully", "success");
    yield put(Actions.getAllAccountingPeriodAction());
    yield put(Actions.updateAccountPeriodSuccessAction(response));
    yield put(Actions.closeAccountPeriodDialog());
  } catch (err) {
    swal("Error", "Something went wrong", "error");
    yield put(Actions.updateAccountPeriodErrorAction(err));
  }
}

export function* setAccountPeriodAsActive({ type, payload }) {
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

    swal("Success", "Accounting period set successfully", "success");
    yield put(Actions.getAllAccountingPeriodAction());
    yield put(Actions.setAccountPeriodAsActiveSuccessAction(accountActiveResponse));
    yield put(Actions.closeAccountPeriodDialog());
  } catch (err) {
    swal("Error", "Something went wrong", "error");
    yield put(Actions.setAccountPeriodAsActiveErrorAction(err));
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
  yield takeLatest(Constants.UPDATE_ACCOUNT_PERIOD, updateAccountPeriodSaga);
  yield takeLatest(Constants.SET_ACCOUNT_PERIOD_AS_ACTIVE, setAccountPeriodAsActive);
}

