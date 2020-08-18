import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import * as AppConstants from '../../App/constants';
import * as AppActions from '../../App/actions';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../../components/Endpoints';

export function* getContents() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllCompaniesApi}/${currentUser && currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getContentsSuccess(response));
  } catch (err) {
    yield put(Actions.getContentsError(err));
  }
}

export function* createContent({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateNewContactApi}`;
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

    yield put(Actions.createContentSuccess(response));
    yield put(Actions.getContents());
    yield put(Actions.closeNewContentDialog());
  } catch (err) {
    yield put(Actions.createContentError(err));
  }
}

export function* updateContent({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateContactApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.updateContentSuccess(response));
    yield put(Actions.getContents());
    yield put(Actions.closeNewContentDialog());
  } catch (err) {
    yield put(Actions.updateContentError(err));
  }
}

// Individual exports for testing
export default function* crmCompaniesSaga() {
  yield takeLatest(Constants.UPDATE_CONTENT, updateContent);
  yield takeLatest(Constants.CREATE_CONTENT, createContent);
  yield takeLatest(Constants.GET_CONTENTS, getContents);
}
