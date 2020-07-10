/*
 *
 * AuthorizationPage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  message: '',
  loading: false,
  error: false,
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
        };
      }
      case Constants.SIGNUP_SUCCESS_REQUEST: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.SIGNUP_ERROR_REQUEST: {
        return {
          ...state,
          loading: false,
          error: true,
        };
      }
      case Constants.FORGOT_PASSWORD: {
        return {
          ...state,
          loading: true,
          error: false,
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
