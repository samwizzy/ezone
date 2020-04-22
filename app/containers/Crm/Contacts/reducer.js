/*
 *
 * Crm reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  allContacts: [],
  message: false,
  loading: false,
  error: false,
  createNewContact: {},
  updateContact: {},
  contactDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  contactDetailsDialog: {
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
      case Constants.OPEN_NEW_CONTACT_DIALOG: {
        return {
          ...state,
          contactDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_CONTACT_DIALOG: {
        return {
          ...state,
          contactDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_CONTACT_DIALOG: {
        return {
          ...state,
          contactDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_CONTACT_DIALOG: {
        return {
          ...state,
          contactDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_NEW_CONTACT_DETAILS_DIALOG: {
        return {
          ...state,
          contactDetailsDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_NEW_CONTACT_DETAILS_DIALOG: {
        return {
          ...state,
          contactDetailsDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_NEW_CONTACT: {
        return {
          ...state,
          loading: true,
          createNewContact: action.payload,
        };
      }
      case Constants.CREATE_NEW_CONTACT_SUCCESS: {
        return {
          ...state,
          loading: false,
          // createNewContact: action.payload,
        };
      }
      case Constants.CREATE_NEW_CONTACT_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
      case Constants.UPDATE_CONTACT: {
        return {
          ...state,
          loading: true,
          updateContact: action.payload,
        };
      }
      case Constants.UPDATE_CONTACT_SUCCESS: {
        return {
          ...state,
          loading: false,
          // createNewContact: action.payload,
        };
      }
      case Constants.UPDATE_CONTACT_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
      case Constants.GET_ALL_CONTACTS: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_ALL_CONTACTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          allContacts: action.payload,
        };
      }
      case Constants.GET_ALL_CONTACTS_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
    }
  });

export default crmReducer;
