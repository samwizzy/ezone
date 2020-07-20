/*
 *
 * UtilityPage chats reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: { success: '', message: '' },
  employees: [],
  employee: null,
  postFcmToken: false,
  postMsg: false,
  getPostMsg: false,
  getAllUserChatData: false,
  getUserChatData: [],
  getAllUsersChat: [],
  getAllEmployees: [],
};

/* eslint-disable default-case, no-param-reassign */
const utilityPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Constants.GET_EMPLOYEES: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_EMPLOYEES_SUCCESS: {
        return {
          ...state,
          loading: false,
          employees: action.payload,
        };
      }
      case Constants.GET_EMPLOYEES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_USER_BY_UUID: {
        return {
          ...state,
          loading: false,
        };
      }
      case Constants.GET_USER_BY_UUID_SUCCESS: {
        return {
          ...state,
          loading: false,
          employee: action.payload
        };
      }
      case Constants.GET_USER_BY_UUID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      }
      case Constants.GET_ALL_USERS_CHAT: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_USERS_CHAT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getAllUsersChat: action.payload,
        };
      }
      case Constants.GET_ALL_USERS_CHAT_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_USER_CHAT_DATA: {
        return {
          ...state,
          loading: true,
          error: false,
          getUserChatData: action.payload,
        };
      }
      case Constants.GET_USER_CHAT_DATA_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getAllUserChatData: action.payload,
        };
      }
      case Constants.GET_USER_CHAT_DATA_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.POST_MSG: {
        return {
          ...state,
          loading: true,
          error: false,
          postMsg: action.payload,
        };
      }
      case Constants.POST_MSG_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getPostMsg: action.payload,
        };
      }
      case Constants.POST_MSG_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.RESET_POST_MSG: {
        return {
          getPostMsg: false,
        };
      }
      case Constants.POST_FCM_TOKEN: {
        return {
          ...state,
          loading: true,
          error: false,
          postFcmToken: action.payload,
        };
      }
      case Constants.POST_FCM_TOKEN_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getPostMsg: action.payload,
        };
      }
      case Constants.POST_FCM_TOKEN_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default utilityPageReducer;
