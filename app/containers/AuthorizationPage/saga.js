import { takeLatest, call, put, select } from 'redux-saga/effects';
import qs from 'query-string';
import request from '../../utils/request';
import history from '../../utils/history'
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
      yield put(AppActions.openSnackBar({message: signupRes.message, status: 'success'}));
    } else {
      yield put(AppActions.openSnackBar({message: signupRes.message, status: 'warning'}));
    }
  } catch (err) {
    yield put(Actions.signupErrorRequest(err));
    yield put(AppActions.openSnackBar({message: err.message, status: 'error'}));
  }
}

export function* login({payload}) {
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

    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    localStorage.setItem('expires_in', response.expires_in);

    yield put(AppActions.loginSuccessAction(response.access_token));

    yield put(AppActions.getUserProfileAction(response.access_token));
  
  } catch (err) {
    yield put(AppActions.loginErrorAction(err));
    yield put(AppActions.openSnackBar({ message: 'Wrong email or password', status: 'error' }));
  }
}

export function* refreshToken() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
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

export function* userProfile({payload}) {
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

    console.log(response, 'loginResponse profile');
    if(response.error){
      yield put(AppActions.logout())
    }

    yield put(AppActions.getUserProfileSuccessAction(response));
  } catch (err) {
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
    yield put(AppActions.openSnackBar({ message: 'Not Working Yet', status: 'error'}));
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
