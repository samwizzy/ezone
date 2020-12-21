import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';

export function* getChartofAccountsRange({ payload }) {
  const { startDate, endDate } = payload;
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetChatsOfAccountApi}?orgId=${
    currentUser.organisation.orgId
  }&startDate=${startDate}&endDate=${endDate}&pageFrom=0&pageTo=0`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAccountsRangeSuccess(response));
  } catch (err) {
    yield put(Actions.getAccountsRangeError(err));
  }
}

// Individual exports for testing
export default function* AccDashboardSaga() {
  yield takeLatest(
    Constants.GET_CHART_OF_ACCOUNTS_RANGE,
    getChartofAccountsRange,
  );
}
