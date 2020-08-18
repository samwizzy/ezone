import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import * as AppConstants from '../../App/constants';
import * as AppActions from '../../App/actions';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../../components/Endpoints';

export function* getQuizzes() {
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

    yield put(Actions.getQuizzesSuccess(response));
  } catch (err) {
    yield put(Actions.getQuizzesError(err));
  }
}

export function* createQuiz({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  payload.orgId = currentUser.organisation.orgId;

  const requestURL = `${Endpoints.CreateNewContactApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createQuizSuccess(response));
    yield put(Actions.getQuizzes());
    yield put(Actions.closeNewQuizDialog());
  } catch (err) {
    yield put(Actions.createQuizError(err));
  }
}

export function* updateQuiz({ payload }) {
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

    yield put(Actions.updateQuizSuccess(response));
    yield put(Actions.getQuizzes());
    yield put(Actions.closeNewQuizDialog());
  } catch (err) {
    yield put(Actions.updateQuizError(err));
  }
}

// Individual exports for testing
export default function* lmsQuizzesSaga() {
  yield takeLatest(Constants.UPDATE_QUIZ, updateQuiz);
  yield takeLatest(Constants.CREATE_QUIZ, createQuiz);
  yield takeLatest(Constants.GET_QUIZZES, getQuizzes);
}
