/*
 *
 * LMS Course Category reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  categories: [],
  loading: false,
  error: false,
  categoryDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const lmsCategoriesReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_CATEGORY_DIALOG: {
        console.log("I am the dialog in reducer")
        return {
          ...state,
          categoryDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_CATEGORY_DIALOG: {
        return {
          ...state,
          categoryDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_CATEGORY_DIALOG: {
        return {
          ...state,
          categoryDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_CATEGORY_DIALOG: {
        return {
          ...state,
          categoryDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_CATEGORY: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_CATEGORY_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
      case Constants.CREATE_CATEGORY_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
      case Constants.UPDATE_CATEGORY: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_CATEGORY_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
      case Constants.UPDATE_CATEGORY_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
      case Constants.GET_CATEGORIES: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_CATEGORIES_SUCCESS: {
        return {
          ...state,
          loading: false,
          categories: action.payload,
        };
      }
      case Constants.GET_CATEGORIES_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
    }
  });

export default lmsCategoriesReducer;
