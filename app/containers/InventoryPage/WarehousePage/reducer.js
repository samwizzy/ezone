/*
 *
 * WarehousePage reducer
 *
 */
import produce from 'immer';
import * as Constants from './constants';

export const initialState = {
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
        console.log('reducer come here');
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
    }
  });

export default warehousePageReducer;
