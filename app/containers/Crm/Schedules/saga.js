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

export function* getContacts() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllContactsApi}/${user && user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "response get contacts")

    yield put(Actions.getContactsSuccess(response));
  } catch (err) {
    console.log(err, "err contacts")
    yield put(Actions.getContactsError(err));
  }
}

export function* getSchedules() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetSchedulesApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "response get schedules")

    yield put(Actions.getSchedulesSuccess(response));
  } catch (err) {
    yield put(Actions.getSchedulesError(err));
  }
}

export function* createSchedule({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateScheduleApi}`;
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
    console.log(response, "response create schedule")

    yield put(AppActions.openSnackBar({ message: 'Schedule created successfully', status: 'success' }));
    yield put(Actions.createScheduleSuccess(response));
    yield put(Actions.getSchedules());
    yield put(Actions.closeNewScheduleDialog());
  } catch (err) {
    if (err.message) {
      yield put(AppActions.openSnackBar({ message: err.message, status: 'warning' }));
    } else {
      const error = yield call(errorHandler, err.response.json())
      console.log(error, "creating contact error")
      yield put(Actions.createScheduleError(error));
    }
  }
}

export function* updateSchedule({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateScheduleApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response update schedule');

    yield put(AppActions.openSnackBar({ message: 'Schedule updated successfully', status: 'error' }));
    yield put(Actions.updateScheduleSuccess(response));
    yield put(Actions.getSchedules());
    yield put(Actions.closeEditScheduleDialog())
  } catch (err) {
    yield put(Actions.updateScheduleError(err));
  }
}

// Individual exports for testing
export default function* crmScheduleSaga() {
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
  yield takeLatest(Constants.GET_CONTACTS, getContacts);
  yield takeLatest(Constants.GET_SCHEDULES, getSchedules);
  yield takeLatest(Constants.CREATE_SCHEDULE, createSchedule);
  yield takeLatest(Constants.UPDATE_SCHEDULE, updateSchedule);
}
