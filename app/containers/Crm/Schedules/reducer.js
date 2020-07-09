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
  schedules: [],
  scheduleDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  participantDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const crmScheduleReducer = (state = initialState, action) =>
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
      case Constants.GET_CONTACTS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_CONTACTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          contacts: action.payload
        };
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
      case Constants.CREATE_SCHEDULE: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_SCHEDULE_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
      case Constants.OPEN_NEW_SCHEDULE_DIALOG: {
        return {
          ...state,
          scheduleDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_SCHEDULE_DIALOG: {
        return {
          ...state,
          scheduleDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_NEW_PARTICIPANT_DIALOG: {
        return {
          ...state,
          participantDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_PARTICIPANT_DIALOG: {
        return {
          ...state,
          participantDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
    }
  });

export default crmScheduleReducer;
