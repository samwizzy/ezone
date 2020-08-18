/*
 *
 * LMS Virtual Classrooms reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  classrooms: [],
  classroomDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const lmsClassroomsReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_CLASSROOM_DIALOG: {
        return {
          ...state,
          classroomDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_CLASSROOM_DIALOG: {
        return {
          ...state,
          classroomDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_CLASSROOM_DIALOG: {
        return {
          ...state,
          classroomDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_CLASSROOM_DIALOG: {
        return {
          ...state,
          classroomDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_CLASSROOM: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_CLASSROOM_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_CLASSROOM_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.UPDATE_CLASSROOM: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_CLASSROOM_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_CLASSROOM_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_CLASSROOMS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_CLASSROOMS_SUCCESS: {
        return {
          ...state,
          loading: false,
          classrooms: action.payload,
        };
      }
      case Constants.GET_CLASSROOMS_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
    }
  });

export default lmsClassroomsReducer;
