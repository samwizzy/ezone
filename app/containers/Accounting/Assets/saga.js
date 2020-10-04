import { takeLatest, call, put, select } from 'redux-saga/effects';
import swal from 'sweetalert';
import { push } from 'connected-react-router';
import history from './../../../utils/history'
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';

export function* getChartOfAccounts() {
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

export function* getAssets() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAssetByOrgIdApi}?orgId=${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

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

    swal('Success', 'Asset created successfully!', 'success');
    yield put(Actions.createAssetSuccess(response));
    yield put(Actions.getAssets());
    yield put(Actions.closeNewAssetDialog());
    yield put(push('/account/fixedassets'));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.createAssetError(err));
  }
}

export function* disposeAsset({ payload }) {
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

    swal('Success', 'Asset disposed successfully!', 'success');
    yield put(Actions.disposeAssetSuccess(response));
    yield put(Actions.getAssets());
    yield put(Actions.closeAssetDisposalDialog());
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.disposeAssetError(err));
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

    swal('Success', 'Asset updated successfully!', 'success');
    yield put(Actions.updateAssetSuccess(response));
    yield put(Actions.getAssets());
    yield put(Actions.closeNewAssetDialog());
    yield put(push('/account/fixedassets'));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.updateAssetError(err));
  }
}

export function* getAssetTypes() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAssetTypeByOrgIdApi}?orgId=${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

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

    swal('Success', 'Asset type created successfully!', 'success');
    yield put(Actions.createAssetTypeSuccess(response));
    yield put(Actions.getAssetTypes());
    yield put(Actions.closeNewAssetTypeDialog());
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.createAssetTypeError(err));
  }
}


// Individual exports for testing
export default function* SettingsSaga() {
  yield takeLatest(Constants.GET_CHART_OF_ACCOUNTS, getChartOfAccounts);
  yield takeLatest(Constants.GET_ASSETS, getAssets);
  yield takeLatest(Constants.GET_ASSET_BY_ID, getAssetById);
  yield takeLatest(Constants.CREATE_ASSET, createAsset);
  yield takeLatest(Constants.DISPOSE_ASSET, disposeAsset);
  yield takeLatest(Constants.UPDATE_ASSET, updateAsset);
  yield takeLatest(Constants.GET_ASSET_TYPES, getAssetTypes);
  yield takeLatest(Constants.CREATE_ASSET_TYPE, createAssetType);
}
