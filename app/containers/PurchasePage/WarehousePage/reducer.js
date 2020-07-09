/*
 *
 * WarehousePage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
  warehouseDetails: false,
  getAllWarehouses: [],
  getAllEmployees: [],
  warehouseDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const warehousePageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case Constants.OPEN_NEW_WAREHOUSE_DIALOG: {
        return {
          ...state,
          warehouseDialog: {
            type: 'new',
            props: {
              open: true,
            },
            data: null,
          },
        };
      }
      case Constants.CLOSE_NEW_WAREHOUSE_DIALOG: {
        return {
          ...state,
          warehouseDialog: {
            type: 'new',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.OPEN_EDIT_WAREHOUSE_DIALOG: {
        return {
          ...state,
          warehouseDialog: {
            type: 'edit',
            props: {
              open: true,
            },
            data: action.payload,
          },
        };
      }
      case Constants.CLOSE_EDIT_WAREHOUSE_DIALOG: {
        return {
          ...state,
          warehouseDialog: {
            type: 'edit',
            props: {
              open: false,
            },
            data: null,
          },
        };
      }
      case Constants.GET_ALL_EMPLOYEES: {
        return {
          ...state,
          loading: true,
          error: false,
        };
      }
      case Constants.GET_ALL_EMPLOYEES_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
          getAllEmployees: action.payload,
        };
      }
      case Constants.GET_ALL_EMPLOYEES_ERROR: {
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
      case Constants.CREATE_NEW_WAREHOUSE: {
        return {
          ...state,
          loading: true,
          error: false,
          warehouseDetails: action.payload,
        };
      }
      case Constants.CREATE_NEW_WAREHOUSE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.CREATE_NEW_WAREHOUSE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
      case Constants.UPDATE_WAREHOUSE: {
        return {
          ...state,
          loading: true,
          error: false,
          warehouseDetails: action.payload,
        };
      }
      case Constants.UPDATE_WAREHOUSE_SUCCESS: {
        return {
          ...state,
          loading: false,
          error: false,
        };
      }
      case Constants.UPDATE_WAREHOUSE_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      }
    }
  });

export default warehousePageReducer;
