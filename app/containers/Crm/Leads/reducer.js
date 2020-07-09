/*
 *
 * Crm reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  leads: [],
  leadSources: [],
  leadTags: [],
  leadStages: [],
  message: false,
  loading: false,
  error: false,
  leadDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  leadSourceDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  leadTagDialog: {
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
      case Constants.OPEN_NEW_LEAD_DIALOG: {
        return {
          ...state,
          leadDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_LEAD_DIALOG: {
        return {
          ...state,
          leadDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_LEAD_DIALOG: {
        return {
          ...state,
          leadDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_LEAD_DIALOG: {
        return {
          ...state,
          leadDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_LEAD: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_LEAD_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
      case Constants.CREATE_LEAD_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
      case Constants.UPDATE_LEAD: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_LEAD_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
      case Constants.UPDATE_LEAD_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
      case Constants.GET_LEADS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_LEADS_SUCCESS: {
        return {
          ...state,
          loading: false,
          leads: action.payload,
        };
      }
      case Constants.GET_LEADS_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
      // LEAD SOURCES
      case Constants.OPEN_NEW_LEAD_SOURCE_DIALOG: {
        return {
          ...state,
          leadSourceDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_LEAD_SOURCE_DIALOG: {
        return {
          ...state,
          leadSourceDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_LEAD_SOURCE_DIALOG: {
        return {
          ...state,
          leadSourceDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_LEAD_SOURCE_DIALOG: {
        return {
          ...state,
          leadSourceDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_LEAD_SOURCE: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_LEAD_SOURCE_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
      case Constants.CREATE_LEAD_SOURCE_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
      case Constants.UPDATE_LEAD_SOURCE: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_LEAD_SOURCE_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
      case Constants.UPDATE_LEAD_SOURCE_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
      case Constants.GET_LEAD_SOURCES: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_LEAD_SOURCES_SUCCESS: {
        return {
          ...state,
          loading: false,
          leadSources: action.payload,
        };
      }
      case Constants.GET_LEAD_SOURCES_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
      // LEAD TAGS
      case Constants.OPEN_NEW_LEAD_TAG_DIALOG: {
        return {
          ...state,
          leadTagDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_LEAD_TAG_DIALOG: {
        return {
          ...state,
          leadTagDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_LEAD_TAG_DIALOG: {
        return {
          ...state,
          leadTagDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_LEAD_TAG_DIALOG: {
        return {
          ...state,
          leadTagDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_LEAD_TAG: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.CREATE_LEAD_TAG_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
      case Constants.CREATE_LEAD_TAG_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
      case Constants.UPDATE_LEAD_TAG: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.UPDATE_LEAD_TAG_SUCCESS: {
        return {
          ...state,
          loading: false,
        };
      }
      case Constants.UPDATE_LEAD_TAG_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
      case Constants.GET_LEAD_TAGS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_LEAD_TAGS_SUCCESS: {
        return {
          ...state,
          loading: false,
          leadTags: action.payload,
        };
      }
      case Constants.GET_LEAD_TAGS_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
    }
  });

export default crmReducer;
