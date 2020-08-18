import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import * as AppConstants from '../../App/constants';
import * as AppActions from '../../App/actions';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../../components/Endpoints';

export function* getClassrooms() {
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

    yield put(Actions.getClassroomsSuccess(response));
  } catch (err) {
    yield put(Actions.getClassroomsError(err));
  }
}

export function* createClassroom({ payload }) {
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

    yield put(Actions.createClassroomSuccess(response));
    yield put(Actions.getClassrooms());
    yield put(Actions.closeNewClassroomDialog());
  } catch (err) {
    yield put(Actions.createClassroomError(err));
  }
}

export function* updateClassroom({ payload }) {
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

    yield put(Actions.updateClassroomSuccess(response));
    yield put(Actions.getClassrooms());
    yield put(Actions.closeNewClassroomDialog());
  } catch (err) {
    yield put(Actions.updateClassroomError(err));
  }
}

// Individual exports for testing
export default function* lmsClassroomsSaga() {
  yield takeLatest(Constants.UPDATE_CLASSROOM, updateClassroom);
  yield takeLatest(Constants.CREATE_CLASSROOM, createClassroom);
  yield takeLatest(Constants.GET_CLASSROOMS, getClassrooms);
}
