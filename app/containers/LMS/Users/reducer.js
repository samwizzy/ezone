/*
 *
 * lmsStudents reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  students: [],
  studentDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const lmsStudentsReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_STUDENT_DIALOG: {
        return {
          ...state,
          studentDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_STUDENT_DIALOG: {
        return {
          ...state,
          studentDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_STUDENT_DIALOG: {
        return {
          ...state,
          studentDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_STUDENT_DIALOG: {
        return {
          ...state,
          studentDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_STUDENT: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_STUDENT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_STUDENT_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.UPDATE_STUDENT: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_STUDENT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_STUDENT_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_STUDENTS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_STUDENTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          students: action.payload,
        };
      }
      case Constants.GET_STUDENTS_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
    }
  });

export default lmsStudentsReducer;
