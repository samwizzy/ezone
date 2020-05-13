import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';


// Get list of chart of account
export function* getAllChartOfAccountSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllChartOfAccountApi}/${currentUser.organisation.orgId}`;

  try {
    const chartOfAccountListResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('chartOfAccountListResponse from journal -->', chartOfAccountListResponse);
    yield put(Actions.getAllChartOfAccountTypeSuccessAction(chartOfAccountListResponse));
  } catch (err) {
    console.log('getAllChartOfAccountTypeErrorAction--->', err);
    yield put(Actions.getAllChartOfAccountTypeErrorAction(err));
  }
}


export function* getAccountPeriodSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAccountPeriodApi}/${currentUser.organisation.orgId}`;

  try {
    const accountPeriodResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('accountPeriodResponse -->', accountPeriodResponse);
    yield put(Actions.getAccountPeriodSuccessAction(accountPeriodResponse));
  } catch (err) {
    console.log('getAllAccountPeriodErrorAction--->', err);
    yield put(Actions.getAccountPeriodErrorAction(err));
  }
}


// Create accounting setup
export function* createAccountJournalSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const accountJournalPostData = yield select(
    Selectors.makeSelectNewAccountJournalPostData(),
  );
  const requestURL = `${Endpoints.CreateAccountJournalApi}`;

  try {
    const accountJournalResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(accountJournalPostData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('accountJournalResponse -> ', accountJournalResponse);
    alert(`Account journal posted successful!`);
    yield put(Actions.createNewAccountJournalSuccessAction(accountJournalResponse));
  } catch (err) {
    alert(`Something went wrong.`);
    yield put(Actions.createNewAccountJournalErrorAction(err));
  }
}


export function* getJournalListSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetJounalListApi}?orgId=${currentUser.organisation.orgId}`;

  console.log('journal requestURL --> ', requestURL);

  try {
    const journalListResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('journalListResponse ', journalListResponse);
    yield put(Actions.getJournalListSuccessAction(journalListResponse));
  } catch (err) {
    console.log('getJournalListErrorAction--->', err);
    yield put(Actions.getJournalListErrorAction(err));
  }
}


// Individual exports for testing
export default function* journalSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(Constants.GET_ALL_CHART_OF_ACCOUNT, getAllChartOfAccountSaga);
  yield takeLatest(Constants.GET_ACCOUNT_PERIOD, getAccountPeriodSaga);
  yield takeLatest(Constants.CREATE_NEW_ACCOUNT_JOURNAL, createAccountJournalSaga);
  yield takeLatest(Constants.GET_JOURNAL_LIST, getJournalListSaga);
}
