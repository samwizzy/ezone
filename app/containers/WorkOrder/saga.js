// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../App/selectors';
import * as Selectors from './selectors';
import { BaseUrl } from '../../components/BaseUrl';
import request from '../../utils/request';
import * as Endpoints from '../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';

// Individual exports for testing

export function* saveVendorConfigSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const vendorPostData = yield select(Selectors.makeSelectVendorPostData());

  console.log("vendorPostData: ", vendorPostData);

  const requestURL = `${Endpoints.SaveVendorApi}`;
  console.log('vendor postURL --> ', requestURL);

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

  } catch (err) {
    console.log(err, '---> saveVendorConfigErrorAction');
    yield put(Actions.saveVendorConfigErrorAction(err));
  }
}

export function* getListOfVendorsSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const requestURL = `${Endpoints.GetListOfVendorsApi}`;
  console.log('requestURL --> ', requestURL);

  try {
    const listOfVendorsResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('listOfVendorsResponse ---->', listOfVendorsResponse);
    yield put(Actions.getAllVendorsSuccessAction(listOfVendorsResponse));

  } catch (err) {
    console.log(err, '---> getPartyGroupErrorAction');
    yield put(Actions.getAllVendorsErrorAction(err));
  }
}

// Individual exports for testing
export default function* WorkOrderConfigSaga() {
  // See example in containers/HomePage/saga.js 
  yield takeLatest(Constants.SAVE_VENDOR_CONFIG, saveVendorConfigSaga);
  yield takeLatest(Constants.GET_ALL_VENDORS, getListOfVendorsSaga);
}