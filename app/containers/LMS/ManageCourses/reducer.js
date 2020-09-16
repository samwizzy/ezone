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
  categories: [],
  courses: [],
  course: null,
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
  courseVideoDialog: {
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
      case Constants.OPEN_NEW_COURSE_VIDEO_DIALOG: {
        return {
          ...state,
          courseVideoDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_NEW_COURSE_VIDEO_DIALOG: {
        return {
          ...state,
          courseVideoDialog: {
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

      // Lectures 
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

      // Courses 
      case Constants.CREATE_COURSE: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_COURSE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_COURSE_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.UPDATE_COURSE: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_COURSE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_COURSE_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.UPLOAD_COURSE_PREVIEW: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPLOAD_COURSE_PREVIEW_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPLOAD_COURSE_PREVIEW_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.DELETE_COURSE: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.DELETE_COURSE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.DELETE_COURSE_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_COURSES: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_COURSES_SUCCESS: {
        return {
          ...state,
          loading: false,
          courses: action.payload,
        };
      }
      case Constants.GET_COURSES_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_COURSE_BY_ID: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_COURSE_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          course: action.payload,
        };
      }
      case Constants.GET_COURSE_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.ADD_COURSE_VIDEO: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.ADD_COURSE_VIDEO_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.ADD_COURSE_VIDEO_ERROR: {
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
