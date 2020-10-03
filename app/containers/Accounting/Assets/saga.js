import { takeLatest, call, put, select } from 'redux-saga/effects';
import swal from 'sweetalert';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
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

    swal('Success', 'Accounting setup successful', 'success');
    yield put(Actions.getAccountingSetup());
    yield put(Actions.getChartOfAccounts());
    yield put(Actions.createAccountingSetupSuccess(response));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.createAccountingSetupError(err));
  }
}

export function* getAccountingSetup() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAccountingSetupApi}/${
    currentUser.organisation.orgId
    }`;

  console.log('We never goit to you account setup geyt');

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'getAccountingSetup response coming in');

    yield put(Actions.getAccountingSetupSuccess(response));
  } catch (err) {
    yield put(Actions.getAccountingSetupError(err));
  }
}

export function* getAllAccountingPeriod() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllAccountingPeriodApi}/${
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

    yield put(Actions.getAllAccountingPeriodSuccess(response));
  } catch (err) {
    yield put(Actions.getAllAccountingPeriodError(err));
  }
}

export function* getDefaultChartOfAccounts() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllChartOfAccountApi}/${
    currentUser.organisation.orgId
    }`; // API for the default charts pending

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

export function* getDepreciationArea() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetDepreciationAreaByOrgIdApi}?orgId=${
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

    yield put(Actions.getDepreciationAreaSuccess(response));
  } catch (err) {
    yield put(Actions.getDepreciationAreaError(err));
  }
}

export function* createDepreciationArea({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.AddDepreciationAreaApi}`;
  payload.orgId = currentUser.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createDepreciationAreaSuccess(response));
    yield put(Actions.getDepreciationArea());
    yield put(Actions.closeNewDepreciationAreaDialog());
  } catch (err) {
    yield put(Actions.createDepreciationAreaError(err));
  }
}

export function* getDepreciationTypes() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetDepreciationTypeByOrgIdApi}?orgId=${
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

    yield put(Actions.getDepreciationTypesSuccess(response));
  } catch (err) {
    yield put(Actions.getDepreciationTypesError(err));
  }
}

export function* createDepreciationType({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.AddDepreciationTypeApi}`;
  payload.orgId = currentUser.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createDepreciationTypeSuccess(response));
    yield put(Actions.getDepreciationTypes());
    yield put(Actions.closeNewDepreciationTypeDialog());
  } catch (err) {
    yield put(Actions.createDepreciationTypeError(err));
  }
}

export function* getChartOfAccounts() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllChartOfAccountApi}/${
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

    yield put(Actions.getChartOfAccountsSuccess(response));
  } catch (err) {
    yield put(Actions.getChartOfAccountsError(err));
  }
}

export function* getAllBusinessTypes() {
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

    console.log(response, 'response GetAllBusinessTypes');

    yield put(Actions.getBusinessTypesSuccess(response));
  } catch (err) {
    yield put(Actions.getBusinessTypesError(err));
  }
}

export function* getCurrencies() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetCurrencyByOrgIdApi}?orgId=${
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

    console.log(response, 'response getCurrencies');

    yield put(Actions.getCurrenciesSuccess(response));
  } catch (err) {
    yield put(Actions.getCurrenciesError(err));
  }
}

export function* createCurrency({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateCurrencyApi}`;
  payload.orgId = currentUser.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createCurrencySuccess(response));
    yield put(Actions.getCurrencies());
    yield put(Actions.closeNewCurrencyDialog());
  } catch (err) {
    yield put(Actions.createCurrencyError(err));
  }
}

export function* getTaxes() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetTaxTypeByOrgIdApi}?orgId=${
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

    console.log(response, 'response getCurrencies');

    yield put(Actions.getTaxesSuccess(response));
  } catch (err) {
    yield put(Actions.getTaxesError(err));
  }
}

export function* createTax({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.AddTaxApi}`;
  payload.orgId = currentUser.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response createtax');

    yield put(Actions.createTaxSuccess(response));
    yield put(Actions.getTaxes());
    yield put(Actions.closeNewTaxDialog());
  } catch (err) {
    yield put(Actions.createTaxError(err));
  }
}

export function* getAssets() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAssetByOrgIdApi}?orgId=${
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

    console.log(response, 'response getCurrencies');

    yield put(Actions.getAssetsSuccess(response));
  } catch (err) {
    yield put(Actions.getAssetsError(err));
  }
}

export function* getAssetById({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAssetByIdApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response getCurrencies');

    yield put(Actions.getAssetByIdSuccess(response));
  } catch (err) {
    yield put(Actions.getAssetByIdError(err));
  }
}

export function* createAsset({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.AddAssetApi}`;
  payload.orgId = currentUser.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createAssetSuccess(response));
    yield put(Actions.getAssets());
    yield put(Actions.closeNewAssetDialog());
  } catch (err) {
    yield put(Actions.createAssetError(err));
  }
}

export function* updateAsset({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.UpdateAssetApi}`;
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

    yield put(Actions.updateAssetSuccess(response));
    yield put(Actions.getAssets());
    yield put(Actions.closeNewAssetDialog());
  } catch (err) {
    yield put(Actions.updateAssetError(err));
  }
}

