/*
 *
 * EmailConfig reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  emailConfigData: false,
  emailConfigPostData: false,
  testConnectionData: false,
  smsProviderData: false,
  smsConfigData: false,
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const emailConfigReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {

      // Case to get email config
      case Constants.GET_EMAIL_CONFIG: {
        return {
          ...state,
          loading: true,
          error: false,
          emailConfigData: action.payload,
        };
      }
      case Constants.GET_EMAIL_CONFIG_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          emailConfigData: action.payload,
        };
      }
      case Constants.GET_EMAIL_CONFIG_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to set/update email config
      case Constants.UPDATE_EMAIL_CONFIG: {
        return {
          ...state,
          loading: true,
          error: false,
          emailConfigPostData: action.payload
        };
      }

      case Constants.UPDATE_EMAIL_CONFIG_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          emailConfigPostData: action.payload
        };
      }

      case Constants.UPDATE_EMAIL_CONFIG_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to test email connection
      case Constants.TEST_EMAIL_CONNECTION: {
        return {
          ...state,
          loading: true,
          error: false,
          testConnectionData: action.payload
        };
      }

      case Constants.TEST_EMAIL_CONNECTION_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          testConnectionData: action.payload
        };
      }

      case Constants.TEST_EMAIL_CONNECTION_ERR: {
        return {
          ...state,
          loading: false,
          testConnectionData: action.payload,
        };
      }

      // Case to get sms providers
      case Constants.GET_SMS_PROVIDER: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }

      case Constants.GET_SMS_PROVIDER_SUCCESS: {
        console.log("GET_SMS_PROVIDER_SUCCESS action.payload: ", action.payload)
        return {
          ...state,
          loading: false,
          error: false,
          smsProviderData: action.payload,
        };
      }

      case Constants.GET_SMS_PROVIDER_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Case to get sms config
      case Constants.GET_SMS_CONFIG: {
        return {
          ...state,
          loading: true,
          error: false,
          smsConfigData: action.payload,
        };
      }

      case Constants.GET_SMS_CONFIG_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          smsConfigData: action.payload,
        };
      }

      case Constants.GET_SMS_CONFIG_ERR: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }

    }
  });


export default emailConfigReducer;
