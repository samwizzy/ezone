/*
 * HRReducer Leave Management
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import * as Constants from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  goals: [],
  goal: null,
  recognitions: [],
  recognition: null,
  feedbacks: [],
  reviews: [],
  employees: [],
  departments: [],
  branches: [],
  roles: [],
  goalsDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  recognitionDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  feedbackDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  reviewDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const performanceReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case Constants.GET_EMPLOYEES: {
        return {
          ...state,
          loading: true
        }
      }
      case Constants.GET_EMPLOYEES_SUCCESS: {
        return {
          ...state,
          loading: false,
          employees: action.payload
        }
      }
      case Constants.GET_DEPARTMENTS: {
        return {
          ...state,
          loading: true
        }
      }
      case Constants.GET_DEPARTMENTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          departments: action.payload
        }
      }
      case Constants.GET_BRANCHES: {
        return {
          ...state,
          loading: true
        }
      }
      case Constants.GET_BRANCHES_SUCCESS: {
        return {
          ...state,
          loading: false,
          branches: action.payload
        }
      }
      case Constants.GET_ROLES: {
        return {
          ...state,
          loading: true
        }
      }
      case Constants.GET_ROLES_SUCCESS: {
        return {
          ...state,
          loading: false,
          roles: action.payload
        }
      };
      case Constants.GET_LEAVE_REQUEST: {
        return {
          ...state,
          loading: true
        }
      }
      case Constants.GET_GOALS: {
        return {
          ...state,
          loading: true
        }
      }
      case Constants.GET_GOALS_SUCCESS: {
        return {
          ...state,
          loading: false,
          goals: action.payload
        }
      }
      case Constants.GET_GOALS_BY_ID: {
        return {
          ...state,
          loading: true
        }
      }
      case Constants.GET_GOALS_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          goal: action.payload
        }
      }
      case Constants.CREATE_GOALS: {
        return {
          ...state,
          loading: true,
        }
      }
      case Constants.CREATE_GOALS_SUCCESS: {
        return {
          ...state,
          loading: false,
        }
      }
      case Constants.GET_RECOGNITIONS: {
        return {
          ...state,
          loading: true
        }
      }
      case Constants.GET_RECOGNITIONS_SUCCESS: {
        return {
          ...state,
          loading: false,
          recognitions: action.payload
        }
      }
      case Constants.GET_RECOGNITION_BY_ID: {
        return {
          ...state,
          loading: true
        }
      }
      case Constants.GET_RECOGNITION_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          recognition: action.payload
        }
      }
      case Constants.CREATE_RECOGNITION: {
        return {
          ...state,
          loading: true,
        }
      }
      case Constants.CREATE_RECOGNITION_SUCCESS: {
        return {
          ...state,
          loading: false,
        }
      }
      case Constants.OPEN_NEW_GOALS_DIALOG: {
        return {
          ...state,
          goalsDialog: { ...state.goalsDialog, props: { open: true } },
        }
      }
      case Constants.CLOSE_NEW_GOALS_DIALOG: {
        return {
          ...state,
          goalsDialog: { ...state.goalsDialog, props: { open: false } },
        }
      }
      case Constants.OPEN_NEW_RECOGNITION_DIALOG: {
        return {
          ...state,
          recognitionDialog: { ...state.recognitionDialog, props: { open: true } },
        }
      }
      case Constants.CLOSE_NEW_RECOGNITION_DIALOG: {
        return {
          ...state,
          recognitionDialog: { ...state.recognitionDialog, props: { open: false } },
        }
      }
    }
  });

export default performanceReducer;
