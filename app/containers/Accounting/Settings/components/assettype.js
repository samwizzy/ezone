import React, { memo,useState,useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { 
  makeStyles, 
  Box, 
  Button, 
  Menu,
  MenuItem,
  Grid, 
  Paper, 
  Table, 
  TableBody,
  TableFooter, 
  TableRow, 
  TableCell, 
  TextField, 
  Toolbar, 
  Typography,
  Tooltip
} from '@material-ui/core';
import swal from 'sweetalert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Autocomplete } from '@material-ui/lab';
import { Euro, AttachMoney, Delete } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as crud from '../crud';
import DialogOfAccountPeriod from './DialogOfAccountPeriod';
import moment from 'moment';
// import ModuleLayout from '../../components/ModuleLayout';
import months from './../../../../utils/months';
import { SettingContext } from './SettingsLayout';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(1, 2),
      backgroundColor: theme.palette.grey[100],
    },
    grid: {
      justifyContent: "space-between",
      '& .MuiGrid-item': {
        flex: 1,
        margin: theme.spacing(2, 0),
      }
    },
    base:{
     padding:'18px'
    },
    header:{
    backgroundColor:'#bbb',
    margin:'10px',
    padding:'15px'
    },
    box: {
          backgroundColor: theme.palette.grey[200]
    },
    curve:{
      borderRadius:'8px'
    },
    lightLift: {
      marginBottom: '20px',
    },
    softLift:{
     padding:'10px'
    },
    paper:{padding:'5px'},
      table: {
      display: "flex",
      flexDirection: "column",
      whiteSpace: "nowrap",
      '& .MuiTableFooter-root': {},
      '& th.MuiTableCell-root': {
              borderBottom: 'none !important',
      },
      '& .MuiTableCell-root': {
        borderBottom: 'none !important'
      },
    },
  }));

const AssetType = () => {
    const classes = useStyles();
    const settingContext = useContext(SettingContext)
    const [assetsDetails,setAssetsDetails] = useState([])

    useEffect(() => {
      let mounted = true
      if(mounted){
        getAssetType();
      } 
      return ()=>{
       mounted = false
      } 
    },[])

    function getAssetType(){
      let result = [];
      crud.getAssetType()
      .then((data)=>{
        //console.log(`Asset types ${JSON.stringify(data.data)}`)
       for(let i=0;i<data.data.length;i++){
         if(data.data[i].code != null){
         result.push({
           assetClass:data.data[i].assetClass,
           code: data.data[i].code,
           dateCreated:data.data[i].dateCreated,
           dateUpdated:data.data[i].dateUpdated,
           id:data.data[i].id,
           name:data.data[i].name,
           orgId:data.data[i].orgId
         })
        }
       }
       setAssetsDetails(result);
      })
      .catch((error)=>{
       console.log(`Error in Asset ${error}`)
      })
    }

    function retriveUpdate(value){
      settingContext.settingDispatch({type:'UPDATE',update:true,payload:value}) 
      settingContext.settingDispatch({type:'NAVIGATION',page:'newassettype'})
    }

    return ( 
        <div className={classes.base}> 
            <div>
           <Paper elevation={2} className={classes.paper}>
               <Grid container spacing={3}>
                 
                 <Grid item xs={12}>
                     <div className={classes.softLift}>
                     <Grid container spacing={10}>
                         <Grid item xs={3}>
                             <div>
                             <Typography variant="subtitle1" gutterBottom>
                             Asset Types
                           </Typography>
                             </div>
                         </Grid>
                         <Grid item xs={9}>
                             <div>
                                 <div style={{float:'right'}}>
                                 <Button className={classes.curve}
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={(e) =>{
                        e.preventDefault();
                        settingContext.settingDispatch({type:'NAVIGATION',page:'newassettype'})
                        
                      }}
                    >
                     Add Asset type
                  </Button>
                                 </div>
                             </div>
                         </Grid>
                     </Grid>
                     </div>
                 </Grid>
                 
                 <Grid item xs={12}>
                     <div>
                         <Grid container spacing={3}>
                             <Grid item xs={12}>
                                 <div className={classes.header}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                        <Typography variant="subtitle1" gutterBottom>
                                         Code
                                       </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                        <Typography variant="subtitle1" gutterBottom>
                                        Name
                                       </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                        <Typography variant="subtitle1" gutterBottom>
                                         Asset Class
                                       </Typography>
                                        </Grid>
                                    </Grid>
                                 </div>
                             </Grid>
                             <Grid item xs={12}>
                                 <div style={{paddingLeft:'20px'}}>
                             <Grid container spacing={3}>
                                 {assetsDetails.map((asset)=>
                                  <Grid key={asset.code} item xs={12}>
                                      <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                        <Grid container spacing={3}> 
                                       <Grid item xs={3}>
                                        <Typography variant="subtitle1" gutterBottom>
                                         {asset.code}
                                       </Typography>
                                       </Grid>
                                       <Grid item xs={3}>
                                        <Typography variant="subtitle1" gutterBottom>
                                         {asset.name}
                                       </Typography>
                                       </Grid>
                                       <Grid item xs={3}>
                                       <Typography variant="subtitle1" gutterBottom>
                                         {asset.assetClass}
                                       </Typography>
                                       </Grid>
                                       <Grid item xs={3}>
                                       <div style={{position:'relative',top:'-10px'}}>
                                         <Button onClick={()=>retriveUpdate(asset)} variant="contained" color="primary">
                                          Update
                                          </Button>
                                         </div>
                                       </Grid>
                                       </Grid>
                                       </Grid>
                                       </Grid>
                                  </Grid>
                                  
                                 )}
                                
                            </Grid>
                            </div>     
                            </Grid> 
                         </Grid>
                     </div>
                 </Grid>
                   

               </Grid>
           </Paper>
           </div>
        </div>
     );
}
 
export default AssetType;