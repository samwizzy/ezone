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

  const requestURL = `${Endpoints.GetAllUsersApi}?orgId=${currentUser && currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllEmployeesSuccess(response));
  } catch (err) {
    yield put(Actions.getAllEmployeesError(err));
  }
}

export function* getAllWarehouses() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetAllWarehouses}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response');

    yield put(Actions.getAllWarehouseSuccess(response));
  } catch (err) {
    yield put(Actions.getAllWarehouseError(err));
  }
}

export function* createNewWarehouse() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const createNewWarehouseData = yield select(Selectors.makeSelectWarehouseDetails());
  createNewWarehouseData.orgId = currentUser.organisation.orgId;

  console.log(createNewWarehouseData, 'createNewWarehouseData');
  const requestURL = `${Endpoints.CreateNewWarehouseApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(createNewWarehouseData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    // yield put(Actions.createNewEmployeeSuccess(createNewEmployeeResponse));
    yield put(Actions.getAllWarehouse());
    yield put(Actions.closeNewWarehouseDialog());
  } catch (err) {
    console.log(err);
    yield put(Actions.createNewWarehouseError(err));
  }
}

export function* updateWarehouse() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const createNewWarehouseData = yield select(
    Selectors.makeSelectWarehouseDetails(),
  );
  createNewWarehouseData.orgId = currentUser.organisation.orgId;

  const requestURL = `${Endpoints.UpdateWarehouseApi}/${
    createNewWarehouseData.id
    }`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(createNewWarehouseData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllWarehouse());
    yield put(Actions.closeEditWarehouseDialog());
  } catch (err) {
    console.log(err);
    yield put(Actions.createNewWarehouseError(err));
  }
}

// Individual exports for testing
export default function* warehousePageSaga() {
  yield takeLatest(Constants.GET_ALL_EMPLOYEES, getAllEmployees);
  yield takeLatest(Constants.GET_ALL_WAREHOUSE, getAllWarehouses);
  yield takeLatest(Constants.CREATE_NEW_WAREHOUSE, createNewWarehouse);
  yield takeLatest(Constants.UPDATE_WAREHOUSE, updateWarehouse);
}
