import { takeLatest, call, put, select } from 'redux-saga/effects';
import swal from 'sweetalert';
import axios from 'axios';
import request from '../../utils/request';
import * as Endpoints from '../../components/Endpoints';
import * as AppSelectors from '../App/selectors';
import * as AppActions from '../App/actions';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';

function errorHandler(promise) {
  return promise;
}

export function* getAllEmployees() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${Endpoints.GetAllUsersApi}/${currentUser &&
    currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'getAllEmployeesResponses');

    yield put(Actions.getAllEmployeesSuccess(response));
  } catch (err) {
    if (err.response.status === 500) {
      yield put(Actions.getAllEmployeesError('Interval Server Error'));
      yield put(
        AppActions.openSnackBar({
          message: 'Interval Server Error',
          status: 'error',
        }),
      );
    } else if (err.response.status === 400) {
      yield put(
        Actions.getAllEmployeesError('Something went wrong, please try again'),
      );
      yield put(
        AppActions.openSnackBar({
          message: 'Something went wrong, please try again',
          status: 'error',
        }),
      );
    }
  }
}

export function* getPagedEmployees({ payload: { offset = 0, limit = 10 } }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetPagedEmployeesByOrgIdApi}/${user &&
    user.organisation.orgId}?limit=${limit}&offset=${offset}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    console.log(response, 'PAGED employees response');

    yield put(Actions.getPagedEmployeesSuccess(response));
  } catch (err) {
    yield put(Actions.getPagedEmployeesError(err));
  }
}

export function* createNewEmployee({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateUserLite}`;
  console.log(payload, 'payload create new user lite');

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    swal('Success', 'User has been created successfully', 'success');
    yield put(Actions.createNewEmployeeSuccess(response));
    yield put(Actions.getAllEmployees());
    yield put(Actions.getPagedEmployees());
    yield put(Actions.closeNewEmployeeDialog());
  } catch (err) {
    console.dir(err.message);
    yield put(Actions.createNewEmployeeError(err));
  }
}

export function* deleteEmployee({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${Endpoints.DeleteEmployee}/${user &&
    user.organisation.orgId}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'DELETE',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json; charset=UTF-8',
      }),
    });

    console.log(response, 'response delete employee');
    yield put(
      AppActions.openSnackBar({
        message: 'Employee deleted successfully',
        status: 'success',
      }),
    );
    yield put(Actions.deleteEmployeeSuccess(response));
    yield put(Actions.closeConfirmDeleteEmployeeDialog());
    yield put(Actions.getAllEmployees());
    yield put(Actions.getPagedEmployees());
  } catch (err) {
    console.dir(err, 'err delete employee');
    if (err.response && err.response.data) {
      yield put(
        AppActions.openSnackBar({
          message: err.response.data.message,
          status: 'error',
        }),
      );
      yield put(Actions.deleteEmployeeError(err.response.data.message));
    }
  }
}

export function* updateUserProfile({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const updateUserProfileData = yield select(
    Selectors.makeSelectUpdateUserProfileData(),
  );

  console.log(payload, 'payload');
  console.log(updateUserProfileData, 'updateUserProfileData');
  const requestURL = `${Endpoints.UpdateUserProfileApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(updateUserProfileData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.updateUserProfileSuccess(response));
    yield put(Actions.closeEditUserProfileDialog());
    yield put(AppActions.getUserProfileAction());

    yield put(
      AppActions.openSnackBar({
        open: true,
        message: response.message,
        status: 'success',
      }),
    );
  } catch (err) {
    console.log(err, 'errr');
    yield put(Actions.updateUserProfileError(err));
  }
}

export function* getBranches() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetBranches}?orgId=${user &&
    user.organisation.id}&tagId=1`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getBranchesSuccess(response));
  } catch (err) {
    console.log(err.message, 'Branch error message');
  }
}

export function* getPositions() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetPositionsApi}/${user &&
    user.organisation.id}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getPositionsSuccess(response));
  } catch (err) {
    console.log(err, 'err message');
  }
}

export function* getDepartments() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetDepartmentsByOrgIdApi}?orgId=${user &&
    user.organisation.id}&tagId=5`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getDepartmentsSuccess(response));
  } catch (err) {
    console.log(err.message, 'err message');
  }
}

export function* getEmployeeTypes() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeeTypes}?orgId=${user &&
    user.organisation.orgId}&type=EMPLOYEETYPE`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getEmployeeTypesSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityFilesError(err));
    console.log(err.message, 'err message');
  }
}

export function* getSourcesOfHire() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeeTypes}?orgId=${user &&
    user.organisation.orgId}&type=SOURCEOFHIRE`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getSourceOfHireSuccess(response));
  } catch (err) {
    // yield put(Actions.getSourceOfHireError(err));
    console.log(err.message, 'err message');
  }
}

export function* getPayRates() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeeTypes}?orgId=${user &&
    user.organisation.orgId}&type=PAYRATE`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getPayRatesSuccess(response));
  } catch (err) {
    // yield put(Actions.getPayRatesError(err));
    console.log(err.message, 'err message');
  }
}

export function* getPayTypes() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeeTypes}?orgId=${user &&
    user.organisation.orgId}&type=PAYTYPE`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getPayTypesSuccess(response));
  } catch (err) {
    // yield put(Actions.getPayTypesError(err));
    console.log(err.message, 'err message');
  }
}

// Individual exports for testing
export default function* usersPageSaga() {
  yield takeLatest(Constants.GET_ALL_EMPLOYEES, getAllEmployees);
  yield takeLatest(Constants.GET_PAGED_EMPLOYEES, getPagedEmployees);
  yield takeLatest(Constants.CREATE_NEW_EMPLOYEE, createNewEmployee);
  yield takeLatest(Constants.UPDATE_USER_PROFILE, updateUserProfile);
  yield takeLatest(Constants.DELETE_EMPLOYEE, deleteEmployee);
  yield takeLatest(Constants.GET_BRANCHES, getBranches);
  yield takeLatest(Constants.GET_POSITIONS, getPositions);
  yield takeLatest(Constants.GET_DEPARTMENTS, getDepartments);
  yield takeLatest(Constants.GET_SOURCE_OF_HIRE, getSourcesOfHire);
  yield takeLatest(Constants.GET_EMPLOYEETYPES, getEmployeeTypes);
  yield takeLatest(Constants.GET_PAY_RATES, getPayRates);
  yield takeLatest(Constants.GET_PAY_TYPES, getPayTypes);
}
