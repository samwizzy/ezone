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
export function* getGoals() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetPerformanceApi}/${user && user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "goals response")

    yield put(Actions.getGoalsSuccess(response));
  } catch (err) {
  }
}

export function* getGoalsById({ payload }) {
  console.log(payload, "getting goal payload")
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetPerformanceByIdApi}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "goal by id response")

    yield put(Actions.getGoalsByIdSuccess(response));
  } catch (err) {
  }
}

export function* createGoals({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreatePerformanceApi}`;
  payload.orgId = user && user.organisation.orgId

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "create goals response")
    yield put(AppActions.openSnackBar({ message: 'Performance Goal created successfully', status: 'success' }));

    yield put(Actions.createGoalsSuccess(response));
    yield put(Actions.closeNewGoalsDialog());
    yield put(Actions.getGoals());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json());
    console.log(error, "goal create error")
  }
}

export function* commentGoals({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.PerformanceCommentApi}`;

  console.log(payload, "goal comment payload")

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "comment goals response")
    yield put(AppActions.openSnackBar({ message: 'Goal commented successfully', status: 'success' }));

    yield put(Actions.commentGoalsSuccess(response));
    yield put(Actions.getGoalsById(payload.performanceId));
    yield put(Actions.getGoals());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json());
    console.log(error, "goal comment error")
  }
}

export function* getRecognitions() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetRecognitionApi}/${user && user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "recognitions response")

    yield put(Actions.getRecognitionsSuccess(response));
  } catch (err) {
  }
}

export function* getRecognitionById({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetRecognitionByIdApi}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "recognition response")

    yield put(Actions.getRecognitionByIdSuccess(response));
  } catch (err) {
  }
}

export function* getReviews({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetReviewsApi}/${user && user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "Reviews response")

    yield put(Actions.getReviewsSuccess(response));
  } catch (err) {
    yield put(Actions.getReviewsError(response));
  }
}

export function* getReviewById({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetReviewByIdApi}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "Review by id response")

    yield put(Actions.getReviewByIdSuccess(response));
  } catch (err) {
    yield put(Actions.getReviewByIdError(response));
  }
}

export function* createReview({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateReviewApi}`;
  payload.orgId = user && user.organisation.orgId

  console.log(payload, "creating recognition")

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "create recognition response")

    yield put(Actions.createReviewSuccess(response));
    yield put(Actions.closeNewReviewDialog());
    yield put(Actions.getReviews());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json());
    console.log(error, "recognition create error")
    yield put(Actions.createReviewError(err));
  }
}

export function* createRecognition({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateRecognitionApi}`;
  payload.orgId = user && user.organisation.orgId

  console.log(payload, "creating recognition")

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "create recognition response")

    yield put(Actions.createRecognitionSuccess(response));
    yield put(Actions.closeNewRecognitionDialog());
    yield put(Actions.getRecognitions());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json());
    console.log(error, "recognition create error")
  }
}

export function* commentRecognition({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.RecognitionCommentApi}`;

  console.log(payload, "comment recognition")

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "comment recognition response")

    yield put(Actions.createRecognitionSuccess(response));
    yield put(Actions.getRecognitionById(payload.recognitionId));
    yield put(Actions.getRecognitions());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json());
    yield put(Actions.commentRecognitionError(response));
    console.log(error, "comment recognition error")
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
    console.log(response, "get employee response")
    yield put(Actions.getEmployeesSuccess(response));
  } catch (err) {
    if (err.message) {
      // yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
    } else {
      const error = yield call(errorHandler, err.response.json())
      if (error.status === 400 || error.status === 500) {
        yield put(AppActions.openSnackBar({ message: error.message, status: 'error' }));
        // yield put(Actions.getEmployeesError(err));
      }
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
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "depts error message")
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
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "branches error message")
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
    console.log(err.response, "roles error message")
    if (err.response.status === 400) {
      yield put(AppActions.openSnackBar({ message: "Something Went Wrong", status: 'warning' }));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* PerformanceRootSaga() {
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
  yield takeLatest(Constants.GET_DEPARTMENTS, getDepartments);
  yield takeLatest(Constants.GET_BRANCHES, getBranches);
  yield takeLatest(Constants.GET_ROLES, getRoles);

  yield takeLatest(Constants.GET_GOALS, getGoals);
  yield takeLatest(Constants.GET_GOALS_BY_ID, getGoalsById);
  yield takeLatest(Constants.CREATE_GOALS, createGoals);
  yield takeLatest(Constants.COMMENT_GOALS, commentGoals);

  yield takeLatest(Constants.GET_REVIEWS, getReviews);
  yield takeLatest(Constants.GET_REVIEW_BY_ID, getReviewById);
  yield takeLatest(Constants.CREATE_REVIEW, createReview);

  yield takeLatest(Constants.GET_RECOGNITIONS, getRecognitions);
  yield takeLatest(Constants.GET_RECOGNITION_BY_ID, getRecognitionById);
  yield takeLatest(Constants.CREATE_RECOGNITION, createRecognition);
  yield takeLatest(Constants.COMMENT_RECOGNITION, commentRecognition);
}
