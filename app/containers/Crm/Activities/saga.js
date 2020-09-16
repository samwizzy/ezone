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

export function* getAllCrmActivities() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${Endpoints.GetCrmActivitiesApi}?orgId=${
    currentUser && currentUser.organisation.orgId
    }&module=CRM_MODULE`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'getAllCrmActivitiesResponse');
    yield put(Actions.getAllCrmActivitiesSuccess(response));
  } catch (err) {
    yield put(Actions.getAllCrmActivitiesError(err));
  }
}

export function* createCrmActivity({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateCrmActivityApi}`;
  payload.orgId = currentUser && currentUser.organisation.orgId

  console.log(payload, "creating activity payload")

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'getAllCrmActivitiesResponse');
    yield put(AppActions.openSnackBar({ message: "Activity created successfully", status: 'success' }));
    yield put(Actions.createCrmActivitySuccess(response));
    yield put(Actions.getAllCrmActivities());
  } catch (err) {
    yield put(Actions.createCrmActivityError(err));
  }
}

// Individual exports for testing
export default function* crmActivitiesSaga() {
  yield takeLatest(Constants.GET_ALL_CRM_ACTIVITIES, getAllCrmActivities);
  yield takeLatest(Constants.CREATE_CRM_ACTIVITY, createCrmActivity);
}
