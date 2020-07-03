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
export function* getAttendances() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAttendances}/${user && user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    console.log(response, "Attendances response")
    yield put(Actions.getAttendancesSuccess(response));
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
  const requestURL = `${Endpoints.GetShifts}?orgId=${user && user.organisation.orgId}`;

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
  const requestURL = `${Endpoints.GetEmployeesByOrgIdApi}/${user && user.organisation.orgId}?start=0&limit=10`;

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
    if (err.response.status === 500) {
      yield put(AppActions.openSnackBar({ message: "Interval Server Error", status: 'error' }));
    }
    // yield put(Actions.getEmployeesError(err));
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

    yield put(Actions.getDepartmentsSuccess(response));
  } catch (err) {
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

    console.log(response, 'Branch RESPONSE attendance');
    yield put(Actions.getBranchesSuccess(response));
  } catch (err) {
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

    console.log(response, 'ROLES RESPONSE');
    yield put(Actions.getRolesSuccess(response));
  } catch (err) {
  }
}

export function* createAttendance({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateAttendanceApi}`;
  payload.orgId = user && user.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'ATENDANCE RESPONSE');

    yield put(AppActions.openSnackBar({ message: "Attendance created successfully", status: 'success' }));
    yield put({ type: Constants.CLOSE_NEW_ATTENDANCE_DIALOG });
    yield put({ type: Constants.GET_ATTENDANCES });
  } catch (err) {
    const error = yield call(errorHandler, err.response.json())
    if (error.status === 500 || error.status === 400) {
      yield put(AppActions.openSnackBar({ message: error.message, status: 'error' }));
      yield put({ type: Constants.CLOSE_NEW_ATTENDANCE_DIALOG });
      yield put(Actions.createAttendanceError(error.message));
    }
  }
}

export function* createShift({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateShift}`;
  payload.orgId = user && user.organisation.orgId;
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
    yield put(AppActions.openSnackBar({ message: "Shift created successfully", status: 'success' }));
    yield put({ type: Constants.CLOSE_NEW_SHIFT_DIALOG });
    yield put({ type: Constants.GET_SHIFTS });
  } catch (err) {
    yield put(AppActions.openSnackBar({ message: 'Internal Server Error', status: 'error' }));
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "shift err message")
  }
}

export function* assignShift({ payload }) {
  console.log(payload, "payload first in saga");
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.AssignShift}/${payload.shiftId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload.usersId),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'ASSIGN SHIFT RESPONSE');

    yield put(AppActions.openSnackBar({ message: "Shift assigned successfully", status: 'success' }));
    yield put({ type: Constants.CLOSE_NEW_EMPLOYEE_SHIFT_DIALOG });
    yield put({ type: Constants.GET_EMPLOYEES });
  } catch (err) {
    yield put(AppActions.openSnackBar({ message: 'Internal Server Error', status: 'error' }));
    console.log(err.message, "assign shift err message")
  }
}

export function* assignShiftToParty({ payload }) {
  console.log(payload, "assignShiftToParty payload in saga");
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.AssignPartyToShift}/${payload.shiftId}?partyId=${payload.partyId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'ASSIGN SHIFT RESPONSE');

    yield put(AppActions.openSnackBar({ message: "Shift assigned successfully", status: 'success' }));
    yield put({ type: Constants.CLOSE_NEW_EMPLOYEE_SHIFT_DIALOG });
    yield put({ type: Constants.GET_EMPLOYEES });
  } catch (err) {
    // yield put(AppActions.openSnackBar({message: signupRes.message, status: 'error'}));
    console.log(err.message, "assign shift err message")
  }
}

export function* getUsersByShift({ payload }) {
  console.log(payload, "get shifted users payload");
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetUserByShift}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'GET USER ASSIGN SHIFT RESPONSE');
    yield put(Actions.getUsersByShiftSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, "get users shift err message")
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* AttendanceRootSaga() {
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
  yield takeLatest(Constants.GET_DEPARTMENTS, getDepartments);
  yield takeLatest(Constants.GET_BRANCHES, getBranches);
  yield takeLatest(Constants.GET_ROLES, getRoles);

  yield takeLatest(Constants.GET_ATTENDANCES, getAttendances);
  yield takeLatest(Constants.CREATE_ATTENDANCE, createAttendance);
  yield takeLatest(Constants.GET_SHIFTS, getShifts);
  yield takeLatest(Constants.GET_DAYS, getDays);
  yield takeLatest(Constants.CREATE_SHIFT, createShift);
  yield takeLatest(Constants.ASSIGN_SHIFT, assignShift);
  yield takeLatest(Constants.ASSIGN_SHIFT_TO_PARTY, assignShiftToParty);
  yield takeLatest(Constants.GET_USERS_BY_SHIFT, getUsersByShift);
}
