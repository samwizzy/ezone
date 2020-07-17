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
  facebook: [],
  socialMediaDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  socialMediaDetailsDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const crmSocialMediaReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_SOCIAL_MEDIA_DIALOG: {
        return {
          ...state,
          socialMediaDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          }
        };
      }
      case Constants.CLOSE_NEW_SOCIAL_MEDIA_DIALOG: {
        return {
          ...state,
          socialMediaDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_SOCIAL_MEDIA_DIALOG: {
        return {
          ...state,
          socialMediaDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_SOCIAL_MEDIA_DIALOG: {
        return {
          ...state,
          socialMediaDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
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
      case Constants.GET_FACEBOOK_ACCESS_TOKEN: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_FACEBOOK_ACCESS_TOKEN_SUCCESS: {
        return {
          ...state,
          loading: false,
          facebook: action.payload,
        };
      }
      case Constants.GET_FACEBOOK_ACCESS_TOKEN_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GENERATE_FACEBOOK_AUTHORISE_URL: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GENERATE_FACEBOOK_AUTHORISE_URL_SUCCESS: {
        return {
          ...state,
          loading: false,
          facebook: action.payload,
        };
      }
      case Constants.GENERATE_FACEBOOK_AUTHORISE_URL_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.GET_USER_DATA: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_USER_DATA_SUCCESS: {
        return {
          ...state,
          loading: false,
          facebook: action.payload,
        };
      }
      case Constants.GET_USER_DATA_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
    }
  });

export default crmSocialMediaReducer;
