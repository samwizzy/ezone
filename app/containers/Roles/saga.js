import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import * as AppConstants from '../App/constants';
import * as AppActions from '../App/actions';
import * as AppSelectors from '../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../components/Endpoints';

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

export function* getRoles() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetRolesApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getRolesSuccess(response));
  } catch (err) {
    yield put(Actions.getRolesError(err));
  }
}

export function* getRoleById({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetRoleByIdApi}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getRoleByIdSuccess(response));
  } catch (err) {
    yield put(Actions.getRoleByIdError(err));
  }
}

export function* getRightsByRoleId({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetRightsByRoleIdApi}/${payload}/getRights`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getRightsByRoleIdSuccess(response));
  } catch (err) {
    yield put(Actions.getRightsByRoleIdError(err));
  }
}

export function* createRole({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateRoleApi}`;
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

    yield put(Actions.createRoleSuccess(response));
    yield put(Actions.getRoles());
    yield put(Actions.closeNewRoleDialog());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "error creating campaign")
    yield put(Actions.createRoleError(err));
  }
}

export function* updateRole({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.UpdateRoleApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.updateRoleSuccess(response));
    yield put(Actions.getRoles());
    yield put(Actions.closeNewRoleDialog());
  } catch (err) {
    yield put(Actions.updateRoleError(err));
  }
}

export function* createRight({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateRightApi}`;
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

    yield put(Actions.createRightSuccess(response));
    yield put(Actions.getRights());
    yield put(Actions.closeNewRightDialog());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "error creating campaign")
    yield put(Actions.createRightError(err));
  }
}

export function* updateRight({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.UpdateRightApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.updateRightSuccess(response));
    yield put(Actions.getRights());
    yield put(Actions.closeNewRightDialog());
  } catch (err) {
    yield put(Actions.updateRightError(err));
  }
}

export function* getRoleRights() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetRolesRightsApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getRoleRightsSuccess(response));
  } catch (err) {
    yield put(Actions.getRoleRightsError(err));
  }
}

export function* getRoleRightById({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetRoleRightsByIdApi}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "getRoleRightById response")

    yield put(Actions.getRoleRightByIdSuccess(response));
  } catch (err) {
    yield put(Actions.getRoleRightByIdError(err));
  }
}

export function* createRoleRight({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateRoleRightsApi}`;
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

    yield put(Actions.createRoleRightSuccess(response));
    yield put(Actions.getRoleRights());
    yield put(Actions.closeNewRoleRightDialog());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "error creating campaign")
    yield put(Actions.createRoleRightError(err));
  }
}

export function* updateRoleRight({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.UpdateRoleRightsApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.updateRoleRightSuccess(response));
    yield put(Actions.getRoleRights());
    yield put(Actions.closeNewRoleRightDialog());
  } catch (err) {
    yield put(Actions.updateRoleRightError(err));
  }
}

// Individual exports for testing
export default function* rolesSaga() {
  yield takeLatest(Constants.GET_ROLES, getRoles);
  yield takeLatest(Constants.CREATE_ROLE, createRole);
  yield takeLatest(Constants.UPDATE_ROLE, updateRole);
  yield takeLatest(Constants.GET_RIGHTS_BY_ROLE_ID, getRightsByRoleId);

  yield takeLatest(Constants.CREATE_RIGHT, createRight);
  yield takeLatest(Constants.UPDATE_RIGHT, updateRight);

  yield takeLatest(Constants.GET_ROLE_RIGHTS, getRoleRights);
  yield takeLatest(Constants.CREATE_ROLE_RIGHT, createRoleRight);
  yield takeLatest(Constants.UPDATE_ROLE_RIGHT, updateRoleRight);

  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
}
