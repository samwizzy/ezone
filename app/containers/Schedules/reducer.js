/*
 *
 * schedule reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  employees: [],
  schedules: [],
  scheduleDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const scheduleReducer = (state = initialState, action) =>
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
      case Constants.UPDATE_SCHEDULE: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_SCHEDULE_SUCCESS: {
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
    }
  });

export default scheduleReducer;
