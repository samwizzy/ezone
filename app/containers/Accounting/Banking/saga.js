import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';



export function* getAllAccountTypeSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllAccountTypeApi}/${currentUser.organisation.orgId}`;

  try {
    const allAccountTypeResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllAccountTypeSuccessAction(allAccountTypeResponse));
  } catch (err) {
    console.log('Something went wrong getAllAccountTypeSaga');
    yield put(Actions.getAllAccountTypeErrorAction(err));
  }
}

// Create new bank account
export function* createNewBankAccountSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const newBankPostData = yield select(Selectors.makeSelectNewBankPostData());
  const requestURL = `${Endpoints.CreateNewBankApi}`;
  
  try {
    const newBankResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(newBankPostData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createNewBankSuccessAction(newBankResponse));
    alert('Account Created Successfully.');
    yield put(Actions.getAllBankAccountAction());
    yield put(Actions.closeNewBankAccountDialog());
  } catch (err) {
    yield put(Actions.createNewBankErrorAction(err));
  }
}


// Update new bank account
export function* updateBankAccountSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const bankAccountUpdateData = yield select(Selectors.makeSelectNewBankPostData());
  const requestURL = `${Endpoints.UpdateBankAccountApi}`;
  
  try {
    const bankAccountUpdateResponse = yield call(request, requestURL, {
      method: "PUT",
      body: JSON.stringify(bankAccountUpdateData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.updateBankAccountSuccessAction(bankAccountUpdateResponse));
    alert("Account Updated Successfully.");
    yield put(Actions.getAllBankAccountAction());
    yield put(Actions.closeNewBankAccountDialog());
  } catch (err) {
    alert("Something went wrong");
    yield put(Actions.updateBankAccountErrorAction(err));
  }
}


// Get bank account list
export function* getAllBankAccountSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllBankAccount}/${currentUser.organisation.orgId}`;

  try {
    const allBankAccountResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('allBankAccountResponse --> ', allBankAccountResponse);
    yield put(Actions.getAllBankAccountSuccessAction(allBankAccountResponse));
  } catch (err) {
    console.log('getAllBankAccountErrorAction --> ', err);
    yield put(Actions.getAllBankAccountErrorAction(err));
  }
}

// Get all bank transactions made by organisation 
export function* getAllTransferByOrgIdSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllTransferByOrgIdApi}/${currentUser.organisation.orgId}`;

  try {
    const allTransferByOrgIdResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('allTransferByOrgIdResponse --> ', allTransferByOrgIdResponse);
    yield put(Actions.getAllTransferByOrgIdSuccessAction(allTransferByOrgIdResponse));
  } catch (err) {
    console.log('getAllTransferByOrgIdErrorAction --> ', err);
    yield put(Actions.getAllTransferByOrgIdErrorAction(err));
  }
}

// Create new bank transfer for account
export function* createBankTransferSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const bankTransferPostData = yield select(Selectors.makeSelectBankTransferPostData());
  const requestURL = `${Endpoints.CreateBankTransferApi}`;
  
  try {
    const bankTransferResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(bankTransferPostData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('bankTransferResponse -> ', bankTransferResponse);
    alert("Transaction successful");
    yield put(Actions.createBankTransferSuccessAction(bankTransferResponse));
    yield put(Actions.getAllTransferByOrgIdAction());
    yield put(Actions.closeAccountTransferDialog());
  } catch (err) {
    yield put(Actions.createBankTransferErrorAction(err));
  }
}

export function* getTransferByAccountIdSaga({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetTransferByAccountIdApi}`;

  console.log('type saga -> ', type);
  console.log('payload saga => ', payload);

  try {
    const transferByAccountIdResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('transferByAccountIdResponse --> ', transferByAccountIdResponse);
    yield put(Actions.getTransferByAccountIdSuccessAction(transferByAccountIdResponse));
  } catch (err) {
    console.log('getAllTransferByOrgIdErrorAction --> ', err);
    yield put(Actions.getTransferByAccountIdErrorAction(err));
  }
}


// Delete bank account
export function* deleteBankAccountSaga({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());  
  const requestURL = `${Endpoints.DeleteBankAccountApi}/${payload.id}`;

  try {
    const deleteAccountResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: "",
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('deleteAccountResponse -> ', deleteAccountResponse);
    yield put(Actions.getAllBankAccountAction());
    alert(`Account deleted successfully!`);
    yield put(Actions.deleteBankAccountSuccessAction(deleteAccountResponse));
    yield put(Actions.closeDeleteBankAccountDialog());
  } catch (err) {
    console.log('deleteBankAccountErrorAction -> ', err);
    alert(`Something went wrong.`);
    yield put(Actions.deleteBankAccountErrorAction(err));
  }
}


// The saga call to activate or deactivates a bank account
export function* setActiveStatusOfBankAccountSaga({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());  
  const requestURL = `${Endpoints.SetActiveStatusForBankAccountApi}?${payload}`;

  try {
    const isBankAccountActiveResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: "",
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('isBankAccountActiveResponse -> ', isBankAccountActiveResponse);
    yield put(Actions.getAllBankAccountAction());
    alert(`Account status set successfully!`);
    yield put(Actions.activateBankAccountSuccessAction(isBankAccountActiveResponse));
    yield put(Actions.closeActivateBankAccountDialog());
  } catch (err) {
    console.log('activateBankAccountErrorAction -> ', err);
    alert(`Something went wrong.`);
    yield put(Actions.activateBankAccountErrorAction(err));
  }
}



// Individual exports for testing
export default function* BankingSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(Constants.GET_ALL_ACCOUNT_TYPES, getAllAccountTypeSaga);
  yield takeLatest(Constants.CREATE_NEW_BANK, createNewBankAccountSaga);
  yield takeLatest(Constants.GET_ALL_BANK_ACCOUNT, getAllBankAccountSaga);
  yield takeLatest(Constants.GET_ALL_TRANSFER_BY_ORGID, getAllTransferByOrgIdSaga);
  yield takeLatest(Constants.CREATE_BANK_TRANSFER, createBankTransferSaga);
  yield takeLatest(Constants.GET_TRANSFERS_BY_ACCOUNT_ID, getTransferByAccountIdSaga);
  yield takeLatest(Constants.DELETE_BANK_ACCOUNT, deleteBankAccountSaga);
  yield takeLatest(Constants.ACTIVATE_BANK_ACCOUNT, setActiveStatusOfBankAccountSaga);
  yield takeLatest(Constants.DEACTIVATE_BANK_ACCOUNT, setActiveStatusOfBankAccountSaga);
  yield takeLatest(Constants.UPDATE_BANK_ACCOUNT, updateBankAccountSaga);
}

