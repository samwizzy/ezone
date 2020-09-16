/*
 *
 * Content Management reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  contents: [],
  contentDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const lmsContentMgtReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_CONTENT_DIALOG: {
        return {
          ...state,
          contentDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_NEW_CONTENT_DIALOG: {
        return {
          ...state,
          contentDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_CONTENT: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_CONTENT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_CONTENT_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.UPDATE_CONTENT: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_CONTENT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_CONTENT_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_CONTENTS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_CONTENTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          contents: action.payload,
        };
      }
      case Constants.GET_CONTENTS_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
    }
  });

export default lmsContentMgtReducer;
