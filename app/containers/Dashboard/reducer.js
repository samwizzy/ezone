import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  stats: null,
  error: null
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.GET_DASHBOARD_STATS: {
        return {
          ...state,
          loading: true
        };
      }
      case Constants.GET_DASHBOARD_STATS_SUCCESS: {
        return {
          ...state,
          loading: false,
          stats: action.payload
        };
      }
      case Constants.GET_DASHBOARD_STATS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      }
    }
  });

export default dashboardReducer;
