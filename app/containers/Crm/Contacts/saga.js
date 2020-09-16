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

export function* getAllContacts() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const user = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetAllContactsApi}/${
    user && user.organisation.orgId
    }`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getAllContactsSuccess(response));
  } catch (err) {
    console.log(err, "err contacts")
    yield put(Actions.getAllContactsError(err));
  }
}

export function* getContactsGroups() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetAllContactsGroupApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getContactsGroupsSuccess(response));
  } catch (err) {
    yield put(Actions.getContactsGroupsError(err));
  }
}

export function* createNewContact({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.CreateNewContactApi}`;
  payload.orgId = currentUser.organisation.orgId;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'create contact response');

    yield put(AppActions.openSnackBar({ message: "Contact created successfully", status: 'success' }));
    yield put(Actions.createNewContactSuccess(response));
    yield put(Actions.getAllContacts());
    yield put(Actions.closeNewContactDialog());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "creating contact error")
    yield put(Actions.createNewContactError(err));
  }
}

export function* updateContact({ payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.UpdateContactApi}/${payload.id}`;
  console.log(payload, 'payload contact update');
  const { imageName, imageUrl, ...rest } = payload

  console.log(rest, "rest payload")

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(rest),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response updated contact');

    yield put(AppActions.openSnackBar({ message: "Contact updated successfully", status: 'success' }));
    yield put(Actions.updateContactSuccess(response));
    yield put(Actions.getAllContacts());
    yield put(Actions.closeEditContactDialog());
  } catch (err) {
    const error = yield call(errorHandler, err.response.json())
    console.log(error, "updating contact error")
    yield put(Actions.updateContactError(err));
  }
}

// Individual exports for testing
export default function* crmContactsSaga() {
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
  yield takeLatest(Constants.CREATE_NEW_CONTACT, createNewContact);
  yield takeLatest(Constants.UPDATE_CONTACT, updateContact);
  yield takeLatest(Constants.GET_ALL_CONTACTS, getAllContacts);
  yield takeLatest(Constants.GET_CONTACTS_GROUPS, getContactsGroups);
}
