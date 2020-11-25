import { takeLatest, call, put, select } from 'redux-saga/effects';
import swal from 'sweetalert';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';

export function* createPayrollSetup({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.CreatePayrollSetupApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal('Success', 'Payroll setup successful', 'success');
    yield put(Actions.getPayrollSetup());
    yield put(Actions.getChartOfPayrolls());
    yield put(Actions.createPayrollSetupSuccess(response));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.createPayrollSetupError(err));
  }
}

export function* getPayrollSetup() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetPayrollSetupApi}/${currentUser.organisation.orgId
    }`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'getPayrollSetup response coming in');

    yield put(Actions.getPayrollSetupSuccess(response));
  } catch (err) {
    yield put(Actions.getPayrollSetupError(err));
  }
}

// Individual exports for testing
export default function* SettingsSaga() {
  yield takeLatest(Constants.CREATE_PAYROLL_SETUP, createPayrollSetup);
  yield takeLatest(Constants.GET_PAYROLL_SETUP, getPayrollSetup);
}
