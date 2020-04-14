import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';


export function* getDashBoardDataSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetAllAccountTypeApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllAccountTypeSuccessAction(response));

  } catch (err) {
    yield put(Actions.getAllAccountTypeErrorAction(err));
  }
}


// Individual exports for testing
export default function* AccDashboardSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(Constants.DEFAULT_ACTION, getDashBoardDataSaga);
}
