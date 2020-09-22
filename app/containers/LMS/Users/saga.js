import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import * as AppConstants from '../../App/constants';
import * as AppActions from '../../App/actions';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../../components/Endpoints';

export function* getStudents() {
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

    yield put(Actions.getStudentsSuccess(response));
  } catch (err) {
    yield put(Actions.getStudentsError(err));
  }
}

export function* createStudent({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.RegisterStudentApi}`;

  console.log(currentUser, "create student currentUser")
  console.log(payload, "create student payload")

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createStudentSuccess(response));
    yield put(Actions.getStudents());
    yield put(Actions.closeNewStudentDialog());
  } catch (err) {
    yield put(Actions.createStudentError(err));
  }
}

export function* updateStudent({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateContactApi}/${updateCompany.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.updateStudentSuccess(response));
    yield put(Actions.getStudents());
    yield put(Actions.closeNewStudentDialog());
  } catch (err) {
    yield put(Actions.updateStudentError(err));
  }
}

// Individual exports for testing
export default function* crmCompaniesSaga() {
  yield takeLatest(Constants.UPDATE_STUDENT, updateStudent);
  yield takeLatest(Constants.CREATE_STUDENT, createStudent);
  yield takeLatest(Constants.GET_STUDENTS, getStudents);
}
