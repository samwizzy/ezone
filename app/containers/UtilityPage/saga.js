import { call, put, all, take, select, takeLatest } from 'redux-saga/effects';
import qs from 'query-string';
import request from '../../utils/request';

import { BaseUrl } from '../../components/BaseUrl';
// import {AppSelectors.makeSelectAccessToken, AppSelectors.makeSelectCurrentUser} from "../App/selectors";
import * as AppSelectors from '../App/selectors';
// import * as Selectors from './selectors';
import * as Actions from './actions';
import * as AppActions from '../App/actions';
import * as Constants from './constants';
import * as Endpoints from '../../components/Endpoints';

export function* addUtilityFile({ type, payload }) {
  console.log(payload, 'checking data from saga');
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${BaseUrl}${Endpoints.CreateUtilityFilesApi}`;
  payload.orgId = user.organisation.orgId;

  try {
    const createdFileResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(createdFileResponse, 'createdFileResponse');

    yield put(Actions.createUtilityFileSuccess(createdFileResponse));
  } catch (err) {
    yield put(Actions.getUtilityFilesError(err));
    console.error(err, 'I got the error');
  }
}

export function* addUtilityTasks({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${BaseUrl}${Endpoints.CreateUtilityTasksApi}`;
  payload.orgId = user.organisation.orgId;
  console.log(payload, 'Task Payloader');
  try {
    const createdTasksResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(createdTasksResponse, 'createdTasksResponse');

    yield put(Actions.createUtilityFileSuccess(createdTasksResponse));
    yield put(
      AppActions.openSnackBar({
        open: true,
        message: `${createdTasksResponse.title} has been created successfully`,
        status: 'success',
      }),
    );
  } catch (err) {
    yield put(Actions.getUtilityTasksError(err));
    console.error(err, 'I got the error');
  }
}

export function* getUtilityTasks() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${BaseUrl}${Endpoints.GetUtilityTasksApi}/${
    user.organisation.orgId
  }`;

  console.log(accessToken, 'accessToken');
  console.log(user, 'Current Users');

  try {
    const utilityTasksResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(utilityTasksResponse, 'utilityTasksResponse');

    yield put(Actions.getUtilityTasksSuccess(utilityTasksResponse));
  } catch (err) {
    // yield put(Actions.getUtilityTasksError(err));
    console.error(err, 'I got the error');
  }
}

export function* getUtilityFiles() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${BaseUrl}${Endpoints.GetUtilityFilesApi}/${
    user.organisation.id
  }`;

  console.log(accessToken, 'accessToken');
  console.log(user, 'Current Users');

  try {
    const utilityFilesResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });

    console.log(utilityFilesResponse, 'utilityFilesResponse');

    yield put(Actions.getUtilityFiles(utilityFilesResponse));
  } catch (err) {
    yield put(Actions.getUtilityFilesError(err));
  }
}

export function* getAllUsers() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${BaseUrl}${Endpoints.GetAllUsersApi}/${
    currentUser.organisation.orgId
  }`;

  try {
    const getAllUsersResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllUsersSuccess(getAllUsersResponse));
  } catch (err) {
    yield put(Actions.getAllUsersError(err));
  }
}

export function* getAllUsersChat() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  console.log(currentUser, 'currentUser');
  const requestURL = `${BaseUrl}${Endpoints.GetUsersChatApi}/${
    currentUser.uuId
  }`;

  try {
    const getAllUsersChatResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(getAllUsersChatResponse, 'getAllUsersChatResponse');
    yield put(Actions.getAllUsersChatSuccess(getAllUsersChatResponse));
  } catch (err) {
    yield put(Actions.getAllUsersChatError(err));
  }
}

// Individual exports for testing
export default function* UtilityPageSaga() {
  // yield all([getUtilityTasks()])
  yield takeLatest(Constants.GET_UTILITY_TASKS, getUtilityTasks);
  yield takeLatest(Constants.GET_UTILITY_FILES, getUtilityFiles);
  yield takeLatest(Constants.CREATE_UTILITY_TASKS, addUtilityTasks);
  yield takeLatest(Constants.CREATE_UTILITY_FILES, addUtilityFile);
  yield takeLatest(Constants.GET_ALL_USERS, getAllUsers);
  yield takeLatest(Constants.GET_ALL_USERS_CHAT, getAllUsersChat);
}
