import produce from 'immer';
import history from '../../utils/history'
import * as Constants from './constants';
import moment from 'moment';

const getToken = () => {
  const expiresIn = localStorage.getItem('expires_in');
  const accessToken = localStorage.getItem('access_token');
  if (
    accessToken(
      !expiresIn || moment.unix(Number(expiresIn)).diff(moment(), 'minute') > 1,
    )
  ) {
    return accessToken;
  }
  return refreshToken();
}

let userActive;
if (!JSON.parse(localStorage.getItem('user'))) {
  userActive = false;
} else {
  userActive = JSON.parse(localStorage.getItem('user'));
}

let userToken;
if (!localStorage.getItem('access_token')) {
  userToken = false;
} else {
  userToken = localStorage.getItem('access_token');
}

export const initialState = {
  loading: false,
  error: false,
  // user: userActive,
  user: userActive,
  loginDetails: {},
  // accessToken: false,
  accessToken: userToken,
  saveToken: false,
  getSaveToken: {},
  messageDialog: {
    data: { open: false, message: false, status: false },
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.LOGIN: {
        return {
          loading: true,
          error: false,
          loginDetails: action.payload,
        };
      }
      case Constants.LOGIN_SUCCESS: {
        return {
          loading: false,
          error: false,
          // user: action.payload,
        };
      }
      case Constants.LOGIN_ERROR: {
        return {
          loading: false,
          error: true,
        };
      }
      case Constants.GET_USER_PROFILE: {
        localStorage.setItem('access_token', action.payload.access_token);
        localStorage.setItem('refresh_token', action.payload.refresh_token);
        localStorage.setItem('expires_in', action.payload.expires_in);
        return {
          loading: true,
          error: false,
          accessToken: localStorage.getItem('access_token'),
        };
      }
      case Constants.GET_USER_PROFILE_SUCCESS: {
        localStorage.setItem('user', JSON.stringify(action.payload));
        return {
          loading: false,
          error: false,
          user: JSON.parse(localStorage.getItem('user')),
          accessToken: localStorage.getItem('access_token'),
        };
      }
      case Constants.GET_USER_PROFILE_ERROR: {
        return {
          loading: false,
          error: action.payload,
        };
      }
      case Constants.OPEN_SNACKBAR: {
        return {
          messageDialog: {
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_SNACKBAR: {
        return {
          messageDialog: {
            data: { open: false },
          },
        };
      }
      case Constants.LOG_OUT: {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_in');

        // history.push({
        //   pathname: '/login'
        // })

        return {};
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
        localStorage.setItem('access_token', action.payload.access_token);
        localStorage.setItem('refresh_token', action.payload.refresh_token);
        localStorage.setItem('expires_in', action.payload.expires_in);
        return {
          ...state,
          loading: false,
          error: false,
          message: action.payload,
        };
      }
      case Constants.REFRESH_TOKEN_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          message: action.payload,
        };
      }
    }
  });

export default appReducer;
