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
import ModuleLayout from './ModuleLayout';
import SendReceipt from './sendreceipt';
import Payment from './payment';

export const InvoiceContext = React.createContext();

const Home = () => {
  const initialState = {
    page: 'receipt',
    receipt: true,
    newreceipt: false,
    receiptreciept: false,
    sendreceipt: false,
    payment: false,
    sendreceipt: false,
    payment: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'NAVIGATION':
        state = {
          ...state,
          page: action.page,
          [state.page]: false,
          [action.page]: true,
        };
        return state;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ReceiptContext.Provider
      value={{ receiptState: state, receiptDispatch: dispatch }}
    >
      <div>
        <div>{state.newreceipt ? <NewReceipt /> : <div />}</div>
        <div>{state.invoice ? <Receipt /> : <div />}</div>

        <div>{state.payment ? <Payment /> : <div />}</div>
        <div>{state.sendreceipt ? <SendReceipt /> : <div />}</div>
      </div>
    </ReceiptContext.Provider>
  );
};

export default Home;
