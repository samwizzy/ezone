import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from '../../utils/request';
import { BaseUrl } from '../../components/BaseUrl';
import * as Endpoints from '../../components/Endpoints';
import * as AppSelectors from '../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';

export function* companyDetail() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${BaseUrl}${Endpoints.CompanyInfoUrl}/${
    currentUser.organisation.orgId
  }`;

  try {
    const companyDetailResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getCompanyInfoSuccess(companyDetailResponse));
  } catch (err) {
    yield put(Actions.getCompanyInfoError(err));
  }
}

export function* updateCompanyDetail() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const updateCompanyInfoData = yield select(
    Selectors.makeSelectUpdateCompanyInfoData(),
  );

  console.log(updateCompanyInfoData, 'updateCompanyInfoData')
  const requestURL = `${BaseUrl}${Endpoints.UpdateCompanyInfoUrl}`;

  try {
    const companyDetailResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(updateCompanyInfoData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(companyDetailResponse, 'companyDetailResponse')
    yield put(Actions.getCompanyInfoSuccess());
    yield put(Actions.updateCompanyInfoSuccess(companyDetailResponse));
  } catch (err) {
    yield put(Actions.updateCompanyInfoError(err));
  }
}

// Individual exports for testing
export default function* orgPageSaga() {
  yield takeLatest(Constants.GET_COMPANY_INFO, companyDetail);
  yield takeLatest(Constants.UPDATE_COMPANY_INFO, updateCompanyDetail);
}
