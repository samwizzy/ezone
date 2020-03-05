import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';

import { BaseUrl } from '../../components/BaseUrl';
import * as AppActions from '../App/actions';
import * as AppSelectors from '../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../components/Endpoints';

export function* addUtilityFile({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${BaseUrl}${Endpoints.CreateUtilityFileApi}`;
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
    yield put({ type: Constants.GET_UTILITY_TASKS });
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

export function* getUtilityTask({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${BaseUrl}${Endpoints.GetUtilityTaskApi}/${payload}`;

  try {
    const utilityTaskResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(utilityTaskResponse, 'utilityTaskResponse');

    yield put(Actions.getUtilityTaskSuccess(utilityTaskResponse));
  } catch (err) {
    // yield put(Actions.getUtilityTasksError(err));
    console.error(err, 'I got the error');
  }
}

export function* getUserByUUID({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${BaseUrl}${Endpoints.GetUserByUUIDApi}/${payload}`;

  try {
    const userResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(userResponse, 'userResponse');

    yield put(Actions.getUserByUUIDSuccess(userResponse));
  } catch (err) {
    // yield put(Actions.getUserByUUIDError(err));
    console.error(err, 'I got the error');
  }
}

export function* getAssignedToByUUID({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${BaseUrl}${Endpoints.GetUserByUUIDApi}/${payload}`;

  try {
    const userResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(userResponse, 'userResponse');

    yield put(Actions.getAssignedToByUUIDSuccess(userResponse));
  } catch (err) {
    // yield put(Actions.getUserByUUIDError(err));
    console.error(err, 'I got the error');
  }
}

export function* getUtilityFiles() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${BaseUrl}${Endpoints.GetUtilityFilesApi}/${
    user.organisation.orgId
  }`;

  try {
    const utilityFilesResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });

    console.log(utilityFilesResponse, 'utilityFilesResponse');

    yield put(Actions.getUtilityFilesSuccess(utilityFilesResponse));
  } catch (err) {
    yield put(Actions.getUtilityFilesError(err));
  }
}

export function* getUtilityFile({type, payload}) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${BaseUrl}${Endpoints.GetUtilityFileApi}/${payload}`;

  try {
    const utilityFileResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });

    console.log(utilityFileResponse, 'utilityFileResponse');

    yield put(Actions.getUtilityFileSuccess(utilityFileResponse));
  } catch (err) {
    // yield put(Actions.getUtilityFileError(err));
  }
}

export function* getCreatedByUUID({type, payload}) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${BaseUrl}${Endpoints.GetUserByUUIDApi}/${payload}`;

  try {
    const userResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(userResponse, "userResponse")

    yield put(Actions.getCreatedByUUIDSuccess(userResponse));
  } catch (err) {
    // yield put(Actions.getUserByUUIDError(err));
    console.error(err, "I got the error")
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

  const requestURL = `${BaseUrl}${Endpoints.GetUsersChatApi}/?userUid=${
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

    yield put(Actions.getAllUsersChatSuccess(getAllUsersChatResponse));
  } catch (err) {
    yield put(Actions.getAllUsersChatError(err));
  }
}

export function* getEmployees() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${BaseUrl}${Endpoints.GetEmployeesApi}`;

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
    // yield put(Actions.getUtilityTasksError(err));
    console.error(err, 'I got the error');
  }
}

export function* getUserChatData() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const userChatDetails = yield select(Selectors.makeSelectGetUserChatData());

  console.log(userChatDetails, 'userChatDetails');
  const requestURL = `${BaseUrl}${Endpoints.GetUserChatDataApi}/?chatId=${
    userChatDetails.initiator
  }&limit=${10}&start=${10}`;

  try {
    const userChatDataResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getUserChatDataSuccess(userChatDataResponse));
  } catch (err) {
    yield put(Actions.getUserChatDataError(err));
  }
}

export function* postMsg() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const userChatData = yield select(Selectors.makeSelectGetUserChatData());
  const postMsgDetails = yield select(Selectors.makeSelectPostMsg());
  postMsgDetails.recipientId = userChatData.responder;
  postMsgDetails.recipientName = userChatData.responderName;
  postMsgDetails.senderId = userChatData.initiator;
  postMsgDetails.senderName = userChatData.initiatorName;

  console.log(userChatData, 'userChatData');
  console.log(postMsgDetails, 'postMsgDetails');
  const requestURL = `${BaseUrl}${Endpoints.SendMessageApi}`;

  try {
    const postMsgResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(postMsgDetails),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.postMsgSuccess(postMsgResponse));
  } catch (err) {
    yield put(Actions.postMsgError(err));
  }
}

// Individual exports for testing
export default function* UtilityPageSaga() {
  // yield all([getUtilityTasks()])
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
  yield takeLatest(Constants.GET_USER_BY_UUID, getUserByUUID);
  yield takeLatest(Constants.GET_CREATEDBY_BY_UUID, getCreatedByUUID);
  yield takeLatest(Constants.GET_ASSIGNEDTO_BY_UUID, getAssignedToByUUID);
  yield takeLatest(Constants.GET_UTILITY_TASKS, getUtilityTasks);
  yield takeLatest(Constants.GET_UTILITY_TASK, getUtilityTask);
  yield takeLatest(Constants.GET_UTILITY_FILE, getUtilityFile);
  yield takeLatest(Constants.GET_UTILITY_FILES, getUtilityFiles);
  yield takeLatest(Constants.CREATE_UTILITY_TASKS, addUtilityTasks);
  yield takeLatest(Constants.CREATE_UTILITY_FILES, addUtilityFile);
  yield takeLatest(Constants.GET_ALL_USERS, getAllUsers);
  yield takeLatest(Constants.GET_ALL_USERS_CHAT, getAllUsersChat);
  yield takeLatest(Constants.GET_USER_CHAT_DATA, getUserChatData);
  yield takeLatest(Constants.POST_MSG, postMsg);
}
