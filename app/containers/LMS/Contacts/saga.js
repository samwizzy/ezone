import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import * as AppConstants from '../../App/constants';
import * as AppActions from '../../App/actions';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../../components/Endpoints';

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
    if (response.status === 400 || response.status === 500) {
      throw response
    }

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

export function* createNewContact() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const newContact = yield select(Selectors.makeSelectCreateNewContact());
  newContact.orgId = currentUser.organisation.orgId;

  // console.log(newContact, 'newContact');

  const {
    orgId,
    firstName,
    lastName,
    dob,
    website,
    contactGroupId,
    emailAddress,
    phoneNumber,
    ownerId,
    lifeStage,
    type,
    notes,
    fax,
    associationType,
    image,
  } = newContact;
  const newData = {
    orgId,
    firstName,
    lastName,
    dob,
    website,
    contactGroupId,
    emailAddress,
    phoneNumber,
    ownerId,
    lifeStage,
    type,
    notes,
    fax,
    associationType,
    image,
  };

  console.log(newData, 'newData');
  const requestURL = `${Endpoints.CreateNewContactApi}`;

  try {
    const newContactResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(newContactResponse, 'newContactResponse');

    yield put(Actions.createNewContactSuccess(newContactResponse));
    yield put(Actions.getAllContacts());
    yield put(Actions.closeNewContactDialog());
  } catch (err) {
    yield put(Actions.createNewContactError(err));
  }
}

export function* updateContact() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  // const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const updateContactData = yield select(Selectors.makeSelectUpdateContact());

  console.log(updateContactData, 'updateContactData');
  const requestURL = `${Endpoints.UpdateContactApi}/${updateContactData.id}`;

  try {
    const newContactResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(updateContactData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(newContactResponse, 'newContactResponse');

    yield put(Actions.updateContactSuccess(newContactResponse));
    yield put(Actions.getAllContacts());
    yield put(Actions.closeEditContactDialog());
  } catch (err) {
    yield put(Actions.createNewContactError(err));
  }
}

// Individual exports for testing
export default function* crmContactsSaga() {
  yield takeLatest(Constants.CREATE_NEW_CONTACT, createNewContact);
  yield takeLatest(Constants.UPDATE_CONTACT, updateContact);
  yield takeLatest(Constants.GET_ALL_CONTACTS, getAllContacts);
  yield takeLatest(Constants.GET_CONTACTS_GROUPS, getContactsGroups);
}
