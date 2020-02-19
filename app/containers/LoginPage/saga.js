import { call, put, select, takeLatest } from 'redux-saga/effects';
import qs from 'query-string';
import request from '../../utils/request';
import { BaseUrl } from '../../components/BaseUrl';
import * as Selectors from '../App/selectors';
import * as Actions from '../App/actions';
import * as Constants from '../App/constants';
import * as Endpoints from '../../components/Endpoints';

export function* login() {
  const loginDetails = yield select(Selectors.makeSelectLoginDetails());

  const { username, password } = loginDetails;
  const newData = { username, password, grant_type: 'password' };
  const requestURL = `${BaseUrl}${Endpoints.LoginUrl}`;

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

    // yield put(Actions.loginSuccessAction(loginResponse));
    // yield put(Actions.saveToken(loginResponse.access_token));

    // if login is success get user profile with access token
    yield put(Actions.getUserProfileAction(loginResponse));
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
    yield put(Actions.loginErrorAction(err));
    yield put(
      Actions.openSnackBar({
        open: true,
        message: 'Wrong email or password',
        status: 'error',
      }),
    );
  }
}

export function* userProfile() {
  const accessToken = yield select(Selectors.makeSelectAccessToken());

  const requestURL = `${BaseUrl}${Endpoints.UserProfileUrl}`;

  try {
    const userProfileResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });

    console.log(userProfileResponse, 'loginResponse profile');

    // yield put(Actions.loginSuccessAction(userProfileResponse));

    yield put(Actions.getUserProfileSuccessAction(userProfileResponse));
  } catch (err) {
    console.log(err, 'err user profile');
    yield put(Actions.getUserProfileErrorAction(err));
  }
}

// Individual exports for testing
export default function* loginPageSaga() {
  yield takeLatest(Constants.LOGIN, login);
  yield takeLatest(Constants.GET_USER_PROFILE, userProfile);
}
