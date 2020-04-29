/*
 *
 * Dashboard actions
 *
 */

import * as Constants from './constants';

export function getDashboardAnalytics() {
  return {
    type: Constants.GET_DASHBOARD_ANALYTICS,
  };
}
