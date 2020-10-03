import { takeLatest, call, put, select } from 'redux-saga/effects';
import swal from 'sweetalert';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';

export function* getAccountingPeriods() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllAccountingPeriodApi}/${currentUser.organisation.orgId}`;

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

    console.log(response, 'response getCurrencies');

    yield put(Actions.getCurrenciesSuccess(response));
  } catch (err) {
    yield put(Actions.getCurrenciesError(err));
  }
}

export function* getAccountTypes() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
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

// Create new bank account
export function* createNewBankAccount({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateNewBankApi}`;
  payload.orgId = currentUser.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createNewBankSuccess(response));
    swal('Success', 'Bank Account Created Successfully', 'success');
    yield put(Actions.getBankAccounts());
    yield put(Actions.closeNewBankAccountDialog());
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.createNewBankError(err));
  }
}

// Update new bank account
export function* updateBankAccount({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.UpdateBankAccountApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.updateBankAccountSuccess(response));
    swal('Success', 'Account Updated Successfully', 'success');
    yield put(Actions.getBankAccounts());
    yield put(Actions.closeNewBankAccountDialog());
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.updateBankAccountError(err));
  }
}

// Get bank account list
export function* getAllBankAccounts() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllBankAccount}/${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('allBankAccountResponse --> ', response);
    yield put(Actions.getBankAccountsSuccess(response));
  } catch (err) {
    console.log('getAllBankAccountErrorAction --> ', err);
    yield put(Actions.getBankAccountsError(err));
  }
}

// Get bank account by id
export function* getBankAccountById({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetBankAccountByIdApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('bankAccountByIdResponse --> ', response);
    yield put(Actions.getBankAccountByIdSuccess(response));
  } catch (err) {
    console.log('bankAccountByIdErrorAction --> ', err);
    yield put(Actions.getBankAccountByIdError(err));
  }
}

// Get all bank transactions made by organisation
export function* getTransfersByOrgId() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllTransferByOrgIdApi}/${
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

    console.log('allTransferByOrgIdResponse --> ', response);
    yield put(Actions.getTransfersByOrgIdSuccess(response));
  } catch (err) {
    yield put(Actions.getTransfersByOrgIdError(err));
  }
}

// Create new bank transfer for account
export function* createBankTransfer({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateBankTransferApi}`;
  payload.orgId = currentUser.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('bankTransferResponse -> ', response);
    swal('Success', 'Transaction Successful', 'success');
    yield put(Actions.createBankTransferSuccess(response));
    yield put(Actions.getTransfersByOrgId());
    yield put(Actions.closeAccountTransferDialog());
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.createBankTransferError(err));
  }
}

export function* getTransferByAccountId({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetTransferByAccountIdApi}`;

  console.log('type saga -> ', type);
  console.log('payload saga => ', payload);

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('transferByAccountIdResponse --> ', response);
    yield put(Actions.getTransferByAccountIdSuccess(response));
  } catch (err) {
    console.log('getAllTransferByOrgIdErrorAction --> ', err);
    yield put(Actions.getTransferByAccountIdError(err));
  }
}

// Delete bank account
export function* deleteBankAccount({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.DeleteBankAccountApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('deleteAccountResponse -> ', response);
    yield put(Actions.getBankAccounts());
    swal('Success', 'Account deleted Successfully', 'success');
    yield put(Actions.deleteBankAccountSuccess(response));
    yield put(Actions.closeDeleteBankAccountDialog());
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.deleteBankAccountError(err));
  }
}

export function* activateDeactivateBankAccount({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.ActivateDeactivateBankAccountApi}?id=${
    payload.id
    }&status=${payload.status}`;
  console.log(payload, 'payload activateDeactivateBankAccount');

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('isBankAccountActiveResponse -> ', response);
    yield put(Actions.getBankAccounts());
    swal('Success', 'Bank Account status updated Successfully', 'success');
    yield put(Actions.activateDeactivateBankAccountSuccess(response));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.activateDeactivateBankAccountError(err));
  }
}

// Individual exports for testing
export default function* BankingSaga() {
  yield takeLatest(Constants.GET_ACCOUNTING_PERIODS, getAccountingPeriods);
  yield takeLatest(Constants.GET_CURRENCIES, getCurrencies);
  yield takeLatest(Constants.GET_ALL_ACCOUNT_TYPES, getAccountTypes);
  yield takeLatest(Constants.CREATE_NEW_BANK, createNewBankAccount);
  yield takeLatest(Constants.GET_ALL_BANK_ACCOUNT, getAllBankAccounts);
  yield takeLatest(Constants.GET_BANK_ACCOUNT_BY_ID, getBankAccountById);
  yield takeLatest(Constants.GET_ALL_TRANSFER_BY_ORGID, getTransfersByOrgId);
  yield takeLatest(Constants.CREATE_BANK_TRANSFER, createBankTransfer);
  yield takeLatest(
    Constants.GET_TRANSFERS_BY_ACCOUNT_ID,
    getTransferByAccountId,
  );
  yield takeLatest(Constants.DELETE_BANK_ACCOUNT, deleteBankAccount);
  yield takeLatest(
    Constants.ACTIVATE_DEACTIVATE_BANK_ACCOUNT,
    activateDeactivateBankAccount,
  );
  yield takeLatest(Constants.UPDATE_BANK_ACCOUNT, updateBankAccount);
}
