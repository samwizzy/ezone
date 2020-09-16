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
    const error = yield call(errorHandler, err.response.json())
    yield put(Actions.getUtilityFilesError(err));
    console.log(error, "error error")
    console.log(err, "error err")
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
    yield put(AppActions.openSnackBar({ message: `${response.document.docName} has been shared successfully`, status: 'success' }));
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
    // yield put(Actions.getUtilityEmployeesError(err));
  }
}

// Individual exports for testing
export default function* UtilityPageSaga() {
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
  yield takeLatest(Constants.GET_USER_BY_UUID, getUserByUUID);
  yield takeLatest(Constants.GET_UTILITY_FILE, getUtilityFile);
  yield takeLatest(Constants.SHARE_DOCUMENT, shareUtilityFiles);
  yield takeLatest(Constants.DELETE_DOCUMENT, deleteUtilityFile);
  yield takeLatest(Constants.GET_UTILITY_FILES, getUtilityFiles);
  yield takeLatest(Constants.ADD_FOLDER_TO_FOLDER, addFolderToFolder);
  yield takeLatest(Constants.GET_FOLDERS_AND_DOC, getAllFoldersAndDoc);
  yield takeLatest(Constants.GET_NESTED_FOLDERS_AND_DOC, getNestedFoldersAndDoc);
  yield takeLatest(Constants.GET_FAVORITE_DOCS_BY_UUID, getFavoriteUtilityFiles);
  yield takeLatest(Constants.GET_FAVORITE_DOCS_BY_UUID, getFavoriteUtilityFiles);
  yield takeLatest(Constants.FAVORITE_FILE_BY_DOC_ID, favoriteUtilityFile);
  yield takeLatest(Constants.ADD_DOC_TO_FOLDER, addDocToFolder);
}
