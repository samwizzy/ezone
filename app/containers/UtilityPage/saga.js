import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import * as AppActions from '../App/actions';
import * as AppSelectors from '../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../components/Endpoints';

export function* addUtilityFile({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateUtilityFileApi}`;
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
  }
}

export function* addUtilityTasks({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateUtilityTasksApi}`;
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
  }
}

export function* getUtilityTasks() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetUtilityTasksApi}/${user.organisation.orgId}`;

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
  }
}

export function* getUtilityTasksByStatus({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetUtilityTasksByStatusApi}?orgId=${
    user.organisation.orgId
  }&status=${payload}`;

  try {
    const utilityTasksResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(utilityTasksResponse, 'utilityTasksResponse');

    yield put(Actions.getUtilityTasksByStatusSuccess(utilityTasksResponse));
  } catch (err) {
    // yield put(Actions.getUtilityTasksError(err));
  }
}

export function* getUtilityTask({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetUtilityTaskApi}/${payload}`;

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
    // console.error(err, 'I got the error');
  }
}

export function* getUserByUUID({ type, payload }) {
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

    yield put(Actions.getUserByUUIDSuccess(userResponse));
  } catch (err) {
    // yield put(Actions.getUserByUUIDError(err));
    // console.error(err, 'I got the error');
  }
}

export function* getUtilityFiles() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetUtilityFilesApi}/${
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

export function* deleteUtilityFile({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.DeleteUtilityFileApi}/${payload.docId}`;

  console.log(payload, "DELETE_DOCUMENT")

  try {
    const utilityFileResponse = yield call(request, requestURL, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });

    console.log(utilityFileResponse, 'deleteFileResponse');
    yield put(
      AppActions.openSnackBar({
        open: true,
        message: `${utilityFileResponse.document.docName} has been deleted successfully`,
        status: 'success',
      }),
    );

    // yield put(Actions.deleteDocumentSuccess(utilityFileResponse));
  } catch (err) {
    // yield put(Actions.getUtilityFileError(err));
  }
}

export function* getUtilityFile({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetUtilityFileApi}/${payload}`;

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

export function* shareUtilityFiles({type, payload}) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.ShareDocumentApi}`;

  console.log(payload, "payload")

  try {
    const sharedDocResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(
      AppActions.openSnackBar({
        open: true,
        message: `${sharedDocResponse.document.docName} has been shared successfully`,
        status: 'success',
      }),
    );
    console.log(sharedDocResponse, "sharedDocResponse")
    // yield put(Actions.shareDocumentSuccess(sharedDocResponse));
  } catch (err) {
    // yield put(Actions.getSharedDocumentsError(err));
  }
}

export function* getSharedUtilityFiles({type, payload}) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetShareDocumentApi}/${payload}`;

  console.log(payload, "payload")

  try {
    const sharedDocResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(sharedDocResponse, 'get sharedDocResponse');

    yield put(Actions.getSharedDocumentsSuccess(sharedDocResponse));
  } catch (err) {
    // yield put(Actions.getSharedDocumentsError(err));
  }
}

export function* getFavoriteUtilityFiles({type, payload}) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetFavoriteDocumentApi}/${payload}`;

  console.log(payload, "payload")

  try {
    const favDocResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(favDocResponse, 'get favDocResponse');

    yield put(Actions.getFavoriteDocumentsSuccess(favDocResponse));
  } catch (err) {
    // yield put(Actions.getUtilityFileError(err));
  }
}

export function* favoriteUtilityFile({type, payload}) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.FavoriteDocumentApi}`;

  console.log(payload, "payload")

  try {
    const favDocResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(favDocResponse, 'favDocResponse');

    yield put(Actions.favoriteDocumentSuccess(favDocResponse));
  } catch (err) {
    // yield put(Actions.getUtilityFileError(err));
  }
}

export function* unfavoriteUtilityFile({type, payload}) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.FavoriteDocumentApi}`;

  try {
    const favDocResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(favDocResponse, 'favDocResponse');

    yield put(Actions.favoriteDocumentSuccess(favDocResponse));
  } catch (err) {
    // yield put(Actions.getUtilityFileError(err));
  }
}

export function* getAllUsers() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${Endpoints.GetAllUsersApi}/${
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

  const requestURL = `${Endpoints.GetUsersChatApi}/?userUid=${
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
  const requestURL = `${Endpoints.GetEmployeesApi}`;

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
    // console.error(err, 'I got the error');
  }
}

export function* getUserChatData() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const userChatDetails = yield select(Selectors.makeSelectGetUserChatData());

  console.log(userChatDetails, 'userChatDetails');
  const requestURL = `${Endpoints.GetUserChatDataApi}/?chatId=${
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
  const requestURL = `${Endpoints.SendMessageApi}`;

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
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
  yield takeLatest(Constants.GET_USER_BY_UUID, getUserByUUID);
  yield takeLatest(
    Constants.GET_UTILITY_TASKS_BY_STATUS,
    getUtilityTasksByStatus,
  );
  yield takeLatest(Constants.GET_UTILITY_TASKS, getUtilityTasks);
  yield takeLatest(Constants.GET_UTILITY_TASK, getUtilityTask);
  yield takeLatest(Constants.GET_UTILITY_FILE, getUtilityFile);
  yield takeLatest(Constants.SHARE_DOCUMENT, shareUtilityFiles);
  yield takeLatest(Constants.DELETE_DOCUMENT, deleteUtilityFile);
  yield takeLatest(Constants.GET_UTILITY_FILES, getUtilityFiles);
  yield takeLatest(Constants.GET_SHARED_DOCS_BY_UUID, getSharedUtilityFiles);
  yield takeLatest(Constants.GET_FAVORITE_DOCS_BY_UUID, getFavoriteUtilityFiles);
  yield takeLatest(Constants.FAVORITE_FILE_BY_DOC_ID, favoriteUtilityFile);
  yield takeLatest(Constants.CREATE_UTILITY_TASKS, addUtilityTasks);
  yield takeLatest(Constants.CREATE_UTILITY_FILES, addUtilityFile);
  yield takeLatest(Constants.GET_ALL_USERS, getAllUsers);
  yield takeLatest(Constants.GET_ALL_USERS_CHAT, getAllUsersChat);
  yield takeLatest(Constants.GET_USER_CHAT_DATA, getUserChatData);
  yield takeLatest(Constants.POST_MSG, postMsg);
}
