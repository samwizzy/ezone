import { takeLatest, call, put, select } from 'redux-saga/effects';
import qs from 'query-string';
import request from '../../utils/request';
import history from '../../utils/history'
import { push } from 'connected-react-router';
import * as AppConstants from '../App/constants';
import * as AppActions from '../App/actions';
import * as AppSelectors from '../App/selectors';
import * as Constants from './constants';
import * as Actions from './actions';
import * as Selectors from './selectors';
import * as EndPoints from '../../components/Endpoints';
// import * as FirebaseServices from '../../services/firebaseService';

export function* signup({ payload }) {
  console.log(payload, "reg payload")

  const requestURL = `${EndPoints.RegistrationUrl}`;
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response, 'signupRes');

    yield put(Actions.signupSuccessRequest(response));
    if (response.success) {
      // yield put(FirebaseServices.createNewAdmin(signupRes));
      yield put(AppActions.openSnackBar({ message: response.message, status: 'success' }));
      yield put(push('/login'))
    } else {
      yield put(AppActions.openSnackBar({ message: response.message, status: 'warning' }));
    }
  } catch (err) {
    yield put(Actions.signupErrorRequest(err));
    yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
  }
}

export function* login({ payload }) {
  const { username, password } = payload;
  const newData = { username, password, grant_type: 'password' };
  const requestURL = `${EndPoints.LoginUrl}`;

  const decode = decodeURIComponent(qs.stringify(newData));

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: decode,
      headers: new Headers({
        Authorization: `Basic ${btoa('web-client:password')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });

    if (response.error === 'invalid_token') {
      throw response
    }

    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    localStorage.setItem('expires_in', response.expires_in);

    yield put(AppActions.loginSuccessAction(response.access_token));
    yield put(AppActions.getUserProfileAction(response.access_token));

  } catch (err) {
    console.log(err.message, "login error")
    if (err.error) {
      yield put(AppActions.loginErrorAction(err.error_description));
      yield put(AppActions.openSnackBar({ message: err.error_description, status: 'error' }));
    } else {
      yield put(AppActions.loginErrorAction(err.message));
      yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
    }
  }
}

export function* refreshToken() {
  const refresh_token = localStorage.getItem('refresh_token');
  const newData = { refresh_token, grant_type: 'refresh_token' };
  const requestURL = `${EndPoints.LoginUrl}`;

  const decode = decodeURIComponent(qs.stringify(newData));

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: decode,
      headers: new Headers({
        Authorization: `Basic ${btoa('web-client:password')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });

    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    localStorage.setItem('expires_in', response.expires_in);

    yield put(AppActions.refreshTokenSuccess(response.access_token));
    yield put(AppActions.getUserProfileAction(response.access_token));

  } catch (err) {
    console.log(err, 'err');
    yield put(AppActions.refreshTokenError(err));
    yield put(AppActions.openSnackBar({ message: 'Error getting token', status: 'error' }));
  }
}

export function* logOut() {
  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_in');
    history.push('/login')
  } catch (err) {
    yield put(AppActions.loginErrorAction(err));
  }
}

export function* userProfile({ payload }) {
  const token = yield select(AppSelectors.makeSelectAccessToken());
  const accessToken = token ? token : payload;
  const requestURL = `${EndPoints.UserProfileUrl}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });

    if (response.status === 400 || response.status === 500) {
      throw response
    }

    console.log(response, 'loginResponse profile');
    if (response.error) {
      yield put(AppActions.logout())
    }

    yield put(AppActions.getUserProfileSuccessAction(response));
  } catch (err) {
    console.log(err.message, "err user profile")
    yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
    yield put(AppActions.getUserProfileErrorAction(err));
  }
}

export function* forgotPassword() {
  const forgotPasswordDetails = yield select(
    Selectors.makeSelectForgotPasswordData(),
  );
  const requestURL = `${EndPoints.ForgotPasswordApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(forgotPasswordDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    yield put(Actions.forgotPasswordSuccess(response));
  } catch (err) {
    yield put(Actions.forgotPasswordError(err));
    yield put(AppActions.openSnackBar({ message: 'Not Working Yet', status: 'error' }));
  }
}

// Individual exports for testing
export default function* authorizationPageSaga() {
  yield takeLatest(Constants.SIGNUP_REQUEST, signup);

  yield takeLatest(AppConstants.LOGIN, login);
  yield takeLatest(AppConstants.LOG_OUT, logOut);
  yield takeLatest(AppConstants.GET_USER_PROFILE, userProfile);
  yield takeLatest(AppConstants.REFRESH_TOKEN, refreshToken);
  yield takeLatest(Constants.FORGOT_PASSWORD, forgotPassword);
}
