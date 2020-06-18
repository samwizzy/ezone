import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from '../../utils/request';
import * as Endpoints from '../../components/Endpoints';
import * as AppSelectors from '../App/selectors';
import * as AppActions from '../App/actions';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';

export function* getAllEmployees() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${Endpoints.GetAllUsersApi}/${
    currentUser && currentUser.organisation.orgId
    }`;

  try {
    const getAllEmployeesResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(getAllEmployeesResponse, 'getAllEmployeesResponses');

    yield put(Actions.getAllEmployeesSuccess(getAllEmployeesResponse));
  } catch (err) {
    if (err.response.status === 500) {
      yield put(Actions.getAllEmployeesError('Interval Server Error'));
      yield put(AppActions.openSnackBar({ message: 'Interval Server Error', status: 'error' }));
    } else if (err.response.status === 400) {
      yield put(Actions.getAllEmployeesError('Something went wrong, please try again'));
      yield put(AppActions.openSnackBar({ message: 'Something went wrong, please try again', status: 'error' }));
    }
  }
}

export function* createNewEmployee() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  // const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const createNewEmployeeData = yield select(
    Selectors.makeSelectCreateNewEmployeeData(),
  );

  const requestURL = `${Endpoints.CreateNewEmployeeApi}`;

  try {
    const createNewEmployeeResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(createNewEmployeeData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createNewEmployeeSuccess(createNewEmployeeResponse));
    yield put(Actions.getAllEmployees());
    yield put(Actions.closeNewEmployeeDialog());

    // if (createNewEmployeeResponse.success === true) {
    //   yield put(
    //     AppActions.openSnackBar({
    //       open: true,
    //       message: createNewEmployeeResponse.message,
    //       status: 'success',
    //     }),
    //   );
    // } else {
    //   yield put(
    //     AppActions.openSnackBar({
    //       open: true,
    //       message: createNewEmployeeResponse.message,
    //       status: 'warning',
    //     }),
    //   );
    // }
  } catch (err) {
    yield put(Actions.createNewEmployeeError(err));
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: `${err}`,
    //     status: 'error',
    //   }),
    // );
  }
}

export function* updateUserProfile() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const updateUserProfileData = yield select(
    Selectors.makeSelectUpdateUserProfileData(),
  );
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

    yield put(AppActions.openSnackBar({ open: true, message: response.message, status: 'success' }));
    // if (createNewEmployeeResponse.success === true) {
    //   yield put(
    //     AppActions.openSnackBar({
    //       open: true,
    //       message: createNewEmployeeResponse.message,
    //       status: 'success',
    //     }),
    //   );
    // } else {
    //   yield put(
    //     AppActions.openSnackBar({
    //       open: true,
    //       message: createNewEmployeeResponse.message,
    //       status: 'warning',
    //     }),
    //   );
    // }
  } catch (err) {
    console.log(err, 'errr');
    yield put(Actions.updateUserProfileError(err));
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: `${err}`,
    //     status: 'error',
    //   }),
    // );
  }
}

// Individual exports for testing
export default function* usersPageSaga() {
  yield takeLatest(Constants.GET_ALL_EMPLOYEES, getAllEmployees);
  yield takeLatest(Constants.CREATE_NEW_EMPLOYEE, createNewEmployee);
  yield takeLatest(Constants.UPDATE_USER_PROFILE, updateUserProfile);
}
