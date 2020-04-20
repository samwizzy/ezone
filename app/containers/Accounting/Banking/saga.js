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
    alert('Something went wrong getAllAccountTypeSaga');
    yield put(Actions.getAllAccountTypeErrorAction(err));
  }
}


// Create new chart of account
export function* createNewBankSaga() {
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
  } catch (err) {
    yield put(Actions.createNewBankErrorAction(err));
  }
}

// Get bank account list
export function* getAllBankAccountSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllBankAccount}/${currentUser.organisation.orgId}`;

  console.log('getAllBankAccountSaga requestURL -> ', requestURL);

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



// Individual exports for testing
export default function* AccountChartSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(Constants.GET_ALL_ACCOUNT_TYPES, getAllAccountTypeSaga);
  yield takeLatest(Constants.CREATE_NEW_BANK, createNewBankSaga);
  yield takeLatest(Constants.GET_ALL_BANK_ACCOUNT, getAllBankAccountSaga);
}

