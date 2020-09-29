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
  Grid
} from '@material-ui/core';
import { BrowserRouter as Router, Switch, useParams, Route, useRouteMatch } from "react-router-dom";
import SendInvoice from './sendinvoice';
import Payment from './payment';
import InvoiceReciept from './invoicereciept';
import Invoice from './invoice';
import NewInvoice from './newinvoice';
export const InvoiceContext = React.createContext();

const Home = () => {
  const initialState = {
    page: 'invoice',
    invoice: true,
    newinvoice: false,
    invoicereciept: false,
    sendinvoice: false,
    payment: false,
    sendinvoice: false,
    payment: false
  }

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
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <InvoiceContext.Provider
      value={{ invoiceState: state, invoiceDispatch: dispatch }}>
      <div>

        <div>
          {state.newinvoice ? <NewInvoice /> : <div />}
        </div>
        <div>
          {state.invoice ? <Invoice /> : <div />}
        </div>
        <div>
          {state.invoicereciept ? <InvoiceReciept /> : <div />}
        </div>
        <div>
          {state.payment ? <Payment /> : <div />}
        </div>
        <div>
          {state.sendinvoice ? <SendInvoice /> : <div />}
        </div>


      </div>
    </InvoiceContext.Provider>

  );
}

export default Home;