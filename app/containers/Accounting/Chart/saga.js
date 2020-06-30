import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import axios from "axios";
import * as Constants from './constants';


export function* getDashBoardDataSaga() {
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

    yield put(Actions.getAllAccountTypeSuccessAction(response));

  } catch (err) {
    yield put(Actions.getAllAccountTypeErrorAction(err));
  }
}


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
    console.log('Something went wrong getAllAccountTypeSaga');
    yield put(Actions.getAllAccountTypeErrorAction(err));
  }
}


export function* getParentAccountTypeSaga({ type, payload} ) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetAllAccountTypeApi}`;

  try {
    const parentAccountTypeResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('parentAccountTypeResponse -->', parentAccountTypeResponse);
    yield put(Actions.getParentAccountTypeSuccessAction(parentAccountTypeResponse));
  } catch (err) {
    alert('Something went wrong from getParentAccountTypeSaga');
    yield put(Actions.getParentAccountTypeErrorAction(err));
  }
}

// Create new chart of account
export function* createNewChartOfAccountSaga({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const chartOfAccountPostData = yield select(
    Selectors.makeSelectChartOfAccountPostData(),
  );

  // Delete payload prop not using
  delete payload.subAccount;

  console.log('new payload ', payload);

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
    yield put(Actions.getAllChartOfAccountTypeAction());
    yield put(Actions.closeNewAccountDialog());
  } catch (err) {
    console.log('createNewChartOfAccountErrorAction -> ', err);
    alert(`Something went wrong.`);
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


// Delete a chart of account
export function* deleteChartOfAccountSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const deleteChartOfAccountData = yield select(
    Selectors.makeSelectChartOfAccountPostData(),
  );
  const requestURL = `${Endpoints.DeleteChartOfAccountApi}/${deleteChartOfAccountData.id}`;
  
  try {
    const deleteChartOfAccountResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(deleteChartOfAccountData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('deleteChartOfAccountResponse -> ', deleteChartOfAccountResponse);
    alert(`Account deleted successfully!`);
    yield put(Actions.deleteChartOfAccountSuccessAction(deleteChartOfAccountResponse));
    yield put(Actions.getAllChartOfAccountTypeAction());
    yield put(Actions.closeDeleteAccountDialog());
  } catch (err) {
    alert(`Something went wrong.`);
    yield put(Actions.deleteChartOfAccountErrorAction(err));
  }
}


// Update a chart of account
export function* updateChartOfAccountSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateChartOfAccountApi}`;
  const updateChartOfAccountData = yield select(
    Selectors.makeSelectChartOfAccountPostData(),
  );
  
  try {
    const updateChartOfAccountResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(updateChartOfAccountData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('updateChartOfAccountResponse -> ', updateChartOfAccountResponse);
    alert(`Account was updated successfully!`);
    yield put(Actions.updateChartOfAccountSuccessAction(updateChartOfAccountResponse));
    yield put(Actions.getAllChartOfAccountTypeAction());
    yield put(Actions.closeNewAccountDialog());
  } catch (err) {
    alert(`Something went wrong.`);
    yield put(Actions.updateChartOfAccountErrorAction(err));
  }
}


 export async function createChartOfAccountHandler(value) {
  let credentials = JSON.parse(localStorage.getItem('user'))
   let accessToken = localStorage.getItem('access_token')
  let postData = {
    accountCode: value.accountCode,
    accountName: value.accountName,
    accountNumber: "",
    accountTypeId: value.accountTypeId,
    bankBalance: 0,
    bankName: "",
    description: value.accountDescription,
    id:credentials.id,
    openingBalance: Number(value.amount),
    orgId:credentials.organisation && credentials.organisation.orgId,
    parentId: null,
    rate: 0,
    status: true,
  }
    const config = {
      headers: { Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json', }
  }

     console.log(`post data ${postData}`)
   
    await axios.post(`${Endpoints.CreateChartOfAccountApi}`,postData,config)
     .then((res) => {
          let chatOfAccResponse = res.data;
          return chatOfAccResponse;
        })
  
        .catch((err) => {
          console.log(`error ocurr in Chart of Account ${err}`);
          return null;
        });

    }



// Individual exports for testing
export default function* AccountChartSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(Constants.DEFAULT_ACTION, getDashBoardDataSaga);
  yield takeLatest(Constants.GET_ALL_ACCOUNT_TYPES, getAllAccountTypeSaga);
  yield takeLatest(Constants.GET_PARENT_ACCOUNT_TYPES, getParentAccountTypeSaga);
  yield takeLatest(Constants.CREATE_NEW_CHART_OF_ACCOUNT, createNewChartOfAccountSaga);
  yield takeLatest(Constants.GET_ALL_CHART_OF_ACCOUNT, getAllChartOfAccountSaga);
  yield takeLatest(Constants.DELETE_CHART_OF_ACCOUNT, deleteChartOfAccountSaga);
  yield takeLatest(Constants.UPDATE_CHART_OF_ACCOUNT, updateChartOfAccountSaga);
}
