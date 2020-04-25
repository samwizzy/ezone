/*
 *
 * Home reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';
export const initialState = {
  dashboard: []
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.GET_DASHBOARD_ANALYTICS: {
        return {
          ...state,
          dashboard: action.payload
        };
      }
    }
  });

export default homeReducer;
