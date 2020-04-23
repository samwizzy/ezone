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
        console.log("new contact groups reducer")
        return {
          ...state,
          contactGroupsDialog: {...state.contactGroupsDialog, props: { open: true} },
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
    }
  });

export default crmContactGroupsReducer;
