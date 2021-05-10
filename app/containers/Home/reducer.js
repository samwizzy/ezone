import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  applications: [],
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.GET_APPLICATIONS: {
        return {
          ...state,
          laoding: true,
        };
      }
      case Constants.GET_APPLICATIONS_SUCCESS: {
        console.log(action.payload, '..entering action.payload');
        return {
          ...state,
          applications: action.payload,
        };
      }
      case Constants.GET_APPLICATIONS_ERROR: {
        return {
          ...state,
          loading: false,
        };
      }
    }
  });

export default homeReducer;
