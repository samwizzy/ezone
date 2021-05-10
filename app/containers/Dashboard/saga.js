import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import * as AppActions from '../App/actions';
import * as AppSelectors from '../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../components/Endpoints';

export function* getDashboardStats() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.DashboardStatsApi}`;
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "response get stats");

    yield put(Actions.getDashboardStatsSuccess(response));
  } catch (err) {
    yield put(Actions.getDashboardStatsError(err));
  }
}


// Individual exports for testing
export default function* DashboardSaga() {
  yield takeLatest(Constants.GET_DASHBOARD_STATS, getDashboardStats);
}
