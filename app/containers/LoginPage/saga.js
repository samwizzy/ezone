import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';

import { BaseUrl } from '../../components/BaseUrl';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../components/Endpoints';

export function* login() {
  const loginDetails = yield select(Selectors.makeSelectLoginDetails());

  const { username, password } = loginDetails;
  const newData = { username, password, grant_type: 'password' };
  const requestURL = `${BaseUrl}${Endpoints.LoginUrl}`;

  //export const LoginUrl = `${BaseUrl}/authserv/oauth/token`;
//export const UserProfileUrl = `${BaseUrl}/authserv/api/v1/users/profile`;

  try {
    const loginResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: new Headers({
        Authorization: `Basic ${btoa('web-client:password')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });

    console.log(loginResponse, 'loginResponse of User');

    yield put(Actions.loginSuccessAction(loginResponse));
  } catch (err) {
    console.log(err, 'IK err');
    yield put(Actions.loginErrorAction(err));
  }
}

// Individual exports for testing
export default function* loginPageSaga() {
  yield takeLatest(Constants.LOGIN, login);
}
