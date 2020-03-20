import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';

export function* getAllEmployees() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${Endpoints.GetAllEmployeesApi}/${
    currentUser.organisation.orgId
  }`;

  try {
    const getAllEmployeesResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(getAllEmployeesResponse, 'getAllEmployeesResponse');

    yield put(Actions.getAllEmployeesSuccess(getAllEmployeesResponse));
  } catch (err) {
    yield put(Actions.getAllEmployeesError(err));
    yield put(
      AppActions.openSnackBar({
        open: true,
        message: `${err}`,
        status: 'error',
      }),
    );
  }
}

export function* getAllWarehouses() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${Endpoints.GetAllEmployeesApi}/${
    currentUser.organisation.orgId
  }`;

  try {
    const getAllWarehouseResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(getAllWarehouseResponse, 'getAllWarehouseResponse');

    yield put(Actions.getAllWarehouseSuccess(getAllWarehouseResponse));
  } catch (err) {
    yield put(Actions.getAllWarehouseError(err));
    yield put(
      AppActions.openSnackBar({
        open: true,
        message: `${err}`,
        status: 'error',
      }),
    );
  }
}

export function* createNewWarehouse() {
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

    if (createNewEmployeeResponse.success === true) {
      yield put(
        AppActions.openSnackBar({
          open: true,
          message: createNewEmployeeResponse.message,
          status: 'success',
        }),
      );
    } else {
      yield put(
        AppActions.openSnackBar({
          open: true,
          message: createNewEmployeeResponse.message,
          status: 'warning',
        }),
      );
    }
  } catch (err) {
    yield put(Actions.createNewEmployeeError(err));
    yield put(
      AppActions.openSnackBar({
        open: true,
        message: `${err}`,
        status: 'error',
      }),
    );
  }
}

// Individual exports for testing
export default function* warehousePageSaga() {
  yield takeLatest(Constants.GET_ALL_EMPLOYEES, getAllEmployees);
  yield takeLatest(Constants.GET_ALL_WAREHOUSE, getAllWarehouses);
  yield takeLatest(Constants.CREATE_NEW_WAREHOUSE, createNewWarehouse);
}
