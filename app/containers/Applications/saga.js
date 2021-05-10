import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import * as AppActions from '../App/actions';
import * as AppSelectors from '../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../components/Endpoints';

export function* getModulesByOrg() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.ModulesByOrgApi}`;
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response by applications saga');

    yield put(Actions.getModulesSuccess(response));
  } catch (err) {
    yield put(Actions.getModulesError(err));
  }
}

export function* getModulesByAccessOffers() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.ModulesByAccessOffersApi}`;
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response by aaccess offers');

    yield put(Actions.getModulesByAccessOffersSuccess(response));
  } catch (err) {
    yield put(Actions.getModulesByAccessOffersError(err));
  }
}

export function* getPaymentGateways() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.PaymentGatewaysApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response payment gateways');

    yield put(Actions.getPaystackGatewaysSuccess(response));
  } catch (err) {
    yield put(Actions.getPaystackGatewaysError(err));
  }
}

export function* registerModules({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.RegisterModuleBeforePaymentApi}`;
  
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response register modules');

    yield put(Actions.registerModulesSuccess(response));
  } catch (err) {
    yield put(Actions.registerModulesError(err));
  }
}

export function* verifyPayment({ payload }) {
  const { paymentGateway, transactionRef } = payload;
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.VerifyPaymentApi}/${paymentGateway}/${transactionRef}`;
  
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response VERIFY payment');

    yield put(Actions.verifyPaymentSuccess(response));
  } catch (err) {
    yield put(Actions.verifyPaymentError(err));
  }
}

// default export for all functions
export default function* ApplicationsSaga() {
  yield takeLatest(Constants.GET_MODULES, getModulesByOrg);
  yield takeLatest(
    Constants.GET_MODULES_BY_ACCESS_OFFERS,
    getModulesByAccessOffers,
  );
  yield takeLatest(Constants.REGISTER_MODULES, registerModules);
  yield takeLatest(Constants.GET_PAYMENT_GATEWAYS, getPaymentGateways);
  yield takeLatest(Constants.VERIFY_PAYMENT, verifyPayment);
}
