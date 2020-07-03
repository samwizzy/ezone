/*
 *
 * EmailTemplates actions
 *
 */

import * as Constants from './constants';


// Get email configuration details
export function getEmailTemplates() {
  return {
    type: Constants.GET_EMAIL_TEMPLATES,
  };
}

export function getEmailTemplatesSuccess(data) {
  return {
    type: Constants.GET_EMAIL_TEMPLATES_SUCCESS,
    payload: data,
  };
}

export function getEmailTemplatesError(data) {
  return {
    type: Constants.GET_EMAIL_TEMPLATES_ERR,
    payload: data,
  };
}
