/*
 *
 * WorkOrderPage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  workOrderPostData: false,
  savedItemStore: [],
  vendorPostData: false,
  savedItemData: false,
  getListOfVendorsData: [],
  getListOfWorkOrderData: [],
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
            data: null,
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

      // Edit dialog for workorder
      case Constants.EDIT_OPEN_WORKORDER_DIALOG: {
        return {
          ...state,
          workOrderDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.EDIT_CLOSE_WORKORDER_DIALOG: {
        return {
          ...state,
          workOrderDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: action.payload,
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
            data: null,
          },
        };
      }

      // Open dialog for add item on workorder dialog
      case Constants.OPEN_ADDITEM_DIALOG: {
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
          savedItemData: action.payload,
        };
      }

      // Save vendor
      case Constants.SAVE_VENDOR_CONFIG: {
        return {
          ...state,
          loading: true,
          error: false,
          vendorPostData: action.payload,
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

      // Create workorder
      case Constants.SAVE_WORKORDER: {
        return {
          ...state,
          loading: true,
          error: false,
          workOrderPostData: action.payload
        };
      }

      case Constants.SAVE_WORKORDER_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.SAVE_WORKORDER_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Update/Edit workorder
      case Constants.UPDATE_WORKORDER: {
        return {
          ...state,
          loading: true,
          error: false,
          workOrderPostData: action.payload
        };
      }
      case Constants.UPDATE_WORKORDER_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_WORKORDER_ERR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }

      // Delete workorder
      case Constants.DELETE_WORKORDER: {
        return {
          ...state,
          loading: true,
          error: false,
          workOrderPostData: action.payload
        };
      }
      case Constants.DELETE_WORKORDER_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.DELETE_WORKORDER_ERR: {
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

      // Get a list of workorders
      case Constants.GET_ALL_WORKORDER: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_WORKORDER_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getListOfWorkOrderData: action.payload,
        };
      }
      case Constants.GET_ALL_WORKORDER_ERR: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
    }
  });

export default workOrderPageReducer;
