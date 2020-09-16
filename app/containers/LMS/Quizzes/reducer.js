/*
 *
 * Companies reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  quizzes: [],
  quizDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const lmsQuizReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_QUIZ_DIALOG: {
        return {
          ...state,
          quizDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_QUIZ_DIALOG: {
        return {
          ...state,
          quizDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_QUIZ_DIALOG: {
        return {
          ...state,
          quizDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_QUIZ_DIALOG: {
        return {
          ...state,
          quizDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_QUIZ: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_QUIZ_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_QUIZ_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.UPDATE_QUIZ: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_QUIZ_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_QUIZ_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_QUIZZES: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_QUIZZES_SUCCESS: {
        return {
          ...state,
          loading: false,
          quizzes: action.payload,
        };
      }
      case Constants.GET_QUIZZES_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
    }
  });

export default lmsQuizReducer;
