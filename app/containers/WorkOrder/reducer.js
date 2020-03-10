/*
 *
 * WorkOrderPage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';


export const initialState = {
  vendorPostData: false,
  savedItemData: false,
  getListOfVendorsData: false,
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
  itemDialog: {
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
      // Open dialog for workorder
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
            data: null,
          },
        };
      }

      // Open dialog for vendor
      case Constants.OPEN_VENDOR_DIALOG: {
        return {
          ...state,
          vendorDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
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

      // Open dialog for add item on workorder dialog
      case Constants.OPEN_ADDITEM_DIALOG: {
        console.log('OPEN_ADDITEM_DIALOG');
        return {
          ...state,
          itemDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }

      case Constants.CLOSE_ADDITEM_DIALOG: {
        console.log('CLOSE_ADDITEM_DIALOG');
        return {
          ...state,
          itemDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: action.payload,
          },
        };
      }

      case Constants.SAVE_ADDITEM_DIALOG_CONTENTS: {
        return {
          ...state,
          savedItemData: action.payload
        };
      }

      // Save vendor
      case Constants.SAVE_VENDOR_CONFIG: {
        return {
          ...state,
          loading: true,
          error: false,
          vendorPostData: action.payload
        };
      }
      case Constants.SAVE_VENDOR_CONFIG_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.SAVE_VENDOR_CONFIG_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Get a list of vendors
      case Constants.GET_ALL_VENDORS: {
        return {
          ...state,
          loading: true,
          error: false,
          getListOfVendorsData: action.payload,
        };
      }
      case Constants.GET_ALL_VENDORS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getListOfVendorsData: action.payload,
        };
      }
      case Constants.GET_ALL_VENDORS_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default workOrderPageReducer;
