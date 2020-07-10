import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../App/selectors';
import * as AppActions from '../App/actions';
import * as Selectors from './selectors';
import { BaseUrl } from '../../components/BaseUrl';
import request from '../../utils/request';
import * as Endpoints from '../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';


// Get accounting setup
export function* getAccountingSetupSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAccountingSetupApi}/${currentUser.organisation.orgId}`;

  try {
    const accountingSetupResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('saga accountingSetup response ->', accountingSetupResponse);
    yield put(Actions.getAccountingSetupSuccessAction(accountingSetupResponse));
  } catch (err) {
    console.log('getAccountingSetupErrorAction --> ', err);
    yield put(Actions.getAccountingSetupErrorAction(err));
  }
}





// Individual exports for testing
export default function* AccountingSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(Constants.GET_ACCOUNTING_SETUP, getAccountingSetupSaga);
}
