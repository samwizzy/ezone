import React, { useState, useContext, useEffect } from 'react';
import axios from "axios";
import { createAccountSetupSagaII } from '../saga';
import { withRouter, Link ,useHistory} from "react-router-dom";
import swal from 'sweetalert';
import {
  makeStyles,
  Box,
  Button,
  TextField,
  Divider,
  Paper,
  Grid,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@material-ui/core';
import Logo from '../images/Logo.svg';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import * as crud from '../crud';
import MUIDataTable from 'mui-datatables';
import NextIcon from '@material-ui/icons/ArrowForward';
import BackIcon from '@material-ui/icons/ArrowBack';

import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { createStructuredSelector } from 'reselect';
import * as Enums from '../enums';
import * as Endpoints from '../../../../components/Endpoints';
import { AccSetupContext } from './AccountSetup';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2, 2),
    color: theme.palette.text.secondary,
  },
  box: {
    textAlign: 'center',
  },
  sideDemo: {
    // backgroundImage: 'linear-gradient(13.98deg, #1A88E1 4.45%, rgba(255, 255, 255, 0) 85.58%)',
    backgroundColor: theme.palette.background.paper,
  },
  control: {
    padding: theme.spacing(2),
  },
  flex: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  },
  table: {
    marginTop: theme.spacing(2),
    '& .MuiTableCell-body': {
      fontSize: theme.typography.fontSize - 1,
    },
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        color: theme.palette.common.white,
      },
      '& .MuiTableCell-root:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiTableCell-root:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
  cardRoot: {
    maxWidth: '100%',
  },
  media: {
    height: 140,
  },
  content_margin_button: {
    float: 'right',
    marginTop: '20px',
    marginBottom: '20px',
  },
  content_margin_table: {
    marginTop: '20px',
    marginLeft: 'auto',
    marginBottom: '20px',
    marginRight: 'auto',
  },
  button_margin: {
    margin: '2px'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const BussinessActivity = props => {
  const history = useHistory();
  const classes = useStyles();
  const accContext = useContext(AccSetupContext)
  const [service, setService] = useState(OnlyBussinessLabel(accContext.accState.businessActivity))
  const [chartOfAccountData, setChartOfAccountData] = useState([
    {accountCode:'10000',accountName:'Pretty Cash',accountType:'Cash & Cash Equivalent',balance:5000,financialposition:'Financial Position',debitcredit:'DR',class:'Assets'},
    {accountCode:'10100',accountName:'Cash on Hand',accountType:'Cash & Cash Equivalent',balance:6000,financialposition:'Financial Position',debitcredit:'DR',class:'Assets'},
    {accountCode:'10200',accountName:'Bank Account - Payroll',accountType:'Cash & Cash Equivalent',balance:8000,financialposition:'Financial Position',debitcredit:'DR',class:'Assets'},
    {accountCode:'10300',accountName:'Savings Account',accountType:'Cash & Cash Equivalent',balance:12500,financialposition:'Financial Position',debitcredit:'DR',class:'Assets'},
    {accountCode:'10400',accountName:'Special Account',accountType:'Cash & Cash Equivalent',balance:46000,financialposition:'Financial Position',debitcredit:'DR',class:'Assets'}
  ])
  const [isEmpty, setIsEmpty] = useState(true);

  function onNextPage(e){
    e.preventDefault();
    createAccountSetup()
    //createAccountingSetupAction(values)
  }

  async function createAccountSetup() {
    await crud.createAccountSetup(accContext.accState).then(data=>{
      history.push('/account/charts');
      swal("Success", "Account opened successfully", "success");
      //.accDispatch({type:'MSG',msg:{open:true,message:'Account opened successfully',severity:'success'}});
      window.location.reload(false);
      //accContext.accDispatch({type:'NAVIGATION',page:'chatofAcc'})
    }).catch((err)=>{
      swal("Failed", "Something went wrong", "error");
      //accContext.accDispatch({type:'MSG',msg:{open:false,message:'Something went wrong',severity:'error'}});
      console.log(`Error from setUptins ${err}`)
    })
  }

  function OnlyBussinessLabel(value) {
    switch (value) {
      case 'DEFAULT':
        return 'Default'
      case 'CONSTRUCTION':
      return 'Construction'
      case 'MANUFACTURING':
      return 'Manufacturing'
      case 'PROFESSIONAL_SERVICE/SOLE_PROPRIETOR':
        return 'Professional Service/Sole proprietor'
      case 'SERVICING':
        return 'Servicing';
      case 'TRADING':
       return 'Trading'     
    }
  }




  const columns = [
    {
      name: 'accountCode',
      label: 'Account Code',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'accountName',
      label: 'Account Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'accountType',
      label: 'Account Type',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'balance',
      label: 'Balance',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'financialposition',
      label: 'Financial Position',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'debitcredit',
      label: 'Debit/Credit',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: '',
      label: 'Status',
      options: {
        filter: false,
        sort: false,
      },
    }
    

  ];




  return (

    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Paper square elevation={0} className={classes.paper}>
            <Box p={1} mb={1} className={classes.box}>
              <Typography variant="h4" color="textPrimary">
                Welcome To&nbsp;
                <img src={Logo} height="30" />
                &nbsp;Accounting
              </Typography>
            </Box>
            <Box p={2} className={classes.box}>
              <Typography variant="h6" color="textPrimary">
                Setup Your Accounting Structure
              </Typography>
            </Box>
          </Paper>
          <Divider />
        </Grid>

        <Grid item xs={12}>

          <div className={classes.content_margin_table} align="right">
            
              <div>
                <React.Fragment>
                  <div className={classes.root}>
                    <Grid container>
                      <Grid item xs={12}>
                        <MUIDataTable
                          className={classes.datatable}
                          data={chartOfAccountData}
                          columns={columns}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </React.Fragment>
                <div><div style={{float:'left',margin:'10px'}}><Typography variant="h6" component="h6" color="textSecondary">Note : You can edit account after setup</Typography></div></div>
              </div>
              
          </div>

        </Grid>


        <Grid item xs={12}>
          <div>
            <div style={{ float: 'right', paddingRight: '10px', paddingTop: '3em', paddingBottom: '2em' }}>
              <Grid container spacing={2}>
                <Grid item >
                  <div>
                    <Button
                      variant="contained"
                      startIcon={<BackIcon />}
                      onClick={e => { accContext.accDispatch({ type: 'NAVIGATION', page: 'chatofAcc' }) }}
                    >
                      Back
                </Button>
                  </div>
                </Grid>

                <Grid item>
                  <div>
                    
                      <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        endIcon={<NextIcon />}
                        onClick={(e) =>{
                          e.preventDefault();
                          createAccountSetup()
                        }}
                      >
                        Finish
                    </Button>
                    

                  </div>
                </Grid>
              </Grid>
            </div>
          </div>

        </Grid>

      </Grid>
    </div>

  );
}

export default BussinessActivity;