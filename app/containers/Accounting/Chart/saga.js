import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';

function errorHandler(promise) {
  return promise;
}

export function* getDashBoardData() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetAllAccountTypeApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAccountTypesSuccess(response));
  } catch (err) {
    yield put(Actions.getAccountTypesError(err));
  }
}

export function* getAccountingPeriods() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllAccountingPeriodApi}/${
    currentUser.organisation.orgId
  }`;

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

export function* getAccountTypes() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetAllAccountTypeApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('allAccountTypeResponse -->', response);
    yield put(Actions.getAccountTypesSuccess(response));
  } catch (err) {
    yield put(Actions.getAccountTypesError(err));
  }
}

// Create new chart of account
export function* createChartOfAccount({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  payload.orgId = currentUser.organisation.orgId;
  console.log(payload, 'payload create account');

  const requestURL = `${Endpoints.CreateChartOfAccountApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.dir(response);

    swal(
      'Success',
      `Account Name: ${response.accountName} was saved successfully!`,
      'success',
    );
    yield put(Actions.createChartOfAccountSuccess(response));
    yield put(Actions.getChartOfAccounts());
    yield put(Actions.closeNewAccountDialog());
  } catch (err) {
    console.dir(err, 'create chart of account');
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.createChartOfAccountError(err));
  }
}

// Get list of chart of account
export function* getChartOfAccounts() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllChartOfAccountApi}/${
    currentUser.organisation.orgId
  }`;

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

// Get chart of account by id
export function* getChartOfAccountById({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetChartOfAccountByIdApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getChartOfAccountByIdSuccess(response));
  } catch (err) {
    yield put(Actions.getChartOfAccountByIdError(err));
  }
}

// Delete a chart of account
export function* deleteChartOfAccount({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.DeleteChartOfAccountApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response deleteChartOfAccountSuccess');

    swal('Success', 'Account deleted successfully', 'success');
    yield put(Actions.deleteChartOfAccountSuccess(response));
    yield put(Actions.getChartOfAccounts());
    yield put(Actions.closeDeleteAccountDialog());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json());
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.deleteChartOfAccountError(err));
  }
}

// Update a chart of account
export function* updateChartOfAccount({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.UpdateChartOfAccountApi}`;

  payload.orgId = currentUser.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal('Success', 'Account updated successfully', 'success');
    yield put(Actions.updateChartOfAccountSuccess(response));
    yield put(Actions.getChartOfAccounts());
    yield put(Actions.closeNewAccountDialog());
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.updateChartOfAccountError(err));
  }
}

export async function createChartOfAccountHandler(value) {
  const credentials = JSON.parse(localStorage.getItem('user'));
  const accessToken = localStorage.getItem('access_token');
  const postData = {
    accountCode: value.accountCode,
    accountName: value.accountName,
    accountNumber: '',
    accountTypeId: value.accountTypeId,
    bankBalance: 0,
    bankName: '',
    description: value.accountDescription,
    id: credentials.id,
    openingBalance: Number(value.amount),
    orgId: credentials.organisation && credentials.organisation.orgId,
    parentId: null,
    rate: 0,
    status: true,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  console.log(`post data ${postData}`);

  await axios
    .post(`${Endpoints.CreateChartOfAccountApi}`, postData, config)
    .then(res => {
      const chatOfAccResponse = res.data;
      return chatOfAccResponse;
    })

    .catch(err => {
      console.log(`error ocurr in Chart of Account ${err}`);
      return null;
    });
}

// Individual exports for testing
export default function* AccountChartSaga() {
  yield takeLatest(Constants.DEFAULT_ACTION, getDashBoardData);
  yield takeLatest(Constants.GET_ACCOUNTING_PERIODS, getAccountingPeriods);
  yield takeLatest(Constants.GET_ALL_ACCOUNT_TYPES, getAccountTypes);
  yield takeLatest(Constants.CREATE_NEW_CHART_OF_ACCOUNT, createChartOfAccount);
  yield takeLatest(Constants.GET_ALL_CHART_OF_ACCOUNT, getChartOfAccounts);
  yield takeLatest(Constants.GET_CHART_OF_ACCOUNT_BY_ID, getChartOfAccountById);
  yield takeLatest(Constants.DELETE_CHART_OF_ACCOUNT, deleteChartOfAccount);
  yield takeLatest(Constants.UPDATE_CHART_OF_ACCOUNT, updateChartOfAccount);
}
