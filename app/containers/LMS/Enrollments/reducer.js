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
  enrollments: [],
  enrollment: null,
  enrollmentDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const lmsEnrollmentReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_ENROLLMENT_DIALOG: {
        return {
          ...state,
          enrollmentDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_ENROLLMENT_DIALOG: {
        return {
          ...state,
          enrollmentDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_ENROLLMENT_DIALOG: {
        return {
          ...state,
          enrollmentDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_ENROLLMENT_DIALOG: {
        return {
          ...state,
          enrollmentDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_ENROLLMENT: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_ENROLLMENT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_ENROLLMENT_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.UPDATE_ENROLLMENT: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_ENROLLMENT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_ENROLLMENT_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_ENROLLMENTS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_ENROLLMENTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          enrollments: action.payload,
        };
      }
      case Constants.GET_ENROLLMENTS_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
    }
  });

export default lmsEnrollmentReducer;
