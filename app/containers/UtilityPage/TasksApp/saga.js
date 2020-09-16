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
    yield put(Actions.createUtilityTaskSuccess());
    yield put(Actions.closeNewTaskDialog());
    yield put(AppActions.openSnackBar({ message: `${response.title} has been created successfully`, status: 'success' }));
  } catch (err) {
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "error handled create tasks")
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
    yield put(Actions.getUtilityTaskError(err.message));
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

    yield put(AppActions.openSnackBar({ message: `Comment Posted`, status: 'success' }));
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
  yield takeLatest(Constants.GET_UTILITY_TASKS_BY_STATUS, getUtilityTasksByStatus);
  yield takeLatest(Constants.GET_UTILITY_TASKS, getUtilityTasks);
  yield takeLatest(Constants.GET_UTILITY_TASK, getUtilityTask);
  yield takeLatest(Constants.UPDATE_UTILITY_TASK, updateUtilityTask);
  yield takeLatest(Constants.ADD_TASK_ATTACHMENT, addAttachmentToTask);
  yield takeLatest(Constants.REMOVE_TASK_ATTACHMENT, removeTaskAttachment);
  yield takeLatest(Constants.DELETE_TASK, deleteUtilityTask);
  yield takeLatest(Constants.ADD_TASK_COMMENT, commentUtilityTask);
  yield takeLatest(Constants.GET_TASK_COMMENTS, getCommentsByTaskId);
  yield takeLatest(Constants.CREATE_UTILITY_TASKS, addUtilityTasks);
}
