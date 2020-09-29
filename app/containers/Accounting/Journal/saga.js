import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import swal from 'sweetalert';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';


// Get list of chart of account
export function* getChartOfAccounts() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllChartOfAccountApi}/${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getChartOfAccountsSuccess(response));
  } catch (err) {
    yield put(Actions.getChartOfAccountsError(err));
  }
}


export function* getAccountingPeriods() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAccountPeriodApi}/${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAccountingPeriodsSuccess(response));
  } catch (err) {
    yield put(Actions.getAccountingPeriodsError(err));
  }
}


// Create account journal
export function* createAccountJournal({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.CreateAccountJournalApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal("Success", "Account journal posted successfully", "success");
    yield put(Actions.createJournalSuccess(response));
  } catch (err) {
    swal("Error", "Something went wrong", "error");
    yield put(Actions.createJournalError(err));
  }
}


export function* getJournalList() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetJounalListApi}?orgId=${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getJournalListSuccess(response));
  } catch (err) {
    yield put(Actions.getJournalListError(err));
  }
}

export function* getCurrencies() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetCurrencyByOrgIdApi}?orgId=${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "response getCurrencies")

    yield put(Actions.getCurrenciesSuccess(response));
  } catch (err) {
    yield put(Actions.getCurrenciesError(err));
  }
}


// Individual exports for testing
export default function* journalSaga() {
  yield takeLatest(Constants.GET_ALL_CHART_OF_ACCOUNT, getChartOfAccounts);
  yield takeLatest(Constants.GET_ACCOUNT_PERIOD, getAccountingPeriods);
  yield takeLatest(Constants.CREATE_NEW_ACCOUNT_JOURNAL, createAccountJournal);
  yield takeLatest(Constants.GET_JOURNAL_LIST, getJournalList);
  yield takeLatest(Constants.GET_CURRENCIES, getCurrencies);
}
