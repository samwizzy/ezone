import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../../utils/request';
import * as AppConstants from '../../App/constants';
import * as AppActions from '../../App/actions';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import * as Constants from './constants';
import * as Endpoints from '../../../components/Endpoints';

export function* getAllContactsGroup() {
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

    yield put(Actions.getAllContactsGroupSuccess(response));
  } catch (err) {
    yield put(Actions.getAllContactsGroupError(err));
  }
}

export function* createNewContactGroup() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const newContactGroup = yield select(
    Selectors.makeSelectCreateNewContactGroup(),
  );
  newContactGroup.orgId = currentUser.organisation.orgId;

  const requestURL = `${Endpoints.CreateNewContactGroupApi}`;

  try {
    const newContactGroupResponse = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(newContactGroup),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.createNewContactGroupSuccess(newContactGroupResponse));
    yield put(Actions.getAllContactsGroup());
    yield put(Actions.closeNewContactGroupsDialog());
  } catch (err) {
    yield put(Actions.createNewContactGroupError(err));
  }
}

export function* updateContactGroup() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  // const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const updateContactGroupData = yield select(
    Selectors.makeSelectUpdateContactGroup(),
  );

  console.log(updateContactGroupData, 'updateContactGroupData');
  const requestURL = `${Endpoints.UpdateContactGroupApi}/${
    updateContactGroupData.id
    }`;

  try {
    const newContactResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(updateContactGroupData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(newContactResponse, 'newContactResponse');

    yield put(Actions.updateContactGroupSuccess(newContactResponse));
    yield put(Actions.getAllContactsGroup());
    yield put(Actions.closeEditContactGroupsDialog());
  } catch (err) {
    yield put(Actions.createNewContactGroupError(err));
  }
}

export function* getContactGroup() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  // const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const getContactGroupById = yield select(
    Selectors.makeSelectContactGroupById(),
  );

  const requestURL = `${
    Endpoints.GetContactGroupByIdApi
    }/${getContactGroupById}`;

  try {
    const getContactGroupByIdResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getContactGroupByIdSuccess(getContactGroupByIdResponse));
  } catch (err) {
    yield put(Actions.getContactGroupByIdError(err));
  }
}

export function* getContacts() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  const requestURL = `${Endpoints.GetAllContactsApi}/?orgId=${
    currentUser.organisation.orgId
    }`;

  try {
    const getContactsResponse = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    yield put(Actions.getContactsSuccess(getContactsResponse));
  } catch (err) {
    yield put(Actions.getContactsError(err));
  }
}

export function* assignContactToGroup() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const contactDetails = yield select(Selectors.makeSelectContactDetails());

  console.log(contactDetails, 'contactDetails');
  const requestURL = `${Endpoints.UpdateContactGroupApi}/${contactDetails.id}`;

  try {
    const newContactResponse = yield call(request, requestURL, {
      method: 'PUT',
      body: JSON.stringify(contactDetails),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(newContactResponse, 'newContactResponse');

    yield put(Actions.assignContactToGroupSuccess(newContactResponse));
    yield put(Actions.getContactGroupById(contactDetails.id));
    yield put(Actions.closeNewAssignContactDialog());
  } catch (err) {
    yield put(Actions.assignContactToGroupError(err));
  }
}

// Individual exports for testing
export default function* crmContactsSaga() {
  yield takeLatest(Constants.GET_ALL_CONTACTS, getContacts);
  yield takeLatest(Constants.ASSIGN_CONTACT_TO_GROUP, assignContactToGroup);
  yield takeLatest(Constants.GET_CONTACT_GROUP_BY_ID, getContactGroup);
  yield takeLatest(Constants.CREATE_NEW_CONTACT_GROUP, createNewContactGroup);
  yield takeLatest(Constants.UPDATE_CONTACT_GROUP, updateContactGroup);
  yield takeLatest(Constants.GET_ALL_CONTACTS_GROUP, getAllContactsGroup);
}
