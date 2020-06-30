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
export function* getLeaveRequest() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetLeaveRequestsApi}/${user && user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getLeaveRequestSuccess(response));
  } catch (err) {
    if (err.message) {
      yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
    } else {
      const error = yield call(errorHandler, err.response.json())
      yield put(AppActions.openSnackBar({ message: error.message, status: 'success' }));
    }
  }
}

export function* createLeaveRequest({ payload }) {
  const { leaveTypeId, ...rest } = payload
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateLeaveRequestApi}/${leaveTypeId}`;

  console.log(rest, "rest from payload create request")

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(rest),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "create leave request response")
    yield put(AppActions.openSnackBar({ message: "Leave request created successfully", status: 'success' }));

    yield put(Actions.createLeaveRequestSuccess(response));
    yield put(Actions.getLeaveRequest());
    yield put(Actions.closeNewLeaveRequestDialog());
  } catch (err) {
    if (err.message) {
      console.log(err)
      yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
    } else {
      const error = yield call(errorHandler, err.response.json())
      console.log(error, "an attempt to add leave type")
      yield put(AppActions.openSnackBar({ message: error.message, status: 'error' }));
    }
  }
}
export function* createLeaveType({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateLeaveTypeApi}`;
  payload.orgId = user && user.organisation.orgId

  console.log(payload, "payoad get types")

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(AppActions.openSnackBar({ message: "Leave type created successfully", status: 'success' }));
    yield put(Actions.createLeaveTypeSuccess(response));
    yield put(Actions.closeNewLeaveTypeDialog());
    yield put({ type: Constants.GET_LEAVE_TYPES });
  } catch (err) {
    console.log(err, "creation type err")
    if (err.message) {
      yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
    } else {
      const error = yield call(errorHandler, err.response.json())
      console.log(error, "an attempt to add leave types")
      yield put(AppActions.openSnackBar({ message: error.message, status: 'error' }));
    }
  }
}

export function* getLeaveTypes() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetLeaveTypesApi}/${user && user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "get leave types response")

    yield put(Actions.getLeaveTypesSuccess(response));
  } catch (err) {
    if (err.message) {
      console.log(err)
      yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
    } else {
      const error = yield call(errorHandler, err.response.json())
      console.log(error, "an attempt to add leave type")
      yield put(AppActions.openSnackBar({ message: error.message, status: 'success' }));
    }
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
export default function* LeaveMgtRootSaga() {
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
  yield takeLatest(Constants.GET_DEPARTMENTS, getDepartments);
  yield takeLatest(Constants.GET_BRANCHES, getBranches);
  yield takeLatest(Constants.GET_ROLES, getRoles);
  yield takeLatest(Constants.GET_LEAVE_REQUEST, getLeaveRequest);
  yield takeLatest(Constants.CREATE_LEAVE_REQUEST, createLeaveRequest);
  yield takeLatest(Constants.GET_LEAVE_TYPES, getLeaveTypes);
  yield takeLatest(Constants.CREATE_LEAVE_TYPE, createLeaveType);
}
