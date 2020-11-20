/*
 *
 * Process owners reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  employees: [],
  processOwners: [],
  processOwnerDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const processOwnersReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_JOB_DIALOG: {
        return {
          ...state,
          processOwnerDialog: {
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
          processOwnerDialog: {
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
          processOwnerDialog: {
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
          processOwnerDialog: {
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
          processOwners: action.payload,
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
    }
  });

export default processOwnersReducer;
