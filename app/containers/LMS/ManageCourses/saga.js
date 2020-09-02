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

export function* getCategories() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetCategoriesApi}/${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getCategoriesSuccess(response.data));
  } catch (err) {
    yield put(Actions.getCategoriesError(err));
  }
}

export function* getCourses() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetCoursesApi}/${currentUser && currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getCoursesSuccess(response.data));
  } catch (err) {
    yield put(Actions.getCoursesError(err));
  }
}

export function* getCourseById({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetCourseByIdApi}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getCourseByIdSuccess(response.data));
  } catch (err) {
    yield put(Actions.getCourseByIdError(err));
  }
}

export function* createCourse({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.AddCourseApi}`;
  payload.orgId = currentUser && currentUser.organisation.orgId;

  console.log(payload, "payload create course")

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(AppActions.openSnackBar({ message: "Course created successfully", status: 'success' }));
    yield put(Actions.createCourseSuccess(response));
    yield put(Actions.getCourses());
    yield put(Actions.closeNewCourseDialog());
  } catch (err) {
    yield put(Actions.createCourseError(err));
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "error")
  }
}

export function* updateCourse({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateCourseApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.updateCourseSuccess(response));
    yield put(Actions.getCourses());
    yield put(Actions.closeEditCourseDialog());
  } catch (err) {
    yield put(Actions.updateCourseError(err));
  }
}

export function* uploadCoursePreview({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UploadPreviewApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.uploadCoursePreviewSuccess(response));
    yield put(Actions.getCourses());
    yield put(Actions.closeEditCourseDialog());
  } catch (err) {
    yield put(Actions.uploadCoursePreviewError(err));
  }
}

export function* addCourseVideo({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.AddCourseVideoApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.addCourseVideoSuccess(response));
    yield put(Actions.getCourses());
    yield put(Actions.closeEditCourseDialog());
  } catch (err) {
    yield put(Actions.addCourseVideoError(err));
  }
}

export function* deleteCourse({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.DeleteCourseApi}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.deleteCourseSuccess(response));
    yield put(Actions.getCourses());
  } catch (err) {
    yield put(Actions.deleteCourseError(err));
  }
}

// Individual exports for testing
export default function* crmCompaniesSaga() {
  yield takeLatest(Constants.GET_CATEGORIES, getCategories);
  yield takeLatest(Constants.GET_COURSES, getCourses);
  yield takeLatest(Constants.GET_COURSE_BY_ID, getCourseById);
  yield takeLatest(Constants.UPDATE_COURSE, updateCourse);
  yield takeLatest(Constants.UPLOAD_COURSE_PREVIEW, uploadCoursePreview);
  yield takeLatest(Constants.ADD_COURSE_VIDEO, addCourseVideo);
  yield takeLatest(Constants.DELETE_COURSE, deleteCourse);
  yield takeLatest(Constants.CREATE_COURSE, createCourse);
}
