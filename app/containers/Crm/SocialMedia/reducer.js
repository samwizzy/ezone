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
  employees: [],
  campaigns: [],
  campaignDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  campaignDetailsDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const crmCampaignReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_CAMPAIGN_DIALOG: {
        return {
          ...state,
          campaignDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          }
        };
      }
      case Constants.CLOSE_NEW_CAMPAIGN_DIALOG: {
        return {
          ...state,
          campaignDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_CAMPAIGN_DIALOG: {
        return {
          ...state,
          campaignDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_CAMPAIGN_DIALOG: {
        return {
          ...state,
          campaignDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_CAMPAIGN: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_CAMPAIGN_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_CAMPAIGN_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.UPDATE_CAMPAIGN: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_CAMPAIGN_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_CAMPAIGN_ERROR: {
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
      case Constants.GET_CAMPAIGNS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_CAMPAIGNS_SUCCESS: {
        return {
          ...state,
          loading: false,
          campaigns: action.payload,
        };
      }
      case Constants.GET_CAMPAIGNS_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
    }
  });

export default crmCampaignReducer;
