/*
 *
 * Backdrop reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const backdropReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_BACKDROP: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CLOSE_BACKDROP: {
        return {
          ...state,
          loading: false,
        };
      }
    }
  });


export default backdropReducer;
