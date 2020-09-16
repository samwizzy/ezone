import React, {useState,useReducer} from 'react';
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
import { BrowserRouter as Router, Switch,useParams, Route,useRouteMatch } from "react-router-dom";
import SalesOrder from './salesorder';
import NewSaleOrder from './newsalesorder';
import SalesOrderInvoice from './salesorderinvoice';
import NewShipment from './newshipment';
import Shippment from './shippment';
export const SalesContext = React.createContext();

const Home = () => {
    const initialState ={
        page:'salesorder',
        salesorder:true,
        newsales:false,
        newshipment:false,
        shippment:false,
        salesorderinvoice:false,
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
        <SalesContext.Provider
      value={{ salesState: state, salesDispatch: dispatch }}>
        <div>
         
            <div>
            {state.newsales?<NewSaleOrder/>:<div/>}
            </div>
            <div>
            {state.salesorder?<SalesOrder/>:<div/>}
            </div>
            <div>
            {state.newshipment?<NewShipment/>:<div/>}
            </div>
            <div>
            {state.shippment?<Shippment/>:<div/>}
            </div>
            <div>
            {state.salesorderinvoice?<SalesOrderInvoice/>:<div/>}
            </div>
            
           
        </div>
        </SalesContext.Provider> 
          
       );
}
 
export default Home;