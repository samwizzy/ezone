import { takeLatest, call, put, select } from 'redux-saga/effects';
import qs from 'query-string';
import request from '../../utils/request';
import * as AppConstants from '../App/constants';
import * as AppActions from '../App/actions';
import * as AppSelectors from '../App/selectors';
import * as Constants from './constants';
import * as Actions from './actions';
import * as Selectors from './selectors';
import * as EndPoints from '../../components/Endpoints';
// import * as FirebaseServices from '../../services/firebaseService';

export function* signup() {
  const signupReqData = yield select(Selectors.makeSelectSignupReqData());

  const requestURL = `${EndPoints.RegistrationUrl}`;
  try {
    const signupRes = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(signupReqData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(signupRes, 'signupRes');
    yield put(Actions.signupSuccessRequest(signupRes));
    if (signupRes.success === true) {
      // yield put(FirebaseServices.createNewAdmin(signupRes));
      yield put(
        AppActions.openSnackBar({
          open: true,
          message: signupRes.message,
          status: 'success',
        }),
      );
    } else {
      yield put(
        AppActions.openSnackBar({
          open: true,
          message: signupRes.message,
          status: 'warning',
        }),
      );
    }
  } catch (err) {
    console.log(err, 'signupRes error');
    yield put(Actions.signupErrorRequest(err));
    yield put(
      AppActions.openSnackBar({
        open: true,
        message: err.message,
        status: 'error',
      }),
    );
  }
}

export function* login() {
  const loginDetails = yield select(AppSelectors.makeSelectLoginDetails());

  const { username, password } = loginDetails;
  const newData = { username, password, grant_type: 'password' };
  const requestURL = `${EndPoints.LoginUrl}`;

  const decode = decodeURIComponent(qs.stringify(newData));

  try {
    const loginResponse = yield call(request, requestURL, {
      method: 'POST',
      body: decode,
      headers: new Headers({
        Authorization: `Basic ${btoa('web-client:password')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });

    console.log(loginResponse, 'loginResponse');

    yield put(AppActions.loginSuccessAction(loginResponse));
    // yield put(Actions.saveToken(loginResponse.access_token));

    // if login is success get user profile with access token
    yield put(AppActions.getUserProfileAction(loginResponse));
    // yield put(
    //   Actions.openSnackBar({
    //     open: true,
    //     message: `Welcome back ${loginResponse.firstName} ${
    //       loginResponse.lastName
    //     }`,
    //     status: 'success',
    //   }),
    // );
  } catch (err) {
    console.log(err, 'err');
    yield put(AppActions.loginErrorAction(err));
    yield put(
      AppActions.openSnackBar({
        open: true,
        message: 'Wrong email or password',
        status: 'error',
      }),
    );
  }
}

export function* checkActiveSession() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const userData = yield select(AppSelectors.makeSelectCheckActiveSession());

  console.log(userData, 'makeSelectCheckActiveSession');
  const requestURL = `${EndPoints.CheckSessionApi}/${userData.uuId}`;

  try {
    const activeSessionResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });

    console.log(activeSessionResponse, 'activeSessionResponse');

    // if login is success get user profile with access token
    yield put(AppActions.checkActiveSessionSuccess(activeSessionResponse));
    // yield put(
    //   Actions.openSnackBar({
    //     open: true,
    //     message: `Welcome back ${loginResponse.firstName} ${
    //       loginResponse.lastName
    //     }`,
    //     status: 'success',
    //   }),
    // );
  } catch (err) {
    console.log(err, 'err');
    yield put(AppActions.checkActiveSessionError(err));
    yield put(
      AppActions.openSnackBar({
        open: true,
        message: 'Error getting token',
        status: 'error',
      }),
    );
  }
}

export function* refreshToken() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  console.log('Refresh token called');

  const newData = { refresh_token: accessToken, grant_type: 'password' };
  const requestURL = `${EndPoints.LoginUrl}`;

  const decode = decodeURIComponent(qs.stringify(newData));

  try {
    const refreshTokenRes = yield call(request, requestURL, {
      method: 'POST',
      body: decode,
      headers: new Headers({
        Authorization: `Basic ${btoa('web-client:password')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });

    console.log(refreshTokenRes, 'refreshTokenRes');

    // if login is success get user profile with access token
    yield put(AppActions.refreshTokenSuccess(refreshTokenRes));
    // yield put(
    //   Actions.openSnackBar({
    //     open: true,
    //     message: `Welcome back ${loginResponse.firstName} ${
    //       loginResponse.lastName
    //     }`,
    //     status: 'success',
    //   }),
    // );
  } catch (err) {
    console.log(err, 'err');
    yield put(AppActions.refreshTokenError(err));
    yield put(
      AppActions.openSnackBar({
        open: true,
        message: 'Error getting token',
        status: 'error',
      }),
    );
  }
}

export function* logOut() {
  try {
    // yield put(AppActions.getUserProfileAction(loginResponse));
    console.log('I am in logout saga...');
  } catch (err) {
    console.log(err, 'err');
    // yield put(AppActions.loginErrorAction(err));
  }
}

export function* userProfile({payload}) {
  const token = yield select(AppSelectors.makeSelectAccessToken());
  const accessToken = token ? token : payload.access_token;

  const requestURL = `${EndPoints.UserProfileUrl}`;

  console.log(payload, "User saga wahala shit")

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });

    console.log(response, 'loginResponse profile');

    yield put(AppActions.getUserProfileSuccessAction(response));
  } catch (err) {
    console.log(err, 'err user profile');
    yield put(AppActions.getUserProfileErrorAction(err));
  }
}

export function* forgotPassword() {
  const forgotPasswordDetails = yield select(
    Selectors.makeSelectForgotPasswordData(),
  );

  const requestURL = `${EndPoints.ForgotPasswordApi}`;

  try {
    const forgotPasswordResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(forgotPasswordDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(forgotPasswordResponse, 'loginResponse');

    // yield put(Actions.loginSuccessAction(loginResponse));
    // yield put(Actions.saveToken(loginResponse.access_token));

    // if login is success get user profile with access token
    yield put(Actions.forgotPasswordSuccess(forgotPasswordResponse));
    // yield put(
    //   Actions.openSnackBar({
    //     open: true,
    //     message: `Welcome back ${loginResponse.firstName} ${
    //       loginResponse.lastName
    //     }`,
    //     status: 'success',
    //   }),
    // );
  } catch (err) {
    console.log(err, 'err');
    yield put(Actions.forgotPasswordError(err));
    yield put(
      AppActions.openSnackBar({
        open: true,
        message: 'Not Working Yet',
        status: 'error',
      }),
    );
  }
}

// Individual exports for testing
export default function* authorizationPageSaga() {
  // register actions
  yield takeLatest(Constants.SIGNUP_REQUEST, signup);
  // login actions
  yield takeLatest(AppConstants.LOGIN, login);
  yield takeLatest(AppConstants.LOG_OUT, logOut);
  yield takeLatest(AppConstants.GET_USER_PROFILE, userProfile);
  yield takeLatest(AppConstants.REFRESH_TOKEN, refreshToken);
  yield takeLatest(Constants.FORGOT_PASSWORD, forgotPassword);
  yield takeLatest(AppConstants.CHECK_ACTIVE_SESSION, checkActiveSession);
}
