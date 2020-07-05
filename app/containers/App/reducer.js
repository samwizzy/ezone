import produce from 'immer';
import history from '../../utils/history'
import * as Constants from './constants';
import moment from 'moment';

let currentUser;
if (!JSON.parse(localStorage.getItem('user'))) {
  currentUser = null;
} else {
  currentUser = JSON.parse(localStorage.getItem('user'));
}

export const initialState = {
  loading: false,
  error: false,
  user: currentUser,
  accessToken: localStorage.getItem('access_token'),
  messageDialog: {
    open: false, message: "", status: "info"
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.LOGIN: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.LOGIN_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          accessToken: action.payload,
        };
      }
      case Constants.LOGIN_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
        };
      }
      case Constants.GET_USER_PROFILE: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_USER_PROFILE_SUCCESS: {
        localStorage.setItem('user', JSON.stringify(action.payload));
        return {
          ...state,
          loading: false,
          error: false,
          user: action.payload,
        };
      }
      case Constants.GET_USER_PROFILE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.OPEN_SNACKBAR: {
        return {
          ...state,
          messageDialog: { open: true, ...action.payload },
        };
      }
      case Constants.CLOSE_SNACKBAR: {
        return {
          ...state,
          messageDialog: { ...state.messageDialog, open: false, message: "" },
        };
      }
      case Constants.LOG_OUT: {
        return {
          ...state,
          loading: false,
          user: false,
          accessToken: false
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
      case Constants.REFRESH_TOKEN: {
        console.log('reduce come here');
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.REFRESH_TOKEN_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          accessToken: action.payload,
        };
      }
      case Constants.REFRESH_TOKEN_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
        };
      }
    }
  });

export default appReducer;
