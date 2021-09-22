import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import * as AppConstants from '../../App/constants';
import * as AppActions from '../../App/actions';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../../components/Endpoints';

export function* getJobs() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.JobApi}/${currentUser &&
    currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getJobsSuccess(response));
  } catch (err) {
    yield put(Actions.getJobsError(err));
  }
}

export function* getCustomers() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllContactsApi}/${currentUser &&
    currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getCustomersSuccess(response));
  } catch (err) {
    yield put(Actions.getCustomersError(err));
  }
}

export function* getEmployees() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeesByOrgIdApi}/${currentUser &&
    currentUser.organisation.orgId}`;

  const header = new Headers({
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  });

  console.log(header, 'header employees');
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
    yield put(Actions.getEmployeesError(err));
  }
}

export function* createJob({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.JobApi}`;
  payload.orgId = currentUser && currentUser.organisation.orgId;

  const header = new Headers({
    method: 'POST',
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  });

  console.log(header, 'header job');
  console.log(payload, 'payload job');

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(
      AppActions.openSnackBar({
        message: `${response.name} job created successfully`,
        status: 'success',
      }),
    );
    yield put(Actions.createJobSuccess(response));
    yield put(Actions.getJobs());
  } catch (err) {
    yield put(Actions.createJobError(err));
  }
}

export function* updateJob({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.JobApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(
      AppActions.openSnackBar({
        message: `${response.name} job updated successfully`,
        status: 'success',
      }),
    );
    yield put(Actions.updateJobSuccess(response));
    yield put(Actions.getJobs());
  } catch (err) {
    yield put(Actions.updateJobError(err));
  }
}

// Individual exports for testing
export default function* jobsSaga() {
  yield takeLatest(Constants.UPDATE_JOB, updateJob);
  yield takeLatest(Constants.CREATE_JOB, createJob);
  yield takeLatest(Constants.GET_JOBS, getJobs);
  yield takeLatest(Constants.GET_CUSTOMERS, getCustomers);
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
}