export function* getAssetTypes() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAssetTypeByOrgIdApi}?orgId=${
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

    console.log(response, 'response getCurrencies');

    yield put(Actions.getAssetTypesSuccess(response));
  } catch (err) {
    yield put(Actions.getAssetTypesError(err));
  }
}

export function* createAssetType({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateAssetTypeApi}`;
  payload.orgId = currentUser.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createAssetTypeSuccess(response));
    yield put(Actions.getAssetTypes());
    yield put(Actions.closeNewAssetTypeDialog());
  } catch (err) {
    yield put(Actions.createAssetTypeError(err));
  }
}

export function* createAccountPeriod({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateAccountPeriodApi}`;
  payload.orgId = currentUser.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal('Success', 'Accounting period created successfully', 'success');
    yield put(Actions.getAllAccountingPeriod());
    yield put(Actions.createAccountPeriodSuccess(response));
    yield put(Actions.closeAccountPeriodDialog());
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.createAccountPeriodError(err));
  }
}

export function* updateAccountPeriod({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateAccountPeriodStatusApi}?id=${
    payload.id
    }&status=false`;
  delete payload.id;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal('Success', 'Accounting period updated successfully', 'success');
    yield put(Actions.getAllAccountingPeriod());
    yield put(Actions.updateAccountPeriodSuccess(response));
    yield put(Actions.closeAccountPeriodDialog());
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.updateAccountPeriodError(err));
  }
}

export function* updateAccountPeriodStatus({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateAccountPeriodStatusApi}?id=${
    payload.id
    }&status=${payload.status}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal('Success', 'Accounting period status updated successfully', 'success');
    yield put(Actions.getAllAccountingPeriod());
    yield put(Actions.updateAccountPeriodStatusSuccess(response));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.updateAccountPeriodStatusError(err));
  }
}

export function* setAccountPeriodAsActive({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.SetAccountPeriodAsActiveApi}?id=${
    payload.id
    }&orgId=${currentUser.organisation.orgId}&year=true`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response setAccountPeriodAsActive');

    swal(
      'Success',
      'Accounting period has been activated successfully',
      'success',
    );
    yield put(Actions.getAllAccountingPeriod());
    yield put(Actions.setAccountPeriodAsActiveSuccess(response));
    yield put(Actions.closeAccountPeriodDialog());
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.setAccountPeriodAsActiveError(err));
  }
}

// Individual exports for testing
export default function* SettingsSaga() {
  yield takeLatest(Constants.CREATE_ACCOUNTING_SETUP, createAccountSetup);
  yield takeLatest(Constants.GET_ACCOUNTING_SETUP, getAccountingSetup);
  yield takeLatest(Constants.GET_ALL_ACCOUNTING_PERIOD, getAllAccountingPeriod);
  yield takeLatest(Constants.GET_CHART_OF_ACCOUNTS, getChartOfAccounts);
  yield takeLatest(
    Constants.GET_DEFAULT_CHART_OF_ACCOUNTS,
    getDefaultChartOfAccounts,
  );
  yield takeLatest(Constants.GET_BUSINESS_TYPES, getAllBusinessTypes);
  yield takeLatest(Constants.GET_DEPRECIATION_AREA, getDepreciationArea);
  yield takeLatest(Constants.CREATE_DEPRECIATION_AREA, createDepreciationArea);
  yield takeLatest(Constants.GET_DEPRECIATION_TYPES, getDepreciationTypes);
  yield takeLatest(Constants.CREATE_DEPRECIATION_TYPE, createDepreciationType);
  yield takeLatest(Constants.GET_CURRENCIES, getCurrencies);
  yield takeLatest(Constants.CREATE_CURRENCY, createCurrency);
  yield takeLatest(Constants.GET_TAXES, getTaxes);
  yield takeLatest(Constants.CREATE_TAX, createTax);
  yield takeLatest(Constants.GET_ASSETS, getAssets);
  yield takeLatest(Constants.GET_ASSET_BY_ID, getAssetById);
  yield takeLatest(Constants.CREATE_ASSET, createAsset);
  yield takeLatest(Constants.UPDATE_ASSET, updateAsset);
  yield takeLatest(Constants.GET_ASSET_TYPES, getAssetTypes);
  yield takeLatest(Constants.CREATE_ASSET_TYPE, createAssetType);
  yield takeLatest(Constants.CREATE_ACCOUNT_PERIOD, createAccountPeriod);
  yield takeLatest(Constants.UPDATE_ACCOUNT_PERIOD, updateAccountPeriod);
  yield takeLatest(
    Constants.UPDATE_ACCOUNT_PERIOD_STATUS,
    updateAccountPeriodStatus,
  );
  yield takeLatest(
    Constants.SET_ACCOUNT_PERIOD_AS_ACTIVE,
    setAccountPeriodAsActive,
  );
}
