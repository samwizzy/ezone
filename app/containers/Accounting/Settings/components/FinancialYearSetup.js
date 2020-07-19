import React ,{useContext,useState}from 'react';
import {
  makeStyles,
  Box,
  Button,
  Divider,
  Paper,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';

import 'date-fns';

import { Autocomplete } from '@material-ui/lab';
import SendIcon from '@material-ui/icons/ArrowForward';
import Radio from '@material-ui/core/Radio';
import Logo from '../images/Logo.svg';
import * as Enums from '../enums';
import accSettingDemo2 from '../images/accSettingDemo2.svg';
import NigeriaFlag from '../images/flag/nigeria.png';
import UsaFlag from '../images/flag/usa.png';
import EnglandFlag from '../images/flag/great-britain.png';
import CanadaFlag from '../images/flag/canada.png';
import SpainFlag from '../images/flag/spain.png';
import { AccSetupContext } from './AccountSetup';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2, 2),
    color: theme.palette.text.secondary,
  },
  sideDemo: {
    // backgroundImage: 'linear-gradient(13.98deg, #1A88E1 4.45%, rgba(255, 255, 255, 0) 85.58%)',
    backgroundColor: theme.palette.background.paper,
  },
  bgImage: {
    width: '100%',
    height: '493px',
    backgroundImage: `url(${accSettingDemo2})`,
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  control: {
    padding: theme.spacing(2),
  },
  box: {
    textAlign: 'center',
  },
  boxed: {
    textAlign: 'left',
    paddingRight: '5em',
    paddingTop: '5px',
  },
  boxedI: {
    paddingRight: '1em',
  },
  accMethod: {
    textAlign: 'left',
    marginTop: '-1px',
  },
  note: {
    textAlign: 'left',
    position: 'relative',
    top: '-2.5px',
    left: '-1.1em',
  },
  nextButton: {
    paddingRight: '10px',
  },
  smallHeader: {
    fontWeight: 500,
  },
  smallHeaderWithLift: {
    fontWeight: 500,
    marginBottom: '5px',
  },
  lightLift: {
    marginBottom: '20px',
  },
  flag: {
    width: '20px',
    marginRight: '5px',
  },
}));

