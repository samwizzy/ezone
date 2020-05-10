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


/**
 * Github repos request/response handler
 */
export function* getAttendances() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAttendances}`;

  try {
    const attendancesResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    console.log(attendancesResponse, "Attendances response")
    yield put(Actions.getAttendancesSuccess(attendancesResponse));
  } catch (err) {
    console.log(err, "attd error")
  }
}

export function* getDays() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetDays}`;

  try {
    const daysResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    console.log(daysResponse, "Days response")
    yield put(Actions.getDaysSuccess(daysResponse));
  } catch (err) {
    console.log(err, "Days error")
  }
}

export function* getShifts() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetShifts}?orgId=${user.organisation.orgId}`;
  
  try {
    const shiftsResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    console.log(shiftsResponse, "Shifts response")
    yield put(Actions.getShiftsSuccess(shiftsResponse));
  } catch (err) {
    console.log(err, "Shifts error")
  }
}
export function* getEmployees() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeesByOrgIdApi}/${user.organisation.orgId}`;

  try {
    const employeesResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    console.log(employeesResponse, "emplyees response");
    yield put(Actions.getEmployeesSuccess(employeesResponse));
  } catch (err) {
    console.log(err, "emplyees error");
    // yield put(Actions.getEmployeesError(err));
  }
}

export function* createShift({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateShift}`;
  payload.orgId = user.organisation.orgId;
  console.log(payload, "shift payload")
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'SHIFT RESPONSE');
    alert("SHIFT created");
    yield put({type: Constants.CLOSE_NEW_ATTENDANCE_DIALOG});
    yield put({type: Constants.GET_SHIFTS});
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "shift err message")
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* AttendanceRootSaga() {
  yield takeLatest(Constants.GET_ATTENDANCES, getAttendances);
  yield takeLatest(Constants.GET_SHIFTS, getShifts);
  yield takeLatest(Constants.GET_DAYS, getDays);
  yield takeLatest(Constants.CREATE_SHIFT, createShift);
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
}
