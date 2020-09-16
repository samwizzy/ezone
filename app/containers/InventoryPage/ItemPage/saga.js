import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';

function errorHandler(promise) {
  return promise
}

export function* getAccounts() {
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

    yield put(Actions.getAccountsSuccess(response));
  } catch (err) {
    yield put(Actions.getAccountsError(err));
    yield put(AppActions.openSnackBar({ open: true, message: `${err}`, status: 'error' }));
  }
}

export function* getVendors() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllContactsApi}/${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response get vendors');

    yield put(Actions.getVendorsSuccess(response));
  } catch (err) {
    yield put(Actions.getVendorsError(err));
    yield put(AppActions.openSnackBar({ open: true, message: `${err}`, status: 'error' }));
  }
}

export function* getAllItems() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetAllItems}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response');

    yield put(Actions.getAllItemsSuccess(response));
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

export function* getItemsGroups() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetItemsGroupsApi}?orgid=${currentUser.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response getItemsGroups');

    yield put(Actions.getItemsGroupsSuccess(response));
  } catch (err) {
    yield put(Actions.getItemsGroupsError(err));
    yield put(AppActions.openSnackBar({ open: true, message: `${err}`, status: 'error' }));
  }
}

export function* createNewItem({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  payload.orgId = currentUser.organisation.orgId;

  const requestURL = `${Endpoints.CreateNewItemApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createNewItemSuccess(response));
    yield put(Actions.getAllItems());
    yield put(push('/inventory/items'));
  } catch (err) {
    console.log(err);
    yield put(Actions.createNewItemError(err));
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "error create item")
  }
}

export function* createItemGroup({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  payload.orgId = currentUser.organisation.orgId;

  const requestURL = `${Endpoints.CreateItemGroupApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "response createItemGroup")

    yield put(Actions.createItemGroupSuccess(response));
    yield put(Actions.getItemsGroups());
    yield put(Actions.closeNewItemGroupDialog());
  } catch (err) {
    console.log(err);
    yield put(Actions.createItemGroupError(err));
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "error create item")
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

    console.log(response, 'getAllWarehouseResponse');

    yield put(Actions.getAllWarehouseSuccess(response));
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

export function* createNewTransferOrder({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  payload.orgId = currentUser.organisation.orgId;

  console.log(payload, "payload createNewTransferOrder")

  const requestURL = `${Endpoints.CreateNewTransferOrdersApi}`;
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "response createNewTransferOrder")

    yield put(Actions.getAllTransferOrder());
    yield put(push('/inventory/transfer/orders'));
  } catch (err) {
    console.log(err);
    yield put(Actions.createNewTransferOrderError(err));
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "error createNewTransferOrder")
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

    yield put(Actions.getAllTransferOrderSuccess(getAllTransferOrderResponse));
  } catch (err) {
    yield put(Actions.getAllTransferOrderError(err));
  }
}

export function* createNewInventoryAdjust({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  payload.orgId = currentUser.organisation.orgId;
  const requestURL = `${Endpoints.CreateNewInventoryAdjustApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllInventoryAdjustments());
    yield put(push('/inventory/adjustments'));
  } catch (err) {
    console.log(err);
    yield put(Actions.createNewInventoryAdjustmentError(err));
  }
}

export function* getAllInventoryAdjusts() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetAllInventoryAdjustsApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response');

    yield put(
      Actions.getAllInventoryAdjustmentsSuccess(response),
    );
  } catch (err) {
    yield put(Actions.getAllInventoryAdjustmentsError(err));
  }
}

export function* getAllItemsPerWarehouse({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetAllItemsPerWarehouseApi}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllItemsPerWarehouseSuccess(response));
  } catch (err) {
    yield put(Actions.getAllItemsPerWarehouseError(err));
  }
}

export function* getItemById() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const getItemByIdDetails = yield select(Selectors.makeSelectGetItemById());

  const requestURL = `${Endpoints.GetItemByIdApi}/${getItemByIdDetails}`;

  try {
    const getItemByIdResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getItemByIdSuccess(getItemByIdResponse));
  } catch (err) {
    yield put(Actions.getItemByIdError(err));
  }
}

export function* getStockLocations() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const getStockLocBySku = yield select(
    Selectors.makeSelectGetStockLocationBySku(),
  );

  const requestURL = `${Endpoints.GetStockLocations}/${getStockLocBySku}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getStockLocationsSuccess(response));
  } catch (err) {
    yield put(Actions.getStockLocationsError(err));
  }
}

export function* getTransferOrderById() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const getItemByIdDetails = yield select(Selectors.makeSelectGetItemById());

  const requestURL = `${Endpoints.GetTransferOrderByIdApi}/${getItemByIdDetails}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getTransferOrderByIdSuccess(response));
  } catch (err) {
    yield put(Actions.getTransferOrderByIdError(err));
  }
}

export function* getInventoryAdjustById() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const getItemByIdDetails = yield select(
    Selectors.makeSelectGetInventoryAdjustById(),
  );

  const requestURL = `${Endpoints.GetAdjustmentByIdApi}/${getItemByIdDetails}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getInventoryAdjustByIdSuccess(response));
  } catch (err) {
    yield put(Actions.getInventoryAdjustByIdError(err));
  }
}

// Individual exports for testing
export default function* itemPageSaga() {
  yield takeLatest(Constants.GET_ACCOUNTS, getAccounts);
  yield takeLatest(Constants.GET_VENDORS, getVendors);

  yield takeLatest(Constants.GET_INVENTORY_ADJUST_BY_ID, getInventoryAdjustById);
  yield takeLatest(Constants.GET_TRANSFER_ORDER_BY_ID, getTransferOrderById);
  yield takeLatest(Constants.GET_STOCK_LOCATIONS, getStockLocations);
  yield takeLatest(Constants.GET_ALL_ITEMS_PER_WAREHOUSE, getAllItemsPerWarehouse);
  yield takeLatest(Constants.GET_ITEM_BY_ID, getItemById);
  yield takeLatest(Constants.GET_ALL_TRANSFER_ORDER, getAllTransferOrder);
  yield takeLatest(Constants.GET_ITEMS_GROUPS, getItemsGroups);
  yield takeLatest(Constants.GET_ALL_ITEMS, getAllItems);
  yield takeLatest(Constants.CREATE_NEW_ITEM, createNewItem);
  yield takeLatest(Constants.CREATE_ITEM_GROUP, createItemGroup);
  yield takeLatest(Constants.GET_ALL_WAREHOUSE, getAllWarehouses);
  yield takeLatest(Constants.CREATE_NEW_TRANSFER_ORDER, createNewTransferOrder);
  yield takeLatest(Constants.CREATE_NEW_INVENTORY_ADJUSTMENT, createNewInventoryAdjust);
  yield takeLatest(Constants.GET_ALL_INVENTORY_ADJUSTMENT, getAllInventoryAdjusts);
}
