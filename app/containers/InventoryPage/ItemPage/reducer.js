/*
 *
 * ItemPage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  newTransferOrderDetails: false,
  newItemDetails: false,
  getAllTransferOrder: [],
  getAllWarehouses: [],
  getAllItems: [],
  transferOrders: [],
  loading: false,
  error: false,
  itemDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  transferOrderDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const itemPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_ITEM_DIALOG: {
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
      case Constants.CLOSE_NEW_ITEM_DIALOG: {
        return {
          ...state,
          itemDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_VIEW_ITEM_DIALOG: {
        return {
          ...state,
          viewItemDialog: {
            type: 'view',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_VIEW_ITEM_DIALOG: {
        return {
          ...state,
          viewItemDialog: {
            type: 'view',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_NEW_TRANSFER_ORDER_DIALOG: {
        return {
          ...state,
          transferOrderDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_TRANSFER_ORDER_DIALOG: {
        return {
          ...state,
          transferOrderDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_VIEW_TRANSFER_ORDER_DIALOG: {
        return {
          ...state,
          transferOrderDialog: {
            type: 'view',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_VIEW_TRANSFER_ORDER_DIALOG: {
        return {
          ...state,
          transferOrderDialog: {
            type: 'view',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.GET_ALL_ITEMS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_ITEMS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getAllItems: action.payload,
        };
      }
      case Constants.GET_ALL_ITEMS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.CREATE_NEW_ITEM: {
        return {
          ...state,
          loading: true,
          error: false,
          newItemDetails: action.payload,
        };
      }
      case Constants.CREATE_NEW_ITEM_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_NEW_ITEM_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_ALL_WAREHOUSE: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_WAREHOUSE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getAllWarehouses: action.payload,
        };
      }
      case Constants.GET_ALL_WAREHOUSE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.CREATE_NEW_TRANSFER_ORDER: {
        return {
          ...state,
          loading: true,
          error: false,
          newTransferOrderDetails: action.payload,
        };
      }
      case Constants.CREATE_NEW_TRANSFER_ORDER_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_NEW_TRANSFER_ORDER_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_ALL_TRANSFER_ORDER: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_TRANSFER_ORDER_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getAllTransferOrder: action.payload,
        };
      }
      case Constants.GET_ALL_TRANSFER_ORDER_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default itemPageReducer;
