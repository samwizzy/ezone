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
  const requestURL = `${Endpoints.AddDocToFolderApi}`;
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

    console.log(response, 'createdFileResponse');

    yield put(Actions.getAllFoldersAndDocs({ folderId: 0, type: 'ROOT' }));
  } catch (err) {
    yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, 'err message');
  }
}

export function* addDocToFolder({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.AddDocToFolderApi}`;
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

    console.log(response, 'createdFileResponse');
    payload.folderId === 1
      ? yield put(
          Actions.getAllFoldersAndDocs({
            folderId: payload.folderId,
            type: 'ROOT',
          }),
        )
      : yield put(
          Actions.getAllFoldersAndDocs({
            folderId: payload.folderId,
            type: 'FOLDER',
          }),
        );
  } catch (err) {
    yield put(Actions.getUtilityFilesError(err));
  }
}

export function* getAllFoldersAndDoc({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const { uuId } = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllFoldersAndDocApi}/${uuId}/${
    payload.folderId
  }/${payload.type}`;

  console.log(payload, 'All folder and doc payload');

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });

    yield put(Actions.getAllFoldersAndDocsSuccess(response));
  } catch (err) {
    yield put(Actions.getUtilityFilesError(err));
  }
}

export function* getNestedFoldersAndDoc({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const { uuId } = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllFoldersAndDocApi}/${uuId}/${
    payload.folderId
  }/${payload.type}`;

  console.log(payload, 'All folder and doc payload');

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });

    yield put(Actions.getNestedFoldersAndDocsSuccess(response));
  } catch (err) {
    yield put(Actions.getUtilityFilesError(err));
  }
}

export function* addFolderToFolder({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.AddFolderToFolderApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'folder response');
    payload.folderId === 1
      ? yield put(Actions.getAllFoldersAndDocs({ folderId: 0, type: 'ROOT' }))
      : yield put(
          Actions.getAllFoldersAndDocs({
            folderId: payload.folderId,
            type: 'FOLDER',
          }),
        );
    yield put(Actions.closeNewFolderDialog());
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
  }
}

export function* addUtilityTasks({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateUtilityTasksApi}`;
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

    yield put({ type: Constants.GET_UTILITY_TASKS });
    yield put(Actions.closeNewTaskDialog());
    yield put(
      AppActions.openSnackBar({
        open: true,
        message: `${response.title} has been created successfully`,
        status: 'success',
      }),
    );
  } catch (err) {
    yield put(Actions.getUtilityTasksError(err.message));
  }
}

export function* getUtilityTasks() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetUtilityTasksApi}/${user &&
    user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getUtilityTasksSuccess(response));
  } catch (err) {
    yield put(Actions.getUtilityTasksError(err.message));
    console.log(err.message, 'err.message');
  }
}

export function* getUtilityTasksByStatus({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetUtilityTasksByStatusApi}?orgId=${user &&
    user.organisation.orgId}&status=${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getUtilityTasksByStatusSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityTasksError(err.message));
  }
}

export function* getUtilityTask({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetUtilityTaskApi}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getUtilityTaskSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityTasksError(err.message));
  }
}

export function* getCommentsByTaskId({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetAllCommentByTaskIdApi}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(Actions.getTaskCommentsSuccess(response));
  } catch (err) {
    yield put(Actions.commentTaskError(err.message));
  }
}

export function* commentUtilityTask({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.TaskCommentApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'comment response');

    // yield put(
    //   AppActions.openSnackBar({open: true, message: `Comment Posted`, status: 'success' }),
    // );
    yield put(Actions.getTaskComments(response.task.id));
    // yield put(Actions.commentTaskSuccess(response));
  } catch (err) {
    // yield put(Actions.commentTaskError(err.message));
  }
}

export function* updateUtilityTask({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateUtilityTaskApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'utilityTaskResponse');

    yield put(Actions.getUtilityTasks());
    yield put(Actions.getUtilityTask(payload.id));
    yield put(Actions.closeNewTaskDialog());
  } catch (err) {
    yield put(Actions.getUtilityTasksError(err.message));
  }
}

export function* deleteUtilityTask({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.DeleteUtilityTaskApi}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'delete task response');

    yield put(Actions.getUtilityTasks());
    // yield put(Actions.deleteTaskSuccess(response));
  } catch (err) {
    // yield put(Actions.deleteUtilityTaskError(err.message));
  }
}

export function* addAttachmentToTask({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.AddTaskAttachmentApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'utilityTaskResponse');

    yield put(Actions.updateUtilityTaskSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityTasksError(err.message));
  }
}

export function* removeTaskAttachment({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.RemoveTaskAttachmentApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'utilityTaskResponse');

    yield put(Actions.updateUtilityTaskSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityTasksError(err.message));
  }
}

export function* getUserByUUID({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetUserByUUIDApi}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'userResponse');

    yield put(Actions.getUserByUUIDSuccess(response));
  } catch (err) {
    // yield put(Actions.getUserByUUIDError(err));
    // console.error(err, 'I got the error');
  }
}

export function* getUtilityFiles() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetUtilityFilesApi}/${user &&
    user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });

    yield put(Actions.getUtilityFilesSuccess(response));
  } catch (err) {
    yield put(Actions.getUtilityFilesError(err));
  }
}

