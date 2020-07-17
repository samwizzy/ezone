import React, {useState,useReducer} from 'react';
import ModuleLayout from './ModuleLayout'; 
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
import DepreciationArea from './depreciationarea';
import AccessClasses from './assetsclasses';
import DepreciationSetup from './depreciation';
import NewAsset from './newassets';
export const FixedAssetContext = React.createContext();

const useStyles = makeStyles(theme => ({
    root: {
      padding:'15px'
    },
    label: { marginLeft: theme.spacing(1) },
    title: {padding:'7px' },
    iconPaper: {
      boxShadow: theme.shadows[1]
    },
    curve:{
        borderRadius:'6px'
    },
    bColored:{
        width:'300px',
        height:'240px',
        border:'2px sold blue'
    }
  }));

const FixedAssets = () => {
    const {path} = useRouteMatch();
    console.log(` path from Fixed Access ${JSON.stringify(path)}`)

    const initialState ={
      page:'newasset',
      newasset:true,
      depreciation:false,
      depreciationarea:false,
      assetclasses:false
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
      <FixedAssetContext.Provider
    value={{ fixedState: state, fixedDispatch: dispatch }}>
      <div>
        <ModuleLayout>
          <div>
          {state.newasset?<NewAsset/>:<div/>}
          </div>
          <div>
          {state.depreciation?<DepreciationSetup/>:<div/>}
          </div>
          <div>
          {state.depreciationarea?<DepreciationArea/>:<div/>}
          </div>
          <div>
          {state.assetclasses?<AccessClasses/>:<div/>}
          </div>
          
         
         </ModuleLayout>
      </div>
      </FixedAssetContext.Provider> 
        
     );
}
 
export default FixedAssets;