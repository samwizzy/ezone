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

    console.log(response, "response employees")

    yield put(Actions.getEmployeesSuccess(response));
  } catch (err) {
    // yield put(Actions.getUtilityEmployeesError(err));
  }
}

export function* getUserByUUID({ type, payload }) {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const requestURL = `${Endpoints.GetUserByUUIDApi}/${payload}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'userResponse');

    yield put(Actions.getUserByUUIDSuccess(response));
  } catch (err) {
    // yield put(Actions.getUserByUUIDError(err));
    // console.error(err, 'I got the error');
  }
}

export function* getUserChat() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const requestURL = `${Endpoints.GetUserChatApi}?userUid=${currentUser && currentUser.uuId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response');

    yield put(Actions.getAllUsersChatSuccess(response));
  } catch (err) {
    yield put(Actions.getAllUsersChatError(err));
  }
}

export function* getUserChatData() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const userChatDetails = yield select(Selectors.makeSelectGetUserChatData());
  const requestURL = `${Endpoints.GetUserChatDataApi}?chatId=${userChatDetails.chatId}&limit=${10}&start=${0}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'response');

    yield put(Actions.getUserChatDataSuccess(response));
  } catch (err) {
    yield put(Actions.getUserChatDataError(err));
  }
}

export function* postMsg() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  // const userChatDetails = yield select(Selectors.makeSelectGetUserChatData());
  // const currentUser = yield select(AppSelectors.makeSelectCurrentUser());

  // console.log(currentUser, 'currentUser');

  const userChatData = yield select(Selectors.makeSelectGetUserChatData());
  const postMsgDetails = yield select(Selectors.makeSelectPostMsg());
  postMsgDetails.recipientId = userChatData.responder;
  postMsgDetails.recipientName = userChatData.responderName;
  postMsgDetails.senderId = userChatData.initiator;
  postMsgDetails.senderName = userChatData.initiatorName;

  console.log(postMsgDetails, 'postMsgDetails');

  // console.log(userChatDetails, 'lunch this in userChatDetails');
  console.log(userChatData, 'userChatData');

  const requestURL = `${Endpoints.SendMessageApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(postMsgDetails),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    console.log(response, 'postMsgResponse');

    // yield put(Actions.getUserChatData(userChatDetails));
    yield put(Actions.postMsgSuccess(response));
  } catch (err) {
    yield put(Actions.postMsgError(err));
  }
}

export function* postFcmToken() {
  const accessToken = yield select(AppSelectors.makeSelectAccessToken());
  const currentUser = yield select(AppSelectors.makeSelectCurrentUser());
  const fcmData = yield select(Selectors.makeSelectPostFcmToken());
  fcmData.userUuid = currentUser.uuId;

  // console.log(fcmData, 'fcmData');

  // console.log(userChatDetails, 'lunch this in userChatDetails');
  // console.log(userChatData, 'userChatData');

  const requestURL = `${Endpoints.SendFcmDataApi}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(fcmData),
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }),
    });

    // console.log(response, 'postMsgResponse');

    // yield put(Actions.getUserChatData(userChatDetails));
    yield put(Actions.postFcmTokenSuccess(response));
  } catch (err) {
    yield put(Actions.postFcmTokenError(err));
  }
}

// Individual exports for testing
export default function* UtilityPageSaga() {
  yield takeLatest(Constants.GET_EMPLOYEES, getEmployees);
  yield takeLatest(Constants.GET_USER_BY_UUID, getUserByUUID);
  yield takeLatest(Constants.GET_ALL_USERS_CHAT, getUserChat);
  yield takeLatest(Constants.GET_USER_CHAT_DATA, getUserChatData);
  yield takeLatest(Constants.POST_MSG, postMsg);
  yield takeLatest(Constants.POST_FCM_TOKEN, postFcmToken);
}
