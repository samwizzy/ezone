/*
 *
 * EmailConfig reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  templates: [],
  error: {}
};

/* eslint-disable default-case, no-param-reassign */
const emailTemplateReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.GET_EMAIL_TEMPLATES: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_EMAIL_TEMPLATES_SUCCESS: {
        return {
          ...state,
          loading: false,
          templates: action.payload,
        };
      }
      case Constants.GET_EMAIL_TEMPLATES_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });


export default emailTemplateReducer;
