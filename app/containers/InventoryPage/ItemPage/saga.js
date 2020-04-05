import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';

export function* getAllItems() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  // const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${Endpoints.GetAllItems}`;

  try {
    const getAllItemsResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(getAllItemsResponse, 'getAllItemsResponse');

    yield put(Actions.getAllItemsSuccess(getAllItemsResponse));
  } catch (err) {
    yield put(Actions.getAllItemsError(err));
    yield put(
      AppActions.openSnackBar({
        open: true,
        message: `${err}`,
        status: 'error',
      }),
    );
  }
}

export function* createNewItem() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const createNewItemDetails = yield select(Selectors.makeSelectItemDetails());
  createNewItemDetails.orgId = currentUser.organisation.orgId;

  const requestURL = `${Endpoints.CreateNewItemApi}`;

  try {
    const createNewItemResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(createNewItemDetails),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    // yield put(Actions.createNewItemSuccess(createNewItemResponse));
    yield put(Actions.getAllItems());
    yield put(Actions.closeNewItemDialog());

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
    console.log(err);
    yield put(Actions.createNewItemError(err));
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: `${err}`,
    //     status: 'error',
    //   }),
    // );
  }
}

export function* getAllWarehouses() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const requestURL = `${Endpoints.GetAllWarehouses}`;

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

export function* createNewTransferOrder() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const createNewTransferOrderDetails = yield select(
    Selectors.makeSelectTransferOrderDetails(),
  );
  // createNewTransferOrderDetails.orgId = currentUser.organisation.orgId;

  console.log(createNewTransferOrderDetails, 'createNewTransferOrderDetails');
  const requestURL = `${Endpoints.CreateNewTransferOrderPerWarehouseApi}`;

  try {
    const createNewTransferOrderResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(createNewTransferOrderDetails),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllTransferOrder());
    yield put(Actions.closeNewTransferOrderDialog());
  } catch (err) {
    console.log(err);
    yield put(Actions.createNewTransferOrderError(err));
  }
}

export function* getAllTransferOrder() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const requestURL = `${Endpoints.GetAllTransferOrderApi}`;

  try {
    const getAllTransferOrderResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(getAllTransferOrderResponse, 'getAllTransferOrderResponse');

    yield put(Actions.getAllTransferOrderSuccess(getAllTransferOrderResponse));
  } catch (err) {
    yield put(Actions.getAllTransferOrderError(err));
    // yield put(
    //   AppActions.openSnackBar({
    //     open: true,
    //     message: `${err}`,
    //     status: 'error',
    //   }),
    // );
  }
}

export function* createNewInventoryAdjust() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const createNewInventoryAdjustDetails = yield select(
    Selectors.makeSelectInventoryAdjustmentDetails(),
  );

  console.log(
    createNewInventoryAdjustDetails,
    'createNewInventoryAdjustDetails',
  );
  const requestURL = `${Endpoints.CreateNewInventoryAdjustApi}`;

  try {
    const createNewTransferOrderResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(createNewInventoryAdjustDetails),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllInventoryAdjustments());
    yield put(Actions.closeNewInventoryAdjustDialog());
  } catch (err) {
    console.log(err);
    yield put(Actions.createNewInventoryAdjustmentError(err));
  }
}

export function* getAllInventoryAdjusts() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const requestURL = `${Endpoints.GetAllInventoryAdjustsApi}`;

  try {
    const getAllInventoryAdjustResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(getAllInventoryAdjustResponse, 'getAllInventoryAdjustResponse');

    yield put(
      Actions.getAllInventoryAdjustmentsSuccess(getAllInventoryAdjustResponse),
    );
  } catch (err) {
    yield put(Actions.getAllInventoryAdjustmentsError(err));
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
export default function* itemPageSaga() {
  yield takeLatest(Constants.GET_ALL_TRANSFER_ORDER, getAllTransferOrder);
  yield takeLatest(Constants.GET_ALL_ITEMS, getAllItems);
  yield takeLatest(Constants.CREATE_NEW_ITEM, createNewItem);
  yield takeLatest(Constants.GET_ALL_WAREHOUSE, getAllWarehouses);
  yield takeLatest(Constants.CREATE_NEW_TRANSFER_ORDER, createNewTransferOrder);
  yield takeLatest(
    Constants.CREATE_NEW_INVENTORY_ADJUSTMENT,
    createNewInventoryAdjust,
  );
  yield takeLatest(
    Constants.GET_ALL_INVENTORY_ADJUSTMENT,
    getAllInventoryAdjusts,
  );
}
