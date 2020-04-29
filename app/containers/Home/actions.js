/*
 *
 * Home Dashboard actions
 *
 */

import * as Constants from './constants';

export function getApplications() {
  return {
    type: Constants.GET_APPLICATIONS,
  };
}
