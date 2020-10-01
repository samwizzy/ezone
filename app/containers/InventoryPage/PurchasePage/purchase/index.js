import React, { useState, useReducer } from 'react';
import {
  makeStyles,
  Button,
  Menu,
  TextField,
  Autocomplete,
  Paper,
  Typography,
  MenuItem,
  Grid,
} from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  useParams,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import PurchaseOrder from './purchaseorder';
import NewPurchaseOrder from './newpurchaseorder';
import PurchaseOrderInvoice from './purchaseorderinvoice';
import NewShipment from './newshipment';
export const PurchaseContext = React.createContext();

const Home = () => {
  const initialState ={
    page:'purchaseorder',
    purchaseorder:true,
    newpurchase:false,
    newshipment:false,
    purchaseorderinvoice:false,
  }

  const reducer = (state, action) => {
    switch(action.type){
      case 'NAVIGATION':
        state = {
          ...state,
          page:action.page,
          [state.page] :false,
          [action.page]:true,
        };
        return state;
      default :
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PurchaseContext.Provider
      value={{ purchaseState: state, purchaseDispatch: dispatch }}
      <div>
        <div>{state.newpurchase ? <NewPurchaseOrder /> : <div />}</div>
        <div>
          {state.purchaseorder?<PurchaseOrder/>:<div/>}
        </div>
        <div>
          {state.newshipment?<NewShipment/>:<div/>}
        </div>
        <div>
          {state.purchaseorderinvoice?<PurchaseOrderInvoice/>:<div/>}
        </div>
      </div>
    </PurchaseContext.Provider> 
  );
};

export default Home;
