/*
 *
 * Jobs reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  employees: [],
  customers: [],
  jobs: [],
  jobDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const jobsReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_JOB_DIALOG: {
        return {
          ...state,
          jobDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          }
        };
      }
      case Constants.CLOSE_NEW_JOB_DIALOG: {
        return {
          ...state,
          jobDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_JOB_DIALOG: {
        return {
          ...state,
          jobDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_JOB_DIALOG: {
        return {
          ...state,
          jobDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_JOB: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_JOB_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_JOB_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.UPDATE_JOB: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_JOB_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_JOB_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_JOBS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_JOBS_SUCCESS: {
        return {
          ...state,
          loading: false,
          jobs: action.payload,
        };
      }
      case Constants.GET_JOBS_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_CUSTOMERS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_CUSTOMERS_SUCCESS: {
        return {
          ...state,
          loading: false,
          customers: action.payload,
        };
      }
      case Constants.GET_CUSTOMERS_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }

      case Constants.GET_EMPLOYEES: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_EMPLOYEES_SUCCESS: {
        return {
          ...state,
          loading: false,
          employees: action.payload,
        };
      }
      case Constants.GET_EMPLOYEES_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
    }
  });

export default jobsReducer;
