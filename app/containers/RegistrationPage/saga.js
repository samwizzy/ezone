import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from '../../utils/request';
import * as Constants from './constants';
import * as Actions from './actions';
import * as AppActions from '../App/actions';
import * as Selectors from './selectors';
import { BaseUrl } from '../../components/BaseUrl/index';
import * as EndPoints from '../../components/Endpoints';

export function* signup() {
  const signupReqData = yield select(Selectors.makeSelectSignupReqData());

  const requestURL = `${BaseUrl}${EndPoints.RegistrationUrl}`;
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
    yield put(
      AppActions.openSnackBar({
        open: true,
        message: signupRes.message,
        status: 'warning',
      }),
    );
    // yield put(AppActions.openSnackBar({ open: true, message: 'Registration Successful', status: 'success' }));
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

export default function* registrationPageSaga() {
  yield takeLatest(Constants.SIGNUP_REQUEST, signup);
}
