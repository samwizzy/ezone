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

export function* getLeads() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllLeadsApi}/${user && user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getLeadsSuccess(response));
  } catch (err) {
    console.log(err, "err contacts")
    yield put(Actions.getLeadsError(err));
  }
}

export function* createLead({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateNewLeadApi}`;
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

    console.log(response, 'create contact response');

    yield put(Actions.createLeadSuccess(response));
    yield put(Actions.getLeads());
    yield put(Actions.closeNewLeadDialog());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "creating contact error")
    yield put(Actions.createLeadError(err));
  }
}

export function* updateLead({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateLeadApi}/${updateLeadData.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response');

    yield put(Actions.updateLeadSuccess(response));
    yield put(Actions.getLeads());
    yield put(Actions.closeEditLeadDialog());
  } catch (err) {
    yield put(Actions.updateLeadError(err));
  }
}

export function* getLeadSources() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetAllLeadsGroupApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getLeadSourcesSuccess(response));
  } catch (err) {
    yield put(Actions.getLeadSourcesError(err));
  }
}

export function* createLeadSource({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateNewLeadApi}`;
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

    console.log(response, 'create contact response');

    yield put(Actions.createLeadSourceSuccess(response));
    yield put(Actions.getLeadSources());
    yield put(Actions.closeNewLeadSourceDialog());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "creating contact error")
    yield put(Actions.createLeadSourceError(err));
  }
}

export function* updateLeadSource({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateLeadApi}/${updateLeadData.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response');

    yield put(Actions.updateLeadSourceSuccess(response));
    yield put(Actions.getLeadSources());
    yield put(Actions.closeEditLeadSourceDialog());
  } catch (err) {
    yield put(Actions.updateLeadSourceError(err));
  }
}

export function* getLeadTags() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetAllLeadsGroupApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getLeadTagsSuccess(response));
  } catch (err) {
    yield put(Actions.getLeadTagsError(err));
  }
}

export function* createLeadTag({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateNewLeadApi}`;
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

    console.log(response, 'create contact response');

    yield put(Actions.createLeadTagSuccess(response));
    yield put(Actions.getLeadTags());
    yield put(Actions.closeNewLeadTagDialog());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "creating contact error")
    yield put(Actions.createLeadTagError(err));
  }
}

export function* updateLeadTag({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateLeadApi}/${updateLeadData.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response');

    yield put(Actions.updateLeadTagSuccess(response));
    yield put(Actions.getLeadTags());
    yield put(Actions.closeEditLeadTagDialog());
  } catch (err) {
    yield put(Actions.updateLeadTagError(err));
  }
}

// Individual exports for testing
export default function* crmLeadsSaga() {
  yield takeLatest(Constants.CREATE_LEAD, createLead);
  yield takeLatest(Constants.UPDATE_LEAD, updateLead);
  yield takeLatest(Constants.GET_LEADS, getLeads);

  yield takeLatest(Constants.CREATE_LEAD_SOURCE, createLeadSource);
  yield takeLatest(Constants.UPDATE_LEAD_SOURCE, updateLeadSource);
  yield takeLatest(Constants.GET_LEAD_SOURCES, getLeadSources);

  yield takeLatest(Constants.CREATE_LEAD_TAG, createLeadTag);
  yield takeLatest(Constants.UPDATE_LEAD_TAG, updateLeadTag);
  yield takeLatest(Constants.GET_LEAD_TAGS, getLeadTags);
}
