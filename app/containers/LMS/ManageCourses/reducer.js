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
  courses: [],
  assignments: [],
  lectures: [],
  assignmentDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  lectureDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const lmsCoursesReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_ASSIGNMENT_DIALOG: {
        return {
          ...state,
          assignmentDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_NEW_ASSIGNMENT_DIALOG: {
        return {
          ...state,
          assignmentDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_NEW_LECTURE_DIALOG: {
        return {
          ...state,
          lectureDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_NEW_LECTURE_DIALOG: {
        return {
          ...state,
          lectureDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_ASSIGNMENT: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_ASSIGNMENT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_ASSIGNMENT_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.UPDATE_ASSIGNMENT: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_ASSIGNMENT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_ASSIGNMENT_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_ASSIGNMENTS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_ASSIGNMENTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          assignments: action.payload,
        };
      }
      case Constants.GET_ASSIGNMENTS_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.CREATE_LECTURE: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_LECTURE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_LECTURE_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.UPDATE_LECTURE: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_LECTURE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_LECTURE_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_LECTURES: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_LECTURES_SUCCESS: {
        return {
          ...state,
          loading: false,
          assignments: action.payload,
        };
      }
      case Constants.GET_LECTURES_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
    }
  });

export default lmsCoursesReducer;
