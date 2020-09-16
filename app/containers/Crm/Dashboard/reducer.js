/*
 *
 * Crm reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  employees: [],
  contacts: [],
  companies: [],
  schedules: [],
  tasks: [],
  reminderDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const crmReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
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
          employees: action.payload
        };
      }
      case Constants.OPEN_SCHEDULE_REMINDER_DIALOG: {
        return {
          ...state,
          reminderDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          }
        };
      }
      case Constants.CLOSE_SCHEDULE_REMINDER_DIALOG: {
        return {
          ...state,
          reminderDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          }
        }
      }
      case Constants.GET_CONTACTS: {
        return {
          ...state,
          loading: true
        };
      }
      case Constants.GET_CONTACTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          contacts: action.payload
        }
      }
      case Constants.GET_CONTACTS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload
        }
      }
      case Constants.GET_COMPANIES: {
        return {
          ...state,
          loading: true
        };
      }
      case Constants.GET_COMPANIES_SUCCESS: {
        return {
          ...state,
          loading: false,
          companies: action.payload
        }
      }
      case Constants.GET_COMPANIES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload
        }
      }
      case Constants.GET_SCHEDULES: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_SCHEDULES_SUCCESS: {
        return {
          ...state,
          loading: false,
          schedules: action.payload
        };
      }
      case Constants.GET_SCHEDULES_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      }
      case Constants.GET_TASKS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_TASKS_SUCCESS: {
        return {
          ...state,
          loading: false,
          tasks: action.payload
        };
      }
      case Constants.GET_TASKS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      }
    }
  });

export default crmReducer;
