/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import * as AppActions from '../../App/actions';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../../components/Endpoints';

function errorHandler(promise) {
  return promise
}
/**
 * Github repos request/response handler
 */
export function* getGoals() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetPerformanceApi}/${user && user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "goals response")

    yield put(Actions.getGoalsSuccess(response));
  } catch (err) {
  }
}

export function* createGoals({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreatePerformanceApi}`;
  payload.orgId = user && user.organisation.orgId

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "create goals response")
    yield put(AppActions.openSnackBar({ message: 'Performance Goal created successfully', status: 'success' }));

    yield put(Actions.createGoalsSuccess(response));
  } catch (err) {
    const error = yield call(errorHandler, err.response.json());
    console.log(error, "goal create error")
  }
}

export function* getRecognitions() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetRecognitionApi}/${user && user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "recognitions response")

    yield put(Actions.getRecognitionsSuccess(response));
  } catch (err) {
  }
}

export function* createRecognition({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateRecognitionApi}`;
  payload.orgId = user && user.organisation.orgId

  console.log(payload, "creating recognition")

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "create recognition response")

    yield put(Actions.createRecognitionSuccess(response));
  } catch (err) {
    const error = yield call(errorHandler, err.response.json());
    console.log(error, "goal create error")
  }
}

export function* getEmployees() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeesByOrgIdApi}/${user && user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    console.log(response, "get employee response")
    yield put(Actions.getEmployeesSuccess(response));
  } catch (err) {
    if (err.message) {
      yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
    } else {
      const error = yield call(errorHandler, err.response.json())
      yield put(AppActions.openSnackBar({ message: error.message, status: 'error' }));
      // yield put(Actions.getEmployeesError(err));
    }
  }
}

export function* getDepartments() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetDepartmentsByOrgIdApi}?orgId=${user && user.organisation.id}&tagId=5`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'DEPARTMENT RESPONSE BY ORGID');
    yield put(Actions.getDepartmentsSuccess(response));
  } catch (err) {
    console.log(err.response, "dept error message")
    if (err.response.status === 400) {
      yield put(AppActions.openSnackBar({ message: "Something Went Wrong", status: 'warning' }));
    }
  }
}

export function* getBranches() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetBranches}?orgId=${user && user.organisation.id}&tagId=1`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'BRANCHES RESPONSE BY ORGID');
    yield put(Actions.getBranchesSuccess(response));
  } catch (err) {
    console.log(err.response, "dept error message")
    if (err.response.status === 400) {
      yield put(AppActions.openSnackBar({ message: "Something Went Wrong", status: 'warning' }));
    }
  }
}

export function* getRoles() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetRoles}?orgId=${user && user.organisation.orgId}&type=ROLE`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'ROLES RESPONSE BY ORGID');
    yield put(Actions.getRolesSuccess(response));
  } catch (err) {
    console.log(err.response, "dept error message")
    if (err.response.status === 400) {
      yield put(AppActions.openSnackBar({ message: "Something Went Wrong", status: 'warning' }));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* PerformanceRootSaga() {
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
  yield takeLatest(Constants.GET_DEPARTMENTS, getDepartments);
  yield takeLatest(Constants.GET_BRANCHES, getBranches);
  yield takeLatest(Constants.GET_ROLES, getRoles);
  yield takeLatest(Constants.GET_GOALS, getGoals);
  yield takeLatest(Constants.CREATE_GOALS, createGoals);
  yield takeLatest(Constants.CREATE_RECOGNITION, createRecognition);
}
