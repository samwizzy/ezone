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
  message: false,
  getAllCrmActivites: [],
  activitiesDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const crmActivitiesReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_ACTIVITIES_DIALOG: {
        return {
          ...state,
          activitiesDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_ACTIVITIES_DIALOG: {
        return {
          ...state,
          activitiesDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.GET_ALL_CRM_ACTIVITIES: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_ALL_CRM_ACTIVITIES_SUCCESS: {
        return {
          ...state,
          loading: false,
          getAllCrmActivites: action.payload,
        };
      }
      case Constants.GET_ALL_CRM_ACTIVITIES_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          message: action.payload,
        };
      }
      case Constants.CREATE_CRM_ACTIVITY: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_CRM_ACTIVITY_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
      case Constants.CREATE_CRM_ACTIVITY_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          message: action.payload,
        };
      }
    }
  });

export default crmActivitiesReducer;
