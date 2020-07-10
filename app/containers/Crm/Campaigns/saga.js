import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import * as AppConstants from '../../App/constants';
import * as AppActions from '../../App/actions';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../../components/Endpoints';

function errorHandler(promise) {
  return promise
}

export function* getEmployees() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeesByOrgIdApi}?orgId=${user && user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getEmployeesSuccess(response));
  } catch (err) {
    if (err.message) {
      yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
      yield put(Actions.getEmployeesError(err.message));
    } else {
      const error = yield call(errorHandler, err.response.json())
      if (error.status === 500 || error.status === 400) {
        yield put(AppActions.openSnackBar({ message: error.message, status: 'error' }));
        yield put(Actions.getEmployeesError(error.message));
      }
    }
  }
}

export function* getCampaigns() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetCampaignsApi}/${currentUser && currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getCampaignsSuccess(response));
  } catch (err) {
    yield put(Actions.getCampaignsError(err));
  }
}

export function* createCampaign({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateCampaignApi}/${currentUser && currentUser.id}`;
  payload.orgId = currentUser && currentUser.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createCampaignSuccess(response));
    yield put(Actions.getCampaigns());
    yield put(Actions.closeNewCampaignDialog());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "error creating campaign")
    yield put(Actions.createCampaignError(err));
  }
}

export function* updateCampaign({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.UpdateCampaignApi}/${currentUser && currentUser.id}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.updateCampaignSuccess(response));
    yield put(Actions.getCampaigns());
    yield put(Actions.closeNewCampaignDialog());
  } catch (err) {
    yield put(Actions.updateCampaignError(err));
  }
}

// Individual exports for testing
export default function* crmCampaignSaga() {
  yield takeLatest(Constants.UPDATE_CAMPAIGN, updateCampaign);
  yield takeLatest(Constants.CREATE_CAMPAIGN, createCampaign);
  yield takeLatest(Constants.GET_CAMPAIGNS, getCampaigns);
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
}
