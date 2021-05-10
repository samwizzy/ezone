import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import * as AppActions from '../App/actions';
import * as AppSelectors from '../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../components/Endpoints';

export function* getApplications() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.ModulesByOrgApi}`;
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response get modules');

    yield put(Actions.getApplicationsSuccess(response));
  } catch (err) {
    yield put(Actions.getApplicationsError(err));
  }
}

// Individual exports for testing
export default function* HomeSaga() {
  yield takeLatest(Constants.GET_APPLICATIONS, getApplications);
}
