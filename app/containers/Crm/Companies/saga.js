import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import * as AppConstants from '../../App/constants';
import * as AppActions from '../../App/actions';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../../components/Endpoints';

function errorHandler(promise) {
  return promise
}

export function* getEmployees() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetEmployeesByOrgIdApi}?orgId=${user && user.organisation.orgId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, "get employees response")

    yield put(Actions.getEmployeesSuccess(response));
  } catch (err) {
    if (err.message) {
      yield put(AppActions.openSnackBar({ message: err.message, status: 'error' }));
      yield put(Actions.getEmployeesError(err.message));
    } else {
      const error = yield call(errorHandler, err.response.json())
      if (error.status === 500 || error.status === 400) {
        yield put(AppActions.openSnackBar({ message: error.message, status: 'error' }));
        yield put(Actions.getEmployeesError(error.message));
      }
    }
  }
}

export function* getAllCompanies() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllCompaniesApi}/${
    currentUser && currentUser.organisation.orgId
    }`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllCompaniesSuccess(response));
  } catch (err) {
    yield put(Actions.getAllCompaniesError(err));
  }
}

export function* createNewCompany({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateNewContactApi}`;
  payload.orgId = currentUser && currentUser.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createNewCompanySuccess(response));
    yield put(Actions.getAllCompanies());
    yield put(Actions.closeNewCompanyDialog());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "creating contact error")
    yield put(Actions.createNewCompanyError(err));
  }
}

export function* updateCompanySaga({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateContactApi}/${payload.id}`;
  const { imageName, imageUrl, ...rest } = payload

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(rest),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createNewCompanySuccess(response));
    yield put(Actions.getAllCompanies());
    yield put(Actions.closeNewCompanyDialog());
  } catch (err) {
    yield put(Actions.createNewCompanyError(err));
  }
}

// Individual exports for testing
export default function* crmCompaniesSaga() {
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
  yield takeLatest(Constants.UPDATE_COMPANY, updateCompanySaga);
  yield takeLatest(Constants.CREATE_NEW_COMPANY, createNewCompany);
  yield takeLatest(Constants.GET_ALL_COMPANIES, getAllCompanies);
}
