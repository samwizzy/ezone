import { takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';
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

// Create new employee salary
export function* createEmployeeSalary({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  delete payload.subAccount;

  payload.orgId = currentUser.organisation.orgId;
  const requestURL = `${Endpoints.CreateChartOfAccountApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal('Success', `Employee salary saved successfully!`, 'success');
    yield put(Actions.createEmployeeSalarySuccess(response));
    yield put(Actions.getEmployeeSalaries());
    yield put(Actions.closeNewEmployeeSalaryDialog());
  } catch (err) {
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.createEmployeeSalaryError(err));
  }
}

// Get list of employee salaries
export function* getEmployeeSalaries() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllChartOfAccountApi}/${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getEmployeeSalariesSuccess(response));
  } catch (err) {
    yield put(Actions.getEmployeeSalariesError(err));
  }
}

// Get employee salary by id
export function* getEmployeeSalaryById({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetChartOfAccountByIdApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getEmployeeSalaryByIdSuccess(response));
  } catch (err) {
    yield put(Actions.getEmployeeSalaryByIdError(err));
  }
}

// Delete a employee salary
export function* deleteEmployeeSalary({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.DeleteChartOfAccountApi}/${payload.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal('Success', 'Employee salary deleted successfully', 'success');
    yield put(Actions.deleteEmployeeSalarySuccess(response));
    yield put(Actions.getEmployeeSalaries());
    yield put(Actions.closeDeleteEmployeeSalaryDialog());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json());
    swal('Error', 'Something went wrong', 'error');
    yield put(Actions.deleteEmployeeSalaryError(err));
  }
}

// Update a employee salary
export function* updateEmployeeSalary({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.UpdateChartOfAccountApi}`;

  payload.orgId = currentUser.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal("Success", "Employee salary updated successfully", "success");
    yield put(Actions.updateEmployeeSalarySuccess(response));
    yield put(Actions.getEmployeeSalaries());
    yield put(Actions.closeNewEmployeeSalaryDialog());
  } catch (err) {
    swal("Error", "Something went wrong", "error");
    yield put(Actions.updateEmployeeSalaryError(err));
  }
}

// Individual exports for testing
export default function* EmployeeSalarySaga() {
  yield takeLatest(Constants.CREATE_EMPLOYEE_SALARY, createEmployeeSalary);
  yield takeLatest(Constants.GET_EMPLOYEE_SALARIES, getEmployeeSalaries);
  yield takeLatest(Constants.GET_EMPLOYEE_SALARY_BY_ID, getEmployeeSalaryById);
  yield takeLatest(Constants.DELETE_EMPLOYEE_SALARY, deleteEmployeeSalary);
  yield takeLatest(Constants.UPDATE_EMPLOYEE_SALARY, updateEmployeeSalary);
}
