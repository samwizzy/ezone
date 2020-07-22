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
import { Autocomplete } from '@material-ui/lab';
import { Euro, AttachMoney, Delete,Check } from '@material-ui/icons';
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
      padding:'10px',
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
    margin:'10px',
    padding:'15px',
    backgroundColor: theme.palette.grey[300]
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

const DepreciationAreas = () => {
    const classes = useStyles();
    const settingContext = useContext(SettingContext)
    const [dAreas,setDAreas] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };


    useEffect(() => {
    getAllDeprecitionArea()
    },[])

    async function getAllDeprecitionArea(){
       await crud.getDeprecitionArea()
       .then((data)=>{
        console.log(`Deprecition Areas ${JSON.stringify(data.data)}`)
       })
       .catch((error)=>{
       console.log(`Error from DeprecitionAreas ${error}`)
       })
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
                             Depreciation Area
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
                        settingContext.settingDispatch({type:'NAVIGATION',page:'newdeprecitionarea'})
                        
                      }}
                    >
                     Add Depreciation area
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
                                 <Paper elevation={2} className={classes.header}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={3}>
                                        <Typography variant="subtitle1" gutterBottom>
                                         Code
                                       </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                        <Typography variant="subtitle1" gutterBottom>
                                        Type
                                       </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                        <Typography variant="subtitle1" gutterBottom>
                                         Description
                                       </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                        <Typography variant="subtitle1" gutterBottom>
                                         Default
                                       </Typography>
                                        </Grid>
                                    </Grid>
                                 </Paper>
                             </Grid>
                             <Grid item xs={12}>
                                 <div style={{paddingLeft:'20px'}}>
                             <Grid container spacing={3}>
                                 {dAreas.map((area)=>
                                  <Grid key={area.code} item xs={12}>
                                      <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                        <Grid container spacing={3}> 
                                       <Grid item>
                                        <Typography variant="subtitle1" gutterBottom>
                                         {area.code}
                                       </Typography>
                                       </Grid>
                                       <Grid item>
                                        <Typography variant="subtitle1" gutterBottom>
                                         {area.type}
                                       </Typography>
                                       </Grid>
                                       <Grid item>
                                       <Typography variant="subtitle1" gutterBottom>
                                         {area.description}
                                       </Typography>
                                       </Grid>
                                       <Grid item>
                                       <div>
                                           <Check style={{color:green[500],fontSize: 50}} />
                                       </div>
                                       </Grid>
                                       <Grid item>
                                       <div>
                                  <Button aria-controls="simple-menu" 
                                  aria-haspopup="true" onClick={handleClick}>
                                   Option
                                </Button>
                              <Menu
                              id="simple-menu"
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                             onClose={handleClose}
                            >
                           <MenuItem onClick={handleClose}>Make Default</MenuItem>
                           <MenuItem onClick={handleClose}>Delete</MenuItem>
                        </Menu>
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
 
export default DepreciationAreas;