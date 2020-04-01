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

// Individual exports for testing
export default function* itemPageSaga() {
  yield takeLatest(Constants.GET_ALL_ITEMS, getAllItems);
  yield takeLatest(Constants.CREATE_NEW_ITEM, createNewItem);
  yield takeLatest(Constants.GET_ALL_WAREHOUSE, getAllWarehouses);
}
