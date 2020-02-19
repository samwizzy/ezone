import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from '../../utils/request';
import { BaseUrl } from '../../components/BaseUrl';
import * as Endpoints from '../../components/Endpoints';
import * as AppSelectors from '../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';

export function* createNewEmployee() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const createNewEmployeeData = yield select(
    Selectors.makeSelectCreateNewEmployeeData(),
  );

  console.log(createNewEmployeeData, 'createNewEmployeeData');
  const requestURL = `${BaseUrl}${Endpoints.CreateNewEmployeeApi}`;

  try {
    const createNewEmployeeResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(createNewEmployeeData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(createNewEmployeeResponse, 'createNewPartyResponse');

    yield put(Actions.createNewEmployeeSuccess(createNewEmployeeResponse));
  } catch (err) {
    yield put(Actions.createNewEmployeeError(err));
  }
}

// Individual exports for testing
export default function* employeePageSaga() {
  yield takeLatest(Constants.CREATE_NEW_EMPLOYEE, createNewEmployee);
}
