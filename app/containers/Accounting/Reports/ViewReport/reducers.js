import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  generalJournal: [],
};

/* eslint-disable default-case, no-param-reassign */
const viewReportReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      // Case to get company journal
      case Constants.GET_GENERAL_JOURNAL_SUCCES_ACTION: {
        return {
          ...state,
          loading: true,
          error: false,
          generaljournal: action.payload,
        };
      }
      // error case
      case Constants.GET_GENERAL_JOURNAL_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });
export default viewReportReducer;
