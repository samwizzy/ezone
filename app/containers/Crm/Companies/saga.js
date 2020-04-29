import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import * as AppConstants from '../../App/constants';
import * as AppActions from '../../App/actions';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../../components/Endpoints';

export function* getAllCompanies() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllCompaniesApi}/?orgId=${
    currentUser.organisation.orgId
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

export function* createNewCompany() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const newCompany = yield select(Selectors.makeSelectCreateNewCompany());
  newCompany.orgId = currentUser.organisation.orgId;

  console.log(newCompany, 'newCompany');
  const requestURL = `${Endpoints.CreateNewContactApi}`;

  try {
    const newCompanyResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(newCompany),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createNewCompanySuccess(newCompanyResponse));
    yield put(Actions.getAllCompanies());
    yield put(Actions.closeNewCompanyDialog());
  } catch (err) {
    yield put(Actions.createNewCompanyError(err));
  }
}

export function* updateCompanySaga() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());

  const updateCompany = yield select(Selectors.makeSelectUpdateCompany());

  console.log(updateCompany, 'updateCompany');
  const requestURL = `${Endpoints.UpdateContactApi}/${updateCompany.id}`;

  try {
    const newCompanyResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(updateCompany),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createNewCompanySuccess(newCompanyResponse));
    yield put(Actions.getAllCompanies());
    yield put(Actions.closeNewCompanyDialog());
  } catch (err) {
    yield put(Actions.createNewCompanyError(err));
  }
}

// Individual exports for testing
export default function* crmCompaniesSaga() {
  yield takeLatest(Constants.UPDATE_COMPANY, updateCompanySaga);
  yield takeLatest(Constants.CREATE_NEW_COMPANY, createNewCompany);
  yield takeLatest(Constants.GET_ALL_COMPANIES, getAllCompanies);
}
