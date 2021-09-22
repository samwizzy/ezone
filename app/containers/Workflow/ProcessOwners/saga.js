import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import * as AppConstants from '../../App/constants';
import * as AppActions from '../../App/actions';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../../components/Endpoints';

export function* getEmployees() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeesByOrgIdApi}/${currentUser && currentUser.organisation.orgId}`;

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

export function* getJobs() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllCompaniesApi}/${currentUser && currentUser.organisation.orgId}`;

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

export function* createJob({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateNewContactApi}`;
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

    yield put(Actions.createJobSuccess(response));
    yield put(Actions.getJobs());
    yield put(Actions.closeNewCompanyDialog());
  } catch (err) {
    yield put(Actions.createJobError(err));
  }
}

export function* updateJob({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateContactApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.updateJobSuccess(response));
    yield put(Actions.getJobs());
    yield put(Actions.closeNewJobDialog());
  } catch (err) {
    yield put(Actions.updateJobError(err));
  }
}

// Individual exports for testing
export default function* jobsSaga() {
  yield takeLatest(Constants.UPDATE_JOB, updateJob);
  yield takeLatest(Constants.CREATE_JOB, createJob);
  yield takeLatest(Constants.GET_JOBS, getJobs);
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
}
