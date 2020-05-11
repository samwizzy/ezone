import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Selectors from './selectors';
import request from '../../../utils/request';
import * as Endpoints from '../../../components/Endpoints';
import * as Actions from './actions';
import * as Constants from './constants';


export function* getBudgetingSaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllAccountTypeApi}/${currentUser.organisation.orgId}`;

  try {
    const allAccountTypeResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllAccountTypeSuccessAction(allAccountTypeResponse));
  } catch (err) {
    alert('Something went wrong getAllAccountTypeSaga');
    yield put(Actions.getAllAccountTypeErrorAction(err));
  }
}

// Individual exports for testing
export default function* BudgetingSaga() {
  // See example in containers/HomePage/saga.js
}

