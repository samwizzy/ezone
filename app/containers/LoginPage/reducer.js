/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  // loading: false,
  // error: false,
  // user: {},
  // loginDetails: {},
  // accessToken: {},
  // saveToken: {},
  // getSaveToken: {},
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    // switch (action.type) {
    //   case Constants.LOGIN: {
    //     return {
    //       loading: true,
    //       error: false,
    //       loginDetails: action.payload,
    //     };
    //   }
    //   case Constants.LOGIN_SUCCESS: {
    //     return {
    //       loading: false,
    //       error: false,
    //       user: action.payload,
    //     };
    //   }
    //   case Constants.LOGIN_ERROR: {
    //     return {
    //       loading: false,
    //       error: true,
    //     };
    //   }
    //   case Constants.SAVE_TOKEN: {
    //     localStorage.setItem('access_token', action.payload.access_token);
    //     localStorage.setItem('refresh_token', action.payload.refresh_token);
    //     return {
    //       saveToken: action.payload,
    //     };
    //   }
    //   case Constants.GET_SAVE_TOKEN: {
    //     // localStorage.getItem('access_token');
    //     // localStorage.setItem('refresh_token', action.payload.refresh_token);
    //     return {
    //       getSaveToken: action.payload,
    //     };
    //   }
    //   case Constants.GET_USER_PROFILE: {
    //     return {
    //       loading: false,
    //       error: true,
    //       accessToken: action.payload,
    //     };
    //   }
    // }
  });

export default loginPageReducer;
