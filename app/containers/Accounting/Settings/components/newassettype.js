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
import { Euro, AttachMoney, Delete,ArrowBack } from '@material-ui/icons';
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

const NewAssetType = () => {
    const classes = useStyles();
    const settingContext = useContext(SettingContext)
    const assetClasses =[
        {
            value:'01',
            label:'Tangible'
        },
        {
            value:'02',
            label:'Inangible'
        }
    ]

    return ( 
        <div className={classes.base}>
              <div style={{marginBottom:'1em'}}>
                  <Paper elevation={3} className={classes.base}>
                  <Typography variant="h6" gutterBottom>
                     Asset Type
                    </Typography>
                  </Paper>
              </div>
              <Paper elevation={3} className={classes.base}>
                  <Grid container spacing={3}>
                      <Grid item xs={6}>
                      <TextField
                        size={'small'}
                        label="Code"
                        variant="outlined"
                       fullWidth
                      />
                      </Grid>
                      <Grid item xs={6}>
                    <Autocomplete
                    id="assetcode"
                    options={assetClasses}
                    getOptionLabel={option => option.label}
                    onChange={(event, value) => {
                      //setMonthForCalender(event, value);
                      //(value.value);
                    }}
                    fullWidth
                    renderInput={params => (
                      <TextField
                        {...params}
                        size={'small'}
                        label="Asset Class"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                      </Grid>

                      <Grid item xs={6}>
                      <TextField
                        size={'small'}
                        label="Name"
                        variant="outlined"
                       fullWidth
                      />
                      </Grid>

                      <Grid item xs={6}>
                      <TextField
                        size={'small'}
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={5}
                       fullWidth
                      />
                      </Grid>
                      <Grid item xs={12}>
                 <div style={{float:"right",padding:'10px'}}>
                     <div>
                     <Button
                variant="contained"
                onClick={()=>{settingContext.settingDispatch({type:'NAVIGATION',page:'assettype'})}}
                startIcon={<ArrowBack />}
              >
                Back
              </Button>
                     </div>
                 </div>
              </Grid>
                  </Grid>
              </Paper>


        </div>
     );
}
 
export default NewAssetType;