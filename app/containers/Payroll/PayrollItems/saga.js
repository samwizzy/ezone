import { takeLatest, call, put, select } from 'redux-saga/effects';
import swal from 'sweetalert';
import { push } from 'connected-react-router';
import history from './../../../utils/history'
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';

function errorHandler(promise) {
  return promise;
}

export function* getPayrollSetup() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAccountingSetupApi}/${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getPayrollSetupSuccess(response));
  } catch (err) {
    yield put(Actions.getPayrollSetupError(err));
  }
}

// Create allowance
export function* createAllowance({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateAccountJournalApi}`;
  payload.orgId = currentUser.organisation.orgId;

  console.log(payload, 'payload createAllowance');

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal('Success', 'Allowance created successfully', 'success');
    yield put(Actions.createAllowanceSuccess(response));
    yield put(Actions.closeNewAllowanceDialog());
    yield put(Actions.getAllowances());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json());
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.closeNewAllowanceDialog(err));
    yield put(Actions.createAllowanceError(err));
  }
}

export function* getAllowances() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetJournalListApi}?orgId=${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllowancesSuccess(response));
  } catch (err) {
    yield put(Actions.getAllowancesError(err));
  }
}

export function* getAllowanceById({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetJournalByIdApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log("Get the getAllowanceById", response)

    yield put(Actions.getAllowanceByIdSuccess(response));
  } catch (err) {
    yield put(Actions.getAllowanceByIdError(err));
  }
}
// Create benefit
export function* createBenefit({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateAccountJournalApi}`;
  payload.orgId = currentUser.organisation.orgId;

  console.log(payload, 'payload create Benefit');

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal('Success', 'Benefit created successfully', 'success');
    yield put(Actions.createBenefitSuccess(response));
    yield put(Actions.closeNewBenefitDialog());
    yield put(Actions.getBenefits());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json());
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.closeNewBenefitDialog(err));
    yield put(Actions.createBenefitError(err));
  }
}

export function* getBenefits() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetJournalListApi}?orgId=${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getBenefitsSuccess(response));
  } catch (err) {
    yield put(Actions.getBenefitsError(err));
  }
}

export function* getBenefitById({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetJournalByIdApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log("Get the getBenefitById", response)

    yield put(Actions.getBenefitByIdSuccess(response));
  } catch (err) {
    yield put(Actions.getBenefitByIdError(err));
  }
}
// Create earnings
export function* createEarning({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateAccountJournalApi}`;
  payload.orgId = currentUser.organisation.orgId;

  console.log(payload, 'payload create Earning');

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal('Success', 'Earning created successfully', 'success');
    yield put(Actions.createEarningSuccess(response));
    yield put(Actions.closeNewEarningDialog());
    yield put(Actions.getEarnings());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json());
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.closeNewEarningDialog(err));
    yield put(Actions.createEarningError(err));
  }
}

export function* getEarnings() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetJournalListApi}?orgId=${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getEarningsSuccess(response));
  } catch (err) {
    yield put(Actions.getEarningsError(err));
  }
}

export function* getEarningById({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetJournalByIdApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log("Get the getEarningById", response)

    yield put(Actions.getEarningByIdSuccess(response));
  } catch (err) {
    yield put(Actions.getEarningByIdError(err));
  }
}
// Create deduction
export function* createDeduction({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateAccountJournalApi}`;
  payload.orgId = currentUser.organisation.orgId;

  console.log(payload, 'payload create Deduction');

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal('Success', 'Deduction created successfully', 'success');
    yield put(Actions.createDeductionSuccess(response));
    yield put(Actions.closeNewDeductionDialog());
    yield put(Actions.getDeductions());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json());
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.closeNewDeductionDialog(err));
    yield put(Actions.createDeductionError(err));
  }
}

export function* getDeductions() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetJournalListApi}?orgId=${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getDeductionsSuccess(response));
  } catch (err) {
    yield put(Actions.getDeductionsError(err));
  }
}

export function* getDeductionById({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetJournalByIdApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log("Get the getDeductionById", response)

    yield put(Actions.getDeductionByIdSuccess(response));
  } catch (err) {
    yield put(Actions.getDeductionByIdError(err));
  }
}


// Individual exports for testing
export default function* payrollItemsSaga() {
  yield takeLatest(Constants.GET_PAYROLL_SETUP, getPayrollSetup);

  yield takeLatest(Constants.CREATE_ALLOWANCE, createAllowance);
  yield takeLatest(Constants.GET_ALLOWANCES, getAllowances);
  yield takeLatest(Constants.GET_ALLOWANCE_BY_ID, getAllowanceById);

  yield takeLatest(Constants.CREATE_BENEFIT, createBenefit);
  yield takeLatest(Constants.GET_BENEFITS, getBenefits);
  yield takeLatest(Constants.GET_BENEFIT_BY_ID, getBenefitById);

  yield takeLatest(Constants.CREATE_EARNING, createEarning);
  yield takeLatest(Constants.GET_EARNINGS, getEarnings);
  yield takeLatest(Constants.GET_EARNING_BY_ID, getEarningById);

  yield takeLatest(Constants.CREATE_DEDUCTION, createDeduction);
  yield takeLatest(Constants.GET_DEDUCTIONS, getDeductions);
  yield takeLatest(Constants.GET_DEDUCTION_BY_ID, getDeductionById);
}
