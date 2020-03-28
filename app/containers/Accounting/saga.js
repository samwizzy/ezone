import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../App/selectors';
import * as AppActions from '../App/actions';
import * as Selectors from './selectors';
import { BaseUrl } from '../../components/BaseUrl';
import request from '../../utils/request';
import * as Endpoints from '../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';


export function* getAllAccountTypeSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetAllAccountTypeApi}`;

  try {
    const allAccountTypeResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('allAccountTypeResponse -->', allAccountTypeResponse);
    yield put(Actions.getAllAccountTypeSuccessAction(allAccountTypeResponse));

  } catch (err) {
    console.log('getAllAccountTypeErrorAction--->', err);
    yield put(Actions.getAllAccountTypeErrorAction(err));
  }
}

export function* getDetailTypeSaga({type, payload}) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetDetailTypeApi}/${payload.id}`;

  console.log(payload, "payload")

  try {
    const detailTypeResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log('detailTypeResponse -->', detailTypeResponse);
    yield put(Actions.getDetailTypeSuccessAction(detailTypeResponse));

  } catch (err) {
    console.log('getDetailTypeErrorAction--->', err);
    yield put(Actions.getDetailTypeErrorAction(err));
  }
}

// Individual exports for testing
export default function* AccountingSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(Constants.GET_ALL_ACCOUNT_TYPES, getAllAccountTypeSaga);
  yield takeLatest(Constants.GET_DETAIL_TYPES, getDetailTypeSaga);
}
