/*
 *
 * AuthorizationPage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  message: '',
  forgotPassword: {},
  signupReqData: '',
  loading: false,
  error: false,
  signupResData: '',
};

/* eslint-disable default-case, no-param-reassign */
const authorizationPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.SIGNUP_REQUEST: {
        return {
          ...state,
          loading: true,
          error: false,
          signupReqData: action.payload,
        };
      }
      case Constants.SIGNUP_SUCCESS_REQUEST: {
        return {
          ...state,
          loading: false,
          error: false,
          signupResData: action.payload,
        };
      }
      case Constants.SIGNUP_ERROR_REQUEST: {
        return {
          ...state,
          loading: false,
          error: true,
          signupResData: action.payload,
        };
      }
      case Constants.FORGOT_PASSWORD: {
        console.log(action.payload, 'action.payload');
        return {
          ...state,
          loading: true,
          error: false,
          forgotPassword: action.payload,
        };
      }
      case Constants.FORGOT_PASSWORD_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          message: action.payload,
        };
      }
      case Constants.FORGOT_PASSWORD_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          message: action.payload,
        };
      }
    }
  });

export default authorizationPageReducer;