export function* deleteUtilityFile({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.DeleteUtilityFileApi}`;

  console.log(payload, 'DELETE_DOCUMENT');

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload.data),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'deleteFileResponse');
    payload.parentId === 1
      ? yield put(
          Actions.getAllFoldersAndDocs({
            folderId: payload.folderId,
            type: 'ROOT',
          }),
        )
      : yield put(
          Actions.getAllFoldersAndDocs({
            folderId: payload.folderId,
            type: 'FOLDER',
          }),
        );
    // yield put(Actions.deleteDocumentSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFileError(err));
  }
}

export function* restoreDocument({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.RestoreDocumentApi}`;

  console.log(payload, 'RESTORE_DOCUMENT');

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'restore response');
    payload.id === 1
      ? yield put(
          Actions.getAllFoldersAndDocs({
            folderId: payload.folderId,
            type: 'ROOT',
          }),
        )
      : yield put(
          Actions.getAllFoldersAndDocs({
            folderId: payload.folderId,
            type: 'FOLDER',
          }),
        );
  } catch (err) {
    // yield put(Actions.getUtilityFileError(err));
  }
}

export function* getUtilityFile({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetUtilityFileApi}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });

    console.log(response, 'utilityFileResponse');

    yield put(Actions.getUtilityFileSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFileError(err));
  }
}

export function* shareUtilityFiles({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.ShareDocumentApi}`;

  console.log(payload, 'payload');

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    console.log(response, 'response');
    yield put(Actions.closeShareFileDialog());
    // yield put(
    //   AppActions.openSnackBar({open: true, message: `${response.document.docName} has been shared successfully`, status: 'success' }),
    // );
    // yield put(Actions.shareDocumentSuccess(response));
  } catch (err) {
    // yield put(Actions.sharedDocumentsError(err));
  }
}

export function* getFavoriteUtilityFiles({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetFavoriteDocApi}/${payload}`;

  console.log(payload, 'payload');

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'get favDocResponse');

    yield put(Actions.getFavoriteDocumentsSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFileError(err));
  }
}

export function* favoriteUtilityFile({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.FavoriteDocumentApi}`;

  console.log(payload, 'payload');

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'favDocResponse');

    yield put(Actions.favoriteDocumentSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFileError(err));
  }
}

export function* unfavoriteUtilityFile({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.FavoriteDocumentApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'favDocResponse');

    yield put(Actions.favoriteDocumentSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFileError(err));
  }
}

export function* getAllUsers() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${Endpoints.GetAllUsersApi}/${currentUser &&
    currentUser.organisation.orgId}`;
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

export function* getUserChat() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${Endpoints.GetUserChatApi}/?userUid=${currentUser &&
    currentUser.uuId}`;

  try {
    const getUserChatResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(getUserChatResponse, 'getUserChatResponse');

    yield put(Actions.getAllUsersChatSuccess(getUserChatResponse));
  } catch (err) {
    yield put(Actions.getAllUsersChatError(err));
  }
}

export function* getEmployees() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetEmployeesApi}`;

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
    // yield put(Actions.getUtilityEmployeesError(err));
  }
}

export function* getUserChatData() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const userChatDetails = yield select(Selectors.makeSelectGetUserChatData());
  const requestURL = `${Endpoints.GetUserChatDataApi}/?chatId=${
    userChatDetails.initiator
  }&limit=${10}&start=${10}`;

  console.log(requestURL, 'requestURL');

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

    console.log(postMsgResponse, 'postMsgResponse');

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
  yield takeLatest(Constants.UPDATE_UTILITY_TASK, updateUtilityTask);
  yield takeLatest(Constants.ADD_TASK_ATTACHMENT, addAttachmentToTask);
  yield takeLatest(Constants.REMOVE_TASK_ATTACHMENT, removeTaskAttachment);
  yield takeLatest(Constants.DELETE_TASK, deleteUtilityTask);
  yield takeLatest(Constants.ADD_TASK_COMMENT, commentUtilityTask);
  yield takeLatest(Constants.GET_TASK_COMMENTS, getCommentsByTaskId);
  yield takeLatest(Constants.GET_UTILITY_FILE, getUtilityFile);
  yield takeLatest(Constants.SHARE_DOCUMENT, shareUtilityFiles);
  yield takeLatest(Constants.DELETE_DOCUMENT, deleteUtilityFile);
  yield takeLatest(Constants.GET_UTILITY_FILES, getUtilityFiles);
  yield takeLatest(Constants.ADD_FOLDER_TO_FOLDER, addFolderToFolder);
  yield takeLatest(Constants.GET_FOLDERS_AND_DOC, getAllFoldersAndDoc);
  yield takeLatest(
    Constants.GET_NESTED_FOLDERS_AND_DOC,
    getNestedFoldersAndDoc,
  );
  yield takeLatest(
    Constants.GET_FAVORITE_DOCS_BY_UUID,
    getFavoriteUtilityFiles,
  );
  yield takeLatest(
    Constants.GET_FAVORITE_DOCS_BY_UUID,
    getFavoriteUtilityFiles,
  );
  yield takeLatest(Constants.FAVORITE_FILE_BY_DOC_ID, favoriteUtilityFile);
  yield takeLatest(Constants.CREATE_UTILITY_TASKS, addUtilityTasks);
  yield takeLatest(Constants.ADD_DOC_TO_FOLDER, addDocToFolder);
  yield takeLatest(Constants.GET_ALL_USERS, getAllUsers);
  yield takeLatest(Constants.GET_ALL_USERS_CHAT, getUserChat);
  yield takeLatest(Constants.GET_USER_CHAT_DATA, getUserChatData);
  yield takeLatest(Constants.POST_MSG, postMsg);
}
