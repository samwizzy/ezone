/*
 *
 * EmailConfig actions
 *
 */

import * as Constants from './constants';


// Get email configuration details
export function getEmailConfigAction() {
  return {
    type: Constants.GET_EMAIL_CONFIG,
  };
}

export function getEmailConfigSuccessAction(data) {
  return {
    type: Constants.GET_EMAIL_CONFIG_SUCCESS,
    payload: data,
  };
}

export function getEmailConfigErrorAction(data) {
  return {
    type: Constants.GET_EMAIL_CONFIG_ERR,
    payload: data,
  };
}


// Set email configuration details
export function updateEmailConfigAction(data) {
  return {
    type: Constants.UPDATE_EMAIL_CONFIG,
    payload: data,
  };
}

export function updateEmailConfigSuccessAction(data) {
  return {
    type: Constants.UPDATE_EMAIL_CONFIG_SUCCESS,
    payload: data,
  };
}

export function updateEmailConfigErrorAction(data) {
  return {
    type: Constants.UPDATE_EMAIL_CONFIG_ERR,
    payload: data,
  };
}


// Test connection details
export function testEmailConnectionAction(data) {
  return {
    type: Constants.TEST_EMAIL_CONNECTION,
    payload: data,
  };
}

export function testEmailConnectionSuccessAction(data) {
  return {
    type: Constants.TEST_EMAIL_CONNECTION_SUCCESS,
    payload: data,
  };
}

export function testEmailConnectionErrorAction(data) {
  return {
    type: Constants.TEST_EMAIL_CONNECTION_ERR,
    payload: data,
  };
}

// Get sms provider 
export function getSmsProviderAction() {
  return {
    type: Constants.GET_SMS_PROVIDER,
  };
}

export function getSmsProviderSuccessAction(data) {
  return {
    type: Constants.GET_SMS_PROVIDER_SUCCESS,
    payload: data,
  };
}

export function getSmsProviderErrorAction(data) {
  return {
    type: Constants.GET_SMS_PROVIDER_ERR,
    payload: data,
  };
}

// Get sms configuration 
export function getSmsConfigAction() {
  return {
    type: Constants.GET_SMS_CONFIG,
  };
}

export function getSmsConfigSuccessAction(data) {
  return {
    type: Constants.GET_SMS_CONFIG_SUCCESS,
    payload: data,
  };
}

export function getSmsConfigErrorAction(data) {
  return {
    type: Constants.GET_SMS_CONFIG_ERR,
    payload: data,
  };
}

// Create sms configuration 
export function createSmsConfigAction(data) {
  return {
    type: Constants.CREATE_SMS_CONFIG,
    payload: data,
  };
}

export function createSmsConfigSuccessAction(data) {
  return {
    type: Constants.CREATE_SMS_CONFIG_SUCCESS,
    payload: data,
  };
}

export function createSmsConfigErrorAction(data) {
  return {
    type: Constants.CREATE_SMS_CONFIG_ERR,
    payload: data,
  };
}


// Open/Close test connection dialog
export function openTestConnectionDialog() {
  console.log('openTestConnectionDialog triggered');
  return {
    type: Constants.OPEN_TEST_CONNECTION_DIALOG,
  };
}

export function closeTestConnectionDialog() {
  return {
    type: Constants.CLOSE_TEST_CONNECTION_DIALOG,
  };
}