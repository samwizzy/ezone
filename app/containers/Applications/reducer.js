/*
 *
 * Home reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';
export const initialState = {
  applications: [],
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const applicationsReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.GET_APPLICATIONS: {
        return {
          ...state,
        };
      }
      case Constants.GET_APPLICATIONS_SUCCESS: {
        return {
          ...state,
          applications: action.payload,
        };
      }
      case Constants.GET_APPLICATIONS_ERROR: {
        return {
          ...state,
          error: action.payload,
        };
      }
    }
  });

export default applicationsReducer;
