/*
 *
 * ItemPage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  loading: false,
  error: false,
  message: false,
  accounts: [],
  vendors: [],
  itemsGroups: [],
  itemsGroup: null,
  stockLocationBySku: [],
  items: [],
  itemById: null,
  itemsPerWarehouse: [],
  inventoryAdjustments: [],
  inventoryAdjustedById: null,
  transferOrders: [],
  transferOrderById: null,
  warehouses: [],
  itemDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  itemGroupDialog: {
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
  inventoryAdjustDialog: {
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
      case Constants.OPEN_EDIT_ITEM_DIALOG: {
        return {
          ...state,
          itemDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_ITEM_DIALOG: {
        return {
          ...state,
          itemDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_NEW_ITEM_GROUP_DIALOG: {
        return {
          ...state,
          itemGroupDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_ITEM_GROUP_DIALOG: {
        return {
          ...state,
          itemGroupDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_ITEM_GROUP_DIALOG: {
        return {
          ...state,
          itemGroupDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_ITEM_GROUP_DIALOG: {
        return {
          ...state,
          itemGroupDialog: {
            type: 'edit',
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
      case Constants.OPEN_EDIT_TRANSFER_ORDER_DIALOG: {
        return {
          ...state,
          transferOrderDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_TRANSFER_ORDER_DIALOG: {
        return {
          ...state,
          transferOrderDialog: {
            type: 'edit',
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
      case Constants.GET_ACCOUNTS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ACCOUNTS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          accounts: action.payload,
        };
      }
      case Constants.GET_ACCOUNTS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_VENDORS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_VENDORS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          vendors: action.payload,
        };
      }
      case Constants.GET_VENDORS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
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
          items: action.payload,
        };
      }
      case Constants.GET_ALL_ITEMS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_ITEMS_GROUPS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ITEMS_GROUPS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          itemsGroups: action.payload,
        };
      }
      case Constants.GET_ITEMS_GROUPS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_ITEMS_GROUP_BY_ID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ITEMS_GROUP_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          itemsGroup: action.payload,
        };
      }
      case Constants.GET_ITEMS_GROUP_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.UPDATE_ITEMS_GROUP_BY_ID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.UPDATE_ITEMS_GROUP_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          itemsGroup: action.payload,
        };
      }
      case Constants.UPDATE_ITEMS_GROUP_BY_ID_ERROR: {
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
        };
      }
      case Constants.CREATE_NEW_ITEM_SUCCESS: {
        return {
          ...state,
          message: action.payload,
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
      case Constants.CREATE_ITEM_GROUP: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_ITEM_GROUP_SUCCESS: {
        return {
          ...state,
          message: action.payload,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_ITEM_GROUP_ERROR: {
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
          warehouses: action.payload,
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
          transferOrders: action.payload,
        };
      }
      case Constants.GET_ALL_TRANSFER_ORDER_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.OPEN_INVENTORY_ADJUST_DIALOG: {
        return {
          ...state,
          inventoryAdjustDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_INVENTORY_ADJUST_DIALOG: {
        return {
          ...state,
          inventoryAdjustDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.CREATE_NEW_INVENTORY_ADJUSTMENT: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.CREATE_NEW_INVENTORY_ADJUSTMENT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_NEW_INVENTORY_ADJUSTMENT_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_ALL_INVENTORY_ADJUSTMENT: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_INVENTORY_ADJUSTMENT_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          inventoryAdjustments: action.payload,
        };
      }
      case Constants.GET_ALL_INVENTORY_ADJUSTMENT_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_ALL_ITEMS_PER_WAREHOUSE: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_ITEMS_PER_WAREHOUSE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          itemsPerWarehouse: action.payload,
        };
      }
      case Constants.GET_ALL_ITEMS_PER_WAREHOUSE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_ITEM_BY_ID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ITEM_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          itemById: action.payload,
        };
      }
      case Constants.GET_ITEM_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.UPDATE_ITEM_BY_ID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.UPDATE_ITEM_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          itemById: action.payload,
        };
      }
      case Constants.UPDATE_ITEM_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_STOCK_LOCATIONS: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_STOCK_LOCATIONS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          stockLocationBySku: action.payload,
        };
      }
      case Constants.GET_STOCK_LOCATIONS_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_TRANSFER_ORDER_BY_ID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_TRANSFER_ORDER_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          transferOrderById: action.payload,
        };
      }
      case Constants.GET_TRANSFER_ORDER_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_INVENTORY_ADJUST_BY_ID: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_INVENTORY_ADJUST_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          inventoryAdjustedById: action.payload,
        };
      }
      case Constants.GET_INVENTORY_ADJUST_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default itemPageReducer;
