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

export function* createCategory({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.AddCategoryApi}`;
  payload.orgId = currentUser.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(AppActions.openSnackBar({ message: "Course category created successfully", status: 'success' }));

    yield put(Actions.createCategorySuccess(response));
    yield put(Actions.getCategories());
    yield put(Actions.closeNewCategoryDialog());
  } catch (err) {
    yield put(Actions.createCategoryError(err));
  }
}

export function* updateCategory({ payload }) {
  const { id, ...rest } = payload
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.UpdateCategoryApi}/${id}`;
  rest.orgId = currentUser.organisation.orgId;

  console.log(rest, "payload update category")

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(rest),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(AppActions.openSnackBar({ message: "Course category updated successfully", status: 'success' }));
    yield put(Actions.updateCategorySuccess(response));
    yield put(Actions.getCategories());
    yield put(Actions.closeEditCategoryDialog());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "error update category")
    yield put(Actions.updateCategoryError(err));
  }
}

export function* deleteCategory({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.DeleteCategoryApi}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(AppActions.openSnackBar({ message: "Course category deleted successfully", status: 'success' }));
    yield put(Actions.deleteCategorySuccess(response));
    yield put(Actions.getCategories());
  } catch (err) {
    yield put(Actions.deleteCategoryError(err));
  }
}


// Individual exports for testing
export default function* lmsCategoriesSaga() {
  yield takeLatest(Constants.GET_CATEGORIES, getCategories);
  yield takeLatest(Constants.CREATE_CATEGORY, createCategory);
  yield takeLatest(Constants.UPDATE_CATEGORY, updateCategory);
  yield takeLatest(Constants.DELETE_CATEGORY, deleteCategory);
}
