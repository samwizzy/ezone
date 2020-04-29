/*
 *
 * Home reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';
export const initialState = {
  applications: []
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.GET_APPLICATIONS: {
        return {
          ...state,
          applications: action.payload
        };
      }
    }
  });

export default homeReducer;
