import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';


// Get list of accounting period data
export function* getAllAccountingPeriodSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllAccountingPeriodApi}/${currentUser.organisation.orgId}`;

  try {
    const accountingPeriodResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('bugdet accountingPeriodResponse -> ', accountingPeriodResponse);
    yield put(Actions.getAllAccountingPeriodSuccessAction(accountingPeriodResponse));
  } catch (err) {
    console.log('getAllAccountingPeriodErrorAction --> ', err);
    yield put(Actions.getAllAccountingPeriodErrorAction(err));
  }
}



// Individual exports for testing
export default function* AccountChartSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(Constants.GET_ALL_ACCOUNTING_PERIOD, getAllAccountingPeriodSaga);
}

