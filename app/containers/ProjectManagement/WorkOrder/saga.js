// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';

// Individual exports for testing

export function* saveVendorConfigSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const vendorPostData = yield select(Selectors.makeSelectVendorPostData());
  const requestURL = `${Endpoints.SaveVendorApi}`;

  try {
    const saveVendorResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(vendorPostData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('saveVendorResponse ---->', saveVendorResponse);
    yield put(Actions.saveVendorConfigSuccessAction(saveVendorResponse));
    yield put(Actions.getAllVendorsAction());
    yield put(Actions.closeVendorDialog());
  } catch (err) {
    console.log(err, '---> saveVendorConfigErrorAction');
    yield put(Actions.saveVendorConfigErrorAction(err));
  }
}

export function* createWorkOrderSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const workOrderPostData = yield select(
    Selectors.makeSelectWorkOrderPostData(),
  );
  workOrderPostData.orgId = currentUser.organisation.orgId;
  const requestURL = `${Endpoints.CreateWorkOrderApi}`;

  try {
    const workOrderResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(workOrderPostData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    alert('Workorder created succeefully!');
    yield put(Actions.saveWorkOrderSuccessAction(workOrderResponse));
    yield put(Actions.getAllWorkOrderAction());
  } catch (err) {
    alert('Something went wrong!');
    yield put(Actions.saveWorkOrderErrAction(err));
  }
}

export function* updateWorkOrderSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  // const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const updateWorkOrderPostData = yield select(
    Selectors.makeSelectWorkOrderPostData(),
  );
  const requestURL = `${Endpoints.UpdateWorkOrderApi}/${updateWorkOrderPostData.id}`;
  console.log('update requestURL --> ', requestURL);

  try {
    const workOrderResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(updateWorkOrderPostData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    console.log('updateWorkOrderSuccessAction -> ', workOrderResponse);
    alert(`Workorder updated successfully!`);
    yield put(Actions.updateWorkOrderSuccessAction(workOrderResponse));
  } catch (err) {
    yield put(Actions.updateWorkOrderErrAction(err));
  }
}

export function* deleteWorkOrderSaga({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.DeleteWorkOrderApi}/${payload.id}`;

  try {
    const workOrderResponse = yield call(request, requestURL, {
      method: 'DELETE',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });
    console.log('deleteWorkOrderSuccessAction -> ', workOrderResponse);
    alert(`Workorder deleted successfully!`);
    yield put(Actions.deleteWorkOrderSuccessAction(workOrderResponse));
    yield put(Actions.getAllWorkOrderAction());
  } catch (err) {
    alert(`Something went wrong!`);
    yield put(Actions.deleteWorkOrderErrorAction(err));
  }
}

export function* getListOfWorkOrderSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetListOfWorkOrderApi}`;

  try {
    const listOfWorkOrderResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllWorkOrderSuccessAction(listOfWorkOrderResponse));
  } catch (err) {
    yield put(Actions.getAllWorkOrderErrorAction(err));
  }
}

export function* getListOfVendorsSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetListOfVendorsApi}`;

  try {
    const listOfVendorsResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllVendorsSuccessAction(listOfVendorsResponse));
  } catch (err) {
    yield put(Actions.getAllVendorsErrorAction(err));
  }
}

// Individual exports for testing
export default function* WorkOrderConfigSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(Constants.SAVE_VENDOR_CONFIG, saveVendorConfigSaga);
  yield takeLatest(Constants.GET_ALL_VENDORS, getListOfVendorsSaga);
  yield takeLatest(Constants.SAVE_WORKORDER, createWorkOrderSaga);
  yield takeLatest(Constants.UPDATE_WORKORDER, updateWorkOrderSaga);
  yield takeLatest(Constants.DELETE_WORKORDER, deleteWorkOrderSaga);
  yield takeLatest(Constants.GET_ALL_WORKORDER, getListOfWorkOrderSaga);
}
