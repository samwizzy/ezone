import { takeLatest, call, put, select } from 'redux-saga/effects';
import swal from 'sweetalert';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';

// Create new salary advance
export function* createSalaryAdvance({ payload }) {
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

    yield put(Actions.createSalaryAdvanceSuccess(response));
    swal('Success', 'Salary Advance Created Successfully', 'success');
    yield put(Actions.getSalaryAdvances());
    yield put(Actions.closeNewSalaryAdvanceDialog());
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.createSalaryAdvanceError(err));
  }
}

// Update new salary advance
export function* updateSalaryAdvance({ payload }) {
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

    yield put(Actions.updateSalaryAdvanceSuccess(response));
    swal('Success', 'Salary Advance Updated Successfully', 'success');
    yield put(Actions.getSalaryAdvances());
    yield put(Actions.closeNewSalaryAdvanceDialog());
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.updateSalaryAdvanceError(err));
  }
}

// Get salary advances list
export function* getSalaryAdvances() {
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

    console.log('allSalaryAdvanceResponse --> ', response);
    yield put(Actions.getSalaryAdvancesSuccess(response));
  } catch (err) {
    yield put(Actions.getSalaryAdvancesError(err));
  }
}

// Get salary advance by id
export function* getSalaryAdvanceById({ payload }) {
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

    console.log('salaryAdvanceByIdResponse --> ', response);
    yield put(Actions.getSalaryAdvanceByIdSuccess(response));
  } catch (err) {
    console.log('salaryAdvanceByIdErrorAction --> ', err);
    yield put(Actions.getSalaryAdvanceByIdError(err));
  }
}

// Delete salary advance
export function* deleteSalaryAdvance({ payload }) {
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

    console.log('deleteAccountResponse -> ', response);
    yield put(Actions.getSalaryAdvances());
    swal('Success', 'Account deleted Successfully', 'success');
    yield put(Actions.deleteSalaryAdvanceSuccess(response));
    yield put(Actions.closeDeleteSalaryAdvanceDialog());
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.deleteSalaryAdvanceError(err));
  }
}

// Individual exports for testing
export default function* SalaryAdvanceSaga() {
  yield takeLatest(Constants.CREATE_SALARY_ADVANCE, createSalaryAdvance);
  yield takeLatest(Constants.GET_ALL_BANK_ACCOUNT, getSalaryAdvances);
  yield takeLatest(Constants.GET_BANK_ACCOUNT_BY_ID, getSalaryAdvanceById);
  yield takeLatest(Constants.DELETE_BANK_ACCOUNT, deleteSalaryAdvance);
  yield takeLatest(Constants.UPDATE_BANK_ACCOUNT, updateSalaryAdvance);
}
