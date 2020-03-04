/*
 *
 * WorkOrderPage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';


export const initialState = {
  loading: false,
  error: false,
  workOrderDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  vendorDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const workOrderPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_WORKORDER_DIALOG: {
        return {
          ...state,
          workOrderDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }

      case Constants.CLOSE_NEW_WORKORDER_DIALOG: {
        return {
          ...state,
          workOrderDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }
      
      case Constants.OPEN_VENDOR_DIALOG: {
        console.log('openVendorDialog reducer');
        return {
          ...state,
          vendorDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }

      case Constants.CLOSE_VENDOR_DIALOG: {
        return {
          ...state,
          vendorDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

    }
  });

export default workOrderPageReducer;
