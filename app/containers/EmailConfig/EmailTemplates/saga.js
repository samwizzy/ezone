import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';


// Get email configuration
export function* getEmailConfigSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmailConfigApi}/${currentUser.organisation.orgId}`;

  try {
    const userEmailConfigResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('userEmailConfigResponse -->', userEmailConfigResponse);
    yield put(Actions.getEmailConfigSuccessAction(userEmailConfigResponse));
  } catch (err) {
    console.log('getEmailConfigErrorAction --> ', err);
    yield put(Actions.getEmailConfigErrorAction(err));
  }
}

// Save email configuration
export function* saveEmailConfigSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const updateUserEmailConfigPostData = yield select(
    Selectors.makeSelectUserEmailConfigPostData(),
  );
  const requestURL = `${Endpoints.SaveEmailConfigApi}`;

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
    alert('Email config successful!');
    yield put(Actions.updateEmailConfigSuccessAction(saveEmailConfigResponse));
  } catch (err) {
    console.log(err, '---> getPartyGroupErrorAction');
    yield put(Actions.updateEmailConfigErrorAction(err));
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

// Get a list of sms providers
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

// Get sms configuration
export function* getSmsConfigSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetSmsConfigApi}/${currentUser.organisation.orgId}`;

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

// Save sms configuration
export function* saveSmsConfigSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const smsConfigPostData = yield select(
    Selectors.makeSelectUserSmsConfigPostData(),
  );
  const requestURL = `${Endpoints.SaveSmsConfigApi}`;

  try {
    const saveSmsConfigResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(smsConfigPostData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    alert('Sms configuration successful!');
    yield put(Actions.createSmsConfigSuccessAction(saveSmsConfigResponse));
  } catch (err) {
    alert('Something went wrong!');
    yield put(Actions.createSmsConfigErrorAction(err));
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
  yield takeLatest(Constants.CREATE_SMS_CONFIG, saveSmsConfigSaga);
}
