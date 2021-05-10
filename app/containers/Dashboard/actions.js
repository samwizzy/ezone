import * as Constants from './constants';

export function getDashboardStats() {
  return {
    type: Constants.GET_DASHBOARD_STATS,
  };
}
export function getDashboardStatsSuccess(payload) {
  return {
    type: Constants.GET_DASHBOARD_STATS_SUCCESS,
    payload
  };
}
export function getDashboardStatsError(payload) {
  return {
    type: Constants.GET_DASHBOARD_STATS_ERROR,
    payload
  };
}