const FinancialYearSetup = () => {
  const classes = useStyles();
  const accContext = useContext(AccSetupContext);
  const [service, setService] = useState(OnlyBussinessLabel(accContext.accState.businessActivity))
  const months = [
    {
      value: 1,
      label: 'January',
    },
    {
      value: 2,
      label: 'Febuary',
    },
    {
      value: 3,
      label: 'March',
    },
    {
      value: 4,
      label: 'April',
    },
    {
      value: 5,
      label: 'May',
    },
    {
      value: 6,
      label: 'June',
    },
    {
      value: 7,
      label: 'July',
    },
    {
      value: 8,
      label: 'August',
    },
    {
      value: 9,
      label: 'September',
    },
    {
      value: 10,
      label: 'October',
    },
    {
      value: 11,
      label: 'November',
    },
    {
      value: 12,
      label: 'December',
    },
  ];

  function leapYear(year) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }

  function calculateDaysOfMonth(length) {
    let days = [{ label: '1', value: 1 }];
    for (let i = 2; i <= length; i++) {
      days = [...days, { label: `${i}`, value:i }];
    }
    return days;
  }

  function getDaysOfTheMonth(value) {
    switch (value) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return calculateDaysOfMonth(31);
      case '2': {
        if (leapYear(new Date().getFullYear())) {
          return calculateDaysOfMonth(29);
        }
        return calculateDaysOfMonth(28);
      }
      case 4:
      case 6:
      case 9:
      case 11:
        return calculateDaysOfMonth(30);
    }
  }

  const [dmonth, setDmonth] = React.useState(1);

  function setMonthForCalender(event, value) {
    setDmonth(value.value);
  }

  const currencies = [
    { code: 'GBP', label: 'Pound Sterling' },
    { code: 'EUR', label: 'Spain' },
    { code: 'NGN', label: 'Nigeria Naira' },
    { code: 'USD', label: 'US Dollar' },
    { code: 'CAD', label: 'Canadian Dollar' },
  ];

  const flag = cFlag => <img className={classes.flag} src={cFlag} />;

  function currencyToFlag(isoCode) {
    
    switch (isoCode) {
      case 'NGN':
        return NigeriaFlag;
      case 'USD':
        return UsaFlag;
      case 'EUR':
        return SpainFlag;
      case 'CAD':
        return CanadaFlag;
      case 'GBP':
        return EnglandFlag;
    }
  }

  function labelOnly(code){
   switch(code){
    case 'NGN':
      return 'Nigeria Naira';
    case 'USD':
      return 'US Dollar';
    case 'EUR':
      return 'Spain';
    case 'CAD':
      return 'Canadian Dollar';
    case 'GBP':
      return 'Pound Sterling';
  }
  }

  function monthOnly(month){
    switch(month){
      
        case 1 :
        return 'January'
        case 2 :
          return 'Febuary'
        case 3 :
         return 'March'  
         case 4 :
          return 'April'
        case 5 :
          return 'May'
        case 6 :
          return 'June'  
        case 7 :
          return 'July'
        case 8 :
          return 'August' 
        case 9 :
          return 'September' 
        case 10 :
          return 'October'   
        case 11 :
            return 'November'
         default :
         return 'December'  
    }
  }

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

  function OnlyBussinessLabel(value) {
    switch (value) {
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
   
  const canSubmitValues = () => {
    const ready =
    accContext.accState.accountMethod.length > 0 &&
    accContext.accState.startDay > 0 &&
    accContext.accState.currency.length > 0 &&
    accContext.accState.startMonth > 0;
    return ready;
  };

  function formatDate(value){
    let date = (new Date()).toISOString()
    let k = date.indexOf('T');
    return `${value}T${date.substring(k+1)}`;

  }

  function onNextPage(e){
    e.preventDefault();
    accContext.accDispatch({type:'NAVIGATION',page:'chatofAcc'})
    //createAccountingSetupAction(values)
  }


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

        <Grid item xs={6} className={classes.sideDemo}>
          <div className={classes.bgImage} />
        </Grid>
        <Grid item xs={6}>
          <Paper square elevation={0} className={classes.paper}>
            <Grid item xs={12}>
              <div>
                <Typography
                  variant="h5"
                  className={classes.smallHeader}
                  color="textPrimary"
                >
                  Financial year starts:
                </Typography>
                <Box p={0} className={classes.boxed}>
                  <p className={classes.accMethod}>
                    Accural accounting reports revenue and expences as they are
                    earned and incurred
                  </p>
                </Box>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Box p={1} className={classes.boxed}>
                <Typography
                  variant="h6"
                  className={classes.smallHeaderWithLift}
                  color="textPrimary"
                >
                  Start Date
                </Typography>
                <div className={classes.lightLift}>
                  <Autocomplete
                    id="months"
                    options={months}
                    getOptionLabel={option => option.label}
                    onChange={(event, value) => {
                      setMonthForCalender(event, value);
                      accContext.accDispatch({type:'PAYLOAD',payload:{label:'startMonth',value:value.value}})
                    }}
                    style={{ width: 200 }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={accContext.accState.startMonth === 0 ? 'Select Month' : `Month ${monthOnly(accContext.accState.startMonth)}`}
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </div>
                <div className={classes.lightLift}>
                  <Autocomplete
                    id="days"
                    options={getDaysOfTheMonth(dmonth)}
                    getOptionLabel={option => option.label}
                    onChange={(event, value) => { 
                    accContext.accDispatch({type:'PAYLOAD',payload:{label:'startDay',value:value.value}})
                      // setFinancialYearDate();
                    }}

                    style={{ width: 200 }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={accContext.accState.startDay === 0 ? 'Select Day' : `Day ${accContext.accState.startDay}`}
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </div>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography
                variant="h5"
                className={classes.smallHeader}
                color="textPrimary"
              >
                Accounting Method:
              </Typography>
              <Grid item xs={12}>
                <Grid
                  container
                  justify="center"
                  className={classes.control}
                  spacing={0}
                >
                  <Grid item xs={3}>
                    <FormControl component="fieldset">
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value={Enums.AccountMethod.ACCURAL}
                          onChange={e => {
                            accContext.accDispatch({type:'PAYLOAD',payload:{label:'accountMethod',value:e.target.value}}) 
                          }}
                          checked={accContext.accState.accountMethod === Enums.AccountMethod.ACCURAL}
                          control={<Radio color="primary" />}
                          label="Accural"
                          labelPlacement="end"
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={9}>
                    <Box p={0} className={classes.boxedI}>
                      <p className={classes.accMethod}>
                        Accural accounting reports revenue and expences as they
                        are earned and incurred
                      </p>
                    </Box>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl component="fieldset">
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value={Enums.AccountMethod.CASH}
                          onChange={e => {
                            accContext.accDispatch({type:'PAYLOAD',payload:{label:'accountMethod',value:e.target.value}})  
                          }}
                          checked={accContext.accState.accountMethod === Enums.AccountMethod.CASH}
                          control={<Radio color="primary" />}
                          label="Cash"
                          labelPlacement="end"
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={9}>
                    <Box p={0} className={classes.boxedI}>
                      <p className={classes.accMethod}>
                        Cash accounting reports revenue and expenses as they are
                        recieved and paid
                      </p>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

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
                  onChange={(event, value) => {
                    accContext.accDispatch({ type: 'PAYLOAD', payload: { label: 'businessActivity', value: value.value } })
                    setService(OnlyBussinessLabel(value.value))
                  }
                  }
                  style={{ width: 300 }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label={accContext.accState.businessActivity === '' ? 'Select Business Service' : `${service}`}
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

            <Grid item xs={12}>
              <Typography
                variant="h5"
                className={`${classes.smallHeader} ${classes.lightLift}`}
                color="textPrimary"
              >
                Currency:
              </Typography>

              <div className={classes.lightLift}>
                <Autocomplete
                  id="currency"
                  style={{ width: 300 }}
                  options={currencies}
                  classes={{
                    option: classes.option,
                  }}
                  onChange={(event, value) =>{
                    accContext.accDispatch({type:'PAYLOAD',payload:{label:'currency',value:value.code}}) 
                }
                  }
                  autoHighlight
                  getOptionLabel={option => `${option.code} - ${option.label}`}
                  renderOption={option => (
                    <React.Fragment>
                      <span>{flag(currencyToFlag(option.code))}</span>
                      {option.label}
                    </React.Fragment>
                  )}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label={accContext.accState.currency.length < 2 ? 'Choose a currency' : `Currency ${accContext.accState.currency} - ${labelOnly(accContext.accState.currency)}`}
                      variant="outlined"
                    />
                  )}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <div>
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="end"
                      checked={accContext.accState.multiCurrency === true}
                      onChange ={()=>accContext.accDispatch({type:'PAYLOAD',payload:{label:'multiCurrency',value:!accContext.accState.multiCurrency}}) }
                      control={<Checkbox color="primary" />}
                      label="Enable Multicurrency"
                      labelPlacement="end"
                    />
                  </FormGroup>
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Grid
                container
                justify="center"
                className={classes.control}
                spacing={0}
              >
                <Grid item xs={2}>
                  <Typography
                    variant="h6"
                    className={classes.smallHeader}
                    color="textPrimary"
                  >
                    Note:
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <div >
                    <p style={{marginTop:'.2em'}}>
                      Your Finacial year or Accounting method cannot change
                      after Setup is completed
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <div className={classes.nextButton} align="right">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!canSubmitValues()}
                  onClick={onNextPage}
                  endIcon={<SendIcon />}
                >
                  Next
                </Button>
              </div>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default FinancialYearSetup


