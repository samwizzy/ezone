import { takeLatest, call, put, select } from 'redux-saga/effects';
import swal from 'sweetalert';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';

// Create new payrun
export function* createPayrun({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateNewBankApi}`;
  payload.orgId = currentUser.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createPayrunSuccess(response));
    swal('Success', 'Payrun Created Successfully', 'success');
    yield put(Actions.getPayruns());
    yield put(Actions.closeNewPayrunDialog());
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.createPayrunError(err));
  }
}

// Update new payrun
export function* updatePayrun({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.UpdateBankAccountApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.updatePayrunSuccess(response));
    swal('Success', 'Payrun Updated Successfully', 'success');
    yield put(Actions.getPayruns());
    yield put(Actions.closeNewPayrunDialog());
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.updatePayrunError(err));
  }
}

// Get payrun list
export function* getPayruns() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllBankAccount}/${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('PayrunResponse --> ', response);
    yield put(Actions.getPayrunsSuccess(response));
  } catch (err) {
    yield put(Actions.getPayrunsError(err));
  }
}

// Get payrun by id
export function* getPayrunById({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetBankAccountByIdApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('payrunByIdResponse --> ', response);
    yield put(Actions.getPayrunByIdSuccess(response));
  } catch (err) {
    yield put(Actions.getPayrunByIdError(err));
  }
}

// Delete payrun
export function* deletePayrun({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.DeleteBankAccountApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('deletePayrunResponse -> ', response);
    yield put(Actions.getPayruns());
    swal('Success', 'Payrun deleted Successfully', 'success');
    yield put(Actions.deletePayrunSuccess(response));
    yield put(Actions.closeDeletePayrunDialog());
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.deletePayrunError(err));
  }
}

export function* activateDeactivatePayrun({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.ActivateDeactivateBankAccountApi}?id=${payload.id
    }&status=${payload.status}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getPayruns());
    swal('Success', 'Payrun status updated Successfully', 'success');
    yield put(Actions.activateDeactivatePayrunSuccess(response));
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.activateDeactivatePayrunError(err));
  }
}

// Individual exports for testing
export default function* PayrunSaga() {
  yield takeLatest(Constants.CREATE_PAYRUN, createPayrun);
  yield takeLatest(Constants.GET_PAYRUNS, getPayruns);
  yield takeLatest(Constants.GET_PAYRUN_BY_ID, getPayrunById);
  yield takeLatest(Constants.DELETE_PAYRUN, deletePayrun);
  yield takeLatest(Constants.ACTIVATE_DEACTIVATE_PAYRUN, activateDeactivatePayrun);
  yield takeLatest(Constants.UPDATE_PAYRUN, updatePayrun);
}
