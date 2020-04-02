/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import * as AppActions from '../App/actions';
import * as AppSelectors from '../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../components/Endpoints';


/**
 * Github repos request/response handler
 */
export function* getEmployees() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeesApi}`;

  console.log(user, "currentUser")

  try {
    const employeesResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getEmployeesSuccess(employeesResponse));
  } catch (err) {
    // yield put(Actions.getEmployeesError(err));
  }
}
export function* getEmployeeByUUID({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetUserByUUIDApi}/${payload}`;

  try {
    const userResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(userResponse, 'userResponse');

    yield put(Actions.getEmployeeSuccess(userResponse));
  } catch (err) {
    // yield put(Actions.getEmployeeError(err.message));
  }
}

export function* createEmployee({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.EmployeeApi}`;
  payload.orgId = user.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'CREATE_EMPLOYEES');
    yield put({type: Constants.GET_EMPLOYEES});
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "err message")
  }
}

export function* getDepartments({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.DepartmentsApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'DEPARTMENT RESPONSE');
    yield put(Actions.getDepartmentsSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "err message")
  }
}

export function* createDepartment({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.DepartmentApi}`;
  payload.orgId = user.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'DEPARTMENT RESPONSE');
    yield put({type: Constants.GET_DEPARTMENTS});
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "err message")
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* HRRootSaga() {
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
  yield takeLatest(Constants.GET_EMPLOYEE, getEmployeeByUUID);
  yield takeLatest(Constants.GET_DEPARTMENTS, getDepartments);
  yield takeLatest(Constants.CREATE_DEPARTMENT, createDepartment);
}
