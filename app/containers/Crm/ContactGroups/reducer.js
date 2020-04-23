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
  allContactsGroup: [],
  createNewContactGroup: {},
  updateContactGroup: {},
  contactGroupsDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  assignContactDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const crmContactGroupsReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_CONTACT_GROUPS_DIALOG: {
        return {
          ...state,
          // ...state.contactGroupsDialog,
          contactGroupsDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_CONTACT_GROUPS_DIALOG: {
        return {
          ...state,
          contactGroupsDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_ASSIGN_CONTACT_DIALOG: {
        return {
          ...state,
          assignContactDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_ASSIGN_CONTACT_DIALOG: {
        return {
          ...state,
          assignContactDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_NEW_CONTACT_GROUP: {
        return {
          ...state,
          loading: true,
          createNewContactGroup: action.payload,
        };
      }
      case Constants.CREATE_NEW_CONTACT_GROUP_SUCCESS: {
        return {
          ...state,
          loading: false,
          // createNewContact: action.payload,
        };
      }
      case Constants.CREATE_NEW_CONTACT_GROUP_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
      case Constants.UPDATE_CONTACT_GROUP: {
        return {
          ...state,
          loading: true,
          updateContactGroup: action.payload,
        };
      }
      case Constants.UPDATE_CONTACT_GROUP_SUCCESS: {
        return {
          ...state,
          loading: false,
          // createNewContact: action.payload,
        };
      }
      case Constants.UPDATE_CONTACT_GROUP_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
      case Constants.GET_ALL_CONTACTS_GROUP: {
        return {
          ...state,
          loading: true,
        };
      }
      case Constants.GET_ALL_CONTACTS_GROUP_SUCCESS: {
        return {
          ...state,
          loading: false,
          allContactsGroup: action.payload,
        };
      }
      case Constants.GET_ALL_CONTACTS_GROUP_ERROR: {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      }
    }
  });

export default crmContactGroupsReducer;
