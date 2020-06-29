import React,{useState, useContext, useEffect} from 'react';
import axios from "axios";
import {createAccountSetupSagaII} from '../saga';
import { withRouter } from "react-router-dom";
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
    float:'right',
    marginTop: '20px',
    marginBottom: '20px',
  },
  content_margin_table: {
    marginTop: '20px',
    marginLeft: 'auto',
    marginBottom: '20px',
    marginRight: 'auto',
  },
  button_margin:{
  margin:'2px'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const BussinessActivity = props => {
  axios.defaults.headers.common = {
    'Authorization': 'Bearer ' + `${props.accessToken}`
   };
    
    const classes = useStyles();
    const accContext = useContext(AccSetupContext)
    const [service,setService] = useState(OnlyBussinessLabel(accContext.accState.businessActivity))
    const [chartOfAccountData,setChartOfAccountData] = useState([])
    const [isEmpty,setIsEmpty] = useState(true);
    


    async function createAccountSetup() {
   

    let accountSetup =
    {
    accountChart: `${accContext.accState.accountChart}`,
    accountMethod: `${accContext.accState.accountMethod}`,
    currency: accContext.accState.currency,
    dateCreated: `${(new Date).toISOString()}`,
    dateUpdated: "",
    id: `${accContext.accState.id}`,
    multiCurrency: Boolean(accContext.accState.multiCurrency),
    orgId: `${accContext.accState.orgId}`,
    startDay: Number(accContext.accState.startDay),
    startMonth: Number(accContext.accState.startMonth),
    taxDay: 0,
    taxMonth: 0,
    taxType: "",
    }

    console.log(`before you post ${JSON.stringify(accountSetup)} token ${props.accessToken}`)
    /*const rawResponse = await fetch('https://dev.ezoneapps.com/gateway/accountingserv/api/v1/account/add_account_settings', {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': `Bearer ${props.accessToken}`,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(accountSetup)
    });
    const content = await rawResponse.json();
    console.log(content);*/
   
    await axios.post(`${Endpoints.CreateAccountingSetupApi}`,accountSetup)
     .then((res) => {
          let chatResponse = res.data;
          accContext.accDispatch({type:'MSG',msg:{open:true,message:'Account open successfully',severity:'success'}})
          console.log(`from Business response ${chatResponse}`);
          if(chatResponse.success){
            accContext.accDispatch({type:'NAVIGATION',page:'financialYear'})
          }
         
        })
  
        .catch((err) => {
          accContext.accDispatch({type:'MSG',msg:{open:true,message:'Something went wrong. Please try again later',severity:'error'}})
          console.log(`error ocurr ${err}`);
        });

    }

    useEffect(() => {
      async function getChatfromServer() {
        // You can await here
        //const response 
        //select uri
       
        const config = {
          headers: { 
          Authorization: `Bearer ${props.accessToken}`,
          'Content-Type': 'application/json', 
        }
      };
      
        await axios
        .get(`${Endpoints.GetAllChartOfAccountApi}/${props.credentials.organisation.orgId}`,
        config)
        .then((res) => {
          let chatData = res.data;
          setIsEmpty(chatData.length > 0 ?false :true);
          setChartOfAccountData(chatData)
          console.log(`from Business Active ${chatData}`)
        })
  
        .catch((err) => {
          console.log(`error ocurr ${err}`);
        });
       
        // ...
      }
      getChatfromServer();
    },[]
    )

    const businessService = [
        {
          value: 'SERVICE_COMPANY',
          label: 'Service Company',
        },
        {
          value: 'MARKETING_COMPANY',
          label: 'Marketing Company',
        }
    ]

    function OnlyBussinessLabel(value){
      console.log(`Value of service ${value}`)
      switch(value){
        case 'SERVICE_COMPANY':
          return 'Service Company'
          case 'MARKETING_COMPANY':
            return 'Marketing Company'  
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
          <Paper square elevation={0} className={classes.paper}>
            <Grid item xs={12}>

            <Box p={1} className={classes.boxed}>
                <Typography
                  variant="h6"
                  className={classes.smallHeaderWithLift}
                  color="textPrimary"
                >
                  Bussiness Activity
                </Typography>
            </Box>

            <div className={classes.lightLift}>
                  <Autocomplete
                    id="bussinessService"
                    options={businessService}
                    getOptionLabel={option => option.label}
                    onChange={(event, value) =>{
                      accContext.accDispatch({type:'PAYLOAD',payload:{label:'businessActivity',value:value.value}})
                      setService(OnlyBussinessLabel(value.value))
                    }
                  }
                    style={{ width: 300 }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={accContext.accState.businessActivity === '' ?'Select Business Service':`${service}`}
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </div>    

            </Grid>
          </Paper>
        </Grid>  

        <Grid item xs={12}>
          
          <div className={classes.content_margin_table} align="right">
            {!isEmpty ?
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
    <div><h5>Note : You can edit account after setup</h5></div>
    </div>
    :<div/> 
    } 
          </div>

        </Grid>


        <Grid item xs={12}>
              <div>
                <div style={{float:'right',paddingRight:'10px',paddingTop:'3em',paddingBottom:'2em'}}>
                   <Grid  container spacing={2}>  
                  <Grid item >
                   <div>
                   <Button
                  variant="contained"
                  startIcon={<BackIcon />}
                  onClick={e=>{accContext.accDispatch({type:'NAVIGATION',page:'chatofAcc'})}}
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
                  endIcon={<NextIcon />}
                  onClick={e=>{
                    if(service === undefined||service === null||service === ''){
                      accContext.accDispatch({type:'MSG',msg:{open:true,message:'Select a Business Activity',severity:'error'}}) 
                    }
                    else
                    createAccountSetup() 
                  }
                }
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