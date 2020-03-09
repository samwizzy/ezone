import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../App/selectors';
import * as AppActions from '../App/actions';
import * as Selectors from './selectors';
import { BaseUrl } from '../../components/BaseUrl';
import request from '../../utils/request';
import * as Endpoints from '../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';



export function* getEmailConfigSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${BaseUrl}${Endpoints.GetEmailConfigApi}/${currentUser.organisation.orgId}`;
  console.log('requestURL --> ', requestURL);

  try {
    const userEmailConfigResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(userEmailConfigResponse, '----> userEmailConfigResponse.');
    yield put(Actions.getEmailConfigSuccessAction(userEmailConfigResponse));

  } catch (err) {
    console.log(err, '---> getPartyGroupErrorAction');
    yield put(Actions.getEmailConfigErrorAction(err));
  }
}

// Save email configurations
export function* saveEmailConfigSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const updateUserEmailConfigPostData = yield select(
    Selectors.makeSelectUserEmailConfigPostData(),
  );
  console.log("updateUserEmailConfigPostData: ", updateUserEmailConfigPostData);

  const requestURL = `${Endpoints.SaveEmailConfigApi}`;
  console.log('postURL --> ', requestURL);

  try {
    const saveEmailConfigResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(updateUserEmailConfigPostData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(saveEmailConfigResponse, '----> saveEmailConfigResponse.');
    yield put(Actions.getEmailConfigSuccessAction(saveEmailConfigResponse));

  } catch (err) {
    console.log(err, '---> getPartyGroupErrorAction');
    yield put(Actions.getEmailConfigErrorAction(err));
  }
}

// Test connection
export function* testConnectionSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const testEmailConnectionData = yield select(
    Selectors.makeSelectUserTestConnectionData(),
  );
  console.log("testEmailConnectionData: ", testEmailConnectionData);

  const requestURL = `${Endpoints.TestConnectionApi}`;
  console.log('postURL --> ', requestURL);

  try {
    const testEmailConnectionResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(testEmailConnectionData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(testEmailConnectionResponse, 'wwwww')
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: testEmailConnectionResponse.message,
    //     status: 'success',
    //   }),
    // );
    console.log('testEmailConnectionResponse --->', testEmailConnectionResponse);
    yield put(Actions.testEmailConnectionSuccessAction(testEmailConnectionResponse));
  } catch (err) {
    console.log(testEmailConnectionResponse, 'erro wwwww')
    console.log(err, '---> testEmailConnectionErrorAction');
    yield put(Actions.testEmailConnectionErrorAction(err));

    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: err,
    //     status: 'error',
    //   }),
    // );

  }
}

export function* getSmsProviderSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetSmsProviderApi}`;

  try {
    const smsProviderResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getSmsProviderSuccessAction(smsProviderResponse));

  } catch (err) {
    yield put(Actions.getSmsProviderErrorAction(err));
  }
}

export function* getSmsConfigSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  
  console.log(`currentUser.organisation.orgId-> ${currentUser.organisation.orgId}`)

  const requestURL = `${Endpoints.GetSmsConfigApi}/${currentUser.organisation.orgId}`;
  console.log('getSmsConfigSaga requestURL --> ', requestURL);

  try {
    const smsConfigResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('smsConfigResponse --> ', smsConfigResponse);
    yield put(Actions.getSmsConfigSuccessAction(smsConfigResponse));

  } catch (err) {
    console.log(err, '---> getSMSConfigErrorAction');
    yield put(Actions.getSmsConfigErrorAction(err));
  }
}


// Individual exports for testing
export default function* emailConfigSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(Constants.GET_EMAIL_CONFIG, getEmailConfigSaga);
  yield takeLatest(Constants.UPDATE_EMAIL_CONFIG, saveEmailConfigSaga);
  yield takeLatest(Constants.TEST_EMAIL_CONNECTION, testConnectionSaga);
  yield takeLatest(Constants.GET_SMS_PROVIDER, getSmsProviderSaga);
  yield takeLatest(Constants.GET_SMS_CONFIG, getSmsConfigSaga);
}
