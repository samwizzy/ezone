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
  const requestURL = `${Endpoints.GetEmployeesApi}`;
  console.log(accessToken, "i just hit the saga")

  try {
    const employeesResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(employeesResponse, "employeesResponse")

    yield put(Actions.getEmployeesSuccess(employeesResponse));
  } catch (err) {
    // yield put(Actions.getEmployeesError(err));
    // console.error(err, 'I got the error');
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
    // console.error(err, 'I got the error');
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* HRRootSaga() {
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
  yield takeLatest(Constants.GET_EMPLOYEE, getEmployeeByUUID);
}
