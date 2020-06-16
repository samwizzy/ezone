import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import * as AppConstants from '../../App/constants';
import * as AppActions from '../../App/actions';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../../components/Endpoints';

export function* getAllCrmActivities() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${Endpoints.GetCrmActivitiesApi}/?orgId=${
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

// Individual exports for testing
export default function* crmActivitiesSaga() {
  yield takeLatest(Constants.GET_ALL_CRM_ACTIVITIES, getAllCrmActivities);
}
