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
      open: true,
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
      case Constants.OPEN_NEW_CONTACT_DETAILS_DIALOG: {
        return {
          ...state,
          contactDetailsDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
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
    }
  });

export default crmReducer;
