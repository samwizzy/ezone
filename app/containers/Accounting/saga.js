import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../App/selectors';
import * as AppActions from '../App/actions';
import * as Selectors from './selectors';
import { BaseUrl } from '../../components/BaseUrl';
import request from '../../utils/request';
import * as Endpoints from '../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';


export function* getAllAccountTypeSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetAllAccountTypeApi}`;

  try {
    const allAccountTypeResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('allAccountTypeResponse -->', allAccountTypeResponse);
    yield put(Actions.getAllAccountTypeSuccessAction(allAccountTypeResponse));

  } catch (err) {
    console.log('getAllAccountTypeErrorAction--->', err);
    yield put(Actions.getAllAccountTypeErrorAction(err));
  }
}

export function* getDetailTypeSaga({type, payload}) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetDetailTypeApi}/${payload.type}`;

  console.log(payload, "payload")

  try {
    const detailTypeResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('detailTypeResponse -->', detailTypeResponse);
    yield put(Actions.getDetailTypeSuccessAction(detailTypeResponse));

  } catch (err) {
    console.log('getDetailTypeErrorAction--->', err);
    yield put(Actions.getDetailTypeErrorAction(err));
  }
}

// Create new chart of account
export function* createNewChartOfAccountSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const chartOfAccountPostData = yield select(
    Selectors.makeSelectChartOfAccountPostData(),
  );

  chartOfAccountPostData.orgId = currentUser.organisation.orgId;
  const requestURL = `${Endpoints.CreateChartOfAccountApi}`;

  try {
    const chartOfAccountResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(chartOfAccountPostData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('chartOfAccountResponse -> ', chartOfAccountResponse);
    alert(`Account Name: ${chartOfAccountResponse.accountName} was saved successfully!`);
    yield put(Actions.createNewChartOfAccountSuccessAction(chartOfAccountResponse));
  } catch (err) {
    console.log('createNewChartOfAccountErrorAction -> ', err);
    yield put(Actions.createNewChartOfAccountErrorAction(err));
  }
}

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

    console.log('chartOfAccountListResponse -->', chartOfAccountListResponse);
    yield put(Actions.getAllChartOfAccountTypeSuccessAction(chartOfAccountListResponse));

  } catch (err) {
    console.log('getAllChartOfAccountTypeErrorAction--->', err);
    yield put(Actions.getAllChartOfAccountTypeErrorAction(err));
  }
}

// Individual exports for testing
export default function* AccountingSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(Constants.GET_ALL_ACCOUNT_TYPES, getAllAccountTypeSaga);
  yield takeLatest(Constants.GET_DETAIL_TYPES, getDetailTypeSaga);
  yield takeLatest(Constants.CREATE_NEW_CHART_OF_ACCOUNT, createNewChartOfAccountSaga);
  yield takeLatest(Constants.GET_ALL_CHART_OF_ACCOUNT, getAllChartOfAccountSaga);
}
