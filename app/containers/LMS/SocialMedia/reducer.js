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
  socialMedias: [],
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
      case Constants.CREATE_SOCIAL_MEDIA: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_SOCIAL_MEDIA_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_SOCIAL_MEDIA_ERROR: {
        return {
          ...state,
          loading: false,
          error: true,
          messages: action.payload,
        };
      }
      case Constants.UPDATE_SOCIAL_MEDIA: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_SOCIAL_MEDIA_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_SOCIAL_MEDIA_ERROR: {
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
      case Constants.GET_SOCIAL_MEDIAS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_SOCIAL_MEDIAS_SUCCESS: {
        return {
          ...state,
          loading: false,
          socialMedias: action.payload,
        };
      }
      case Constants.GET_SOCIAL_MEDIAS_ERROR: {
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
