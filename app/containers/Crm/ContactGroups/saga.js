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
    yield put(Actions.closeEditContactDialog());
  } catch (err) {
    yield put(Actions.createNewContactGroupError(err));
  }
}

// Individual exports for testing
export default function* crmContactsSaga() {
  yield takeLatest(Constants.CREATE_NEW_CONTACT_GROUP, createNewContactGroup);
  yield takeLatest(Constants.UPDATE_CONTACT_GROUP, updateContactGroup);
  yield takeLatest(Constants.GET_ALL_CONTACTS_GROUP, getAllContactsGroup);
}
