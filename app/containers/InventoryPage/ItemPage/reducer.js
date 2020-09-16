/*
 *
 * ItemPage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  accounts: [],
  vendors: [],
  itemsGroups: [],
  itemsGroup: null,
  getStockLocationBySku: false,
  getStockLocationBySkuResponse: [],
  getInventoryAdjustById: false,
  getInventoryAdjustByIdResponse: false,
  getItemByIdResponse: false,
  getItemById: false,
  itemsPerWarehouse: [],
  getAllItemsPerWarehouseUuid: {},
  message: false,
  newTransferOrderDetails: false,
  newItemDetails: false,
  newInventoryAdjustmentDetails: false,
  getAllInventoryAdjustments: [],
  getAllTransferOrder: [],
  getAllWarehouses: [],
  getAllItems: [],
  loading: false,
  error: false,
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
            data: null,
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
          newInventoryAdjustmentDetails: action.payload,
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
          getAllInventoryAdjustments: action.payload,
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
          getAllItemsPerWarehouseUuid: action.payload,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_ITEMS_PER_WAREHOUSE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getAllItemsPerWarehouse: action.payload,
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
          getItemById: action.payload,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ITEM_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getItemByIdResponse: action.payload,
        };
      }
      case Constants.GET_ITEM_BY_ID_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.GET_STOCK_LOCATIONS: {
        return {
          ...state,
          getStockLocationBySku: action.payload,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_STOCK_LOCATIONS_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getStockLocationBySkuResponse: action.payload,
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
          getItemById: action.payload,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_TRANSFER_ORDER_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getItemByIdResponse: action.payload,
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
          getInventoryAdjustById: action.payload,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_INVENTORY_ADJUST_BY_ID_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getInventoryAdjustByIdResponse: action.payload,
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
