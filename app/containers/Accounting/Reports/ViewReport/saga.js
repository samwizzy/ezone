import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../../../App/selectors';
// import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../../utils/request';
import swal from 'sweetalert';
import * as Endpoints from '../../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';

export function* getGeneralJournalSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = yield select(Selectors.makeSelectTime());

  const requestURL = `${
    Endpoints.GetGeneralJournalApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }`;
  console.log('requestURL', requestURL);

  try {
    const generalJournalResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(Actions.getGeneralJournalSuccesAction(generalJournalResponse));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getGeneralJournalErrorAction(err));
  }
}
/*General chats of accounts*/
export function* getChatOfAccountSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = yield select(Selectors.makeSelectTime());

  const requestURL = `${Endpoints.GetChatsOfAccountApi}/${
    currentUser.organisation.orgId
  }?endDate=${endDate}&startDate=${startDate}}`;

  try {
    const getChatsOfAccountResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
      }),
    });
    yield put(Actions.getChatsOfAccountSuccesAction(getChatsOfAccountResponse));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getChatsOfAccountErrorAction(err));
  }
}
/**General Ledger */

export function* getGeneralLedgerSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = yield select(Selectors.makeSelectTime());

  const requestURL = `${
    Endpoints.GetGeneralLedgerApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }`;
  console.log('requestURL', requestURL);

  try {
    const generalLedgerResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(Actions.getGeneralLedgerSuccesAction(generalLedgerResponse));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getGeneralLedgerErrorAction(err));
  }
}

export function* getTrialBalanceSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const { startDate, endDate } = yield select(Selectors.makeSelectTime());

  const requestURL = `${
    Endpoints.GetTrialBalanceApi
  }?endDate=${endDate}&startDate=${startDate}&orgId=${
    currentUser.organisation.orgId
  }`;
  console.log('requestURL', requestURL);

  try {
    const trialBalanceResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    yield put(Actions.getTrialBalanceSuccesAction(trialBalanceResponse));
    console.log('ttttttttttttttttttttt', trialBalanceResponse);
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.getTrialBalanceErrorAction(err));
  }
}

// Individual exports for testing
export default function* ReportSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(
    Constants.GET_ALL_GENERAL_JOURNAL_TYPES,
    getGeneralJournalSaga,
  );
  yield takeLatest(
    Constants.GET_ALL_CHATS_OF_ACCOUNT_TYPES,
    getChatOfAccountSaga,
  );
  yield takeLatest(
    Constants.GET_ALL_GENERAL_LEDGER_TYPES,
    getGeneralLedgerSaga,
  );
  yield takeLatest(Constants.GET_ALL_TRIAL_BALANCE_TYPES, getTrialBalanceSaga);
}
