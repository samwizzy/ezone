import React, { memo } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {
  makeStyles,
  Box,
  Button,
  Divider,
  List,
  Paper,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';

import 'date-fns';
import RadioGroup from '@material-ui/core/RadioGroup';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { Autocomplete } from '@material-ui/lab';
import SendIcon from '@material-ui/icons/ArrowForward';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Radio from '@material-ui/core/Radio';
import reducer from '../reducer';
import saga from '../saga';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../../App/selectors';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import Logo from '../../../../images/Logo.svg';
import accSettingDemo from '../../../../images/accSettingDemo.jpg';
import accSettingDemo2 from '../../../../images/accSettingDemo2.svg';
import NigeriaFlag from '../../../../images/flag/nigeria.png';
import UsaFlag from '../../../../images/flag/usa.png';
import EnglandFlag from '../../../../images/flag/great-britain.png';
import CanadaFlag from '../../../../images/flag/canada.png';
import SpainFlag from '../../../../images/flag/spain.png';
import accSettingDemo3 from '../../../../images/accSettingDemo3.svg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2, 2),
    color: theme.palette.text.secondary,
  },
  table: {
    '& tr:last-child': {
      '& td': {
        borderTop: `1px solid ${theme.palette.divider}`,
      },
    },
    '& td': {
      border: 0,
    },
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
    top: '3.5px',
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

const AccountSetup = props => {
  const classes = useStyles();

  useInjectReducer({ key: 'settings', reducer });
  useInjectSaga({ key: 'settings', saga });

  const {} = props;

  const months = [
    {
      value: '1',
      label: 'January',
    },
    {
      value: '2',
      label: 'Febuary',
    },
    {
      value: '3',
      label: 'March',
    },
    {
      value: '4',
      label: 'April',
    },
    {
      value: '5',
      label: 'May',
    },
    {
      value: '6',
      label: 'June',
    },
    {
      value: '7',
      label: 'July',
    },
    {
      value: '8',
      label: 'August',
    },
    {
      value: '9',
      label: 'September',
    },
    {
      value: '10',
      label: 'October',
    },
    {
      value: '11',
      label: 'November',
    },
    {
      value: '12',
      label: 'December',
    },
  ];

  function leapYear(year) {
    console.log(`Leap Year ${year}`);
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }

  function calculateDaysOfMonth(length) {
    let days = [{ label: '1', value: '1' }];
    for (let i = 2; i <= length; i++) {
      days = [...days, { label: `${i}`, value: `${i}` }];
    }
    return days;
  }

  function getDaysOfTheMonth(value) {
    switch (value) {
      case '1':
      case '3':
      case '5':
      case '7':
      case '8':
      case '10':
      case '12':
        return calculateDaysOfMonth(31);
      case '2': {
        if (leapYear(new Date().getFullYear())) {
          return calculateDaysOfMonth(29);
        }
        return calculateDaysOfMonth(28);
      }
      case '4':
      case '6':
      case '9':
      case '11':
        return calculateDaysOfMonth(30);
    }
  }

  const [dmonth, setDmonth] = React.useState('1');

  function setMonthForCalender(event, value) {
    setDmonth(value.value);
  }

  function setDayForCalender(event, value) {
    const year = new Date().getFullYear();
    const cSDate = `${year}-${selectedAccountMonth}-${selectedAccountDay}`;
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

  const { loading, currentUser, createAccountingSetupAction } = props;

  const [values, setValues] = React.useState({
    accountMethod: 'Accural',
    companyStartDate: '',
    currency: '',
    orgId: currentUser.organisation && currentUser.organisation.orgId,
    startDay: '',
    startMonth: '',
    taxDay: '',
    taxMonth: '',
    taxType: '',
  });

  const canSubmitValues = () => {
    const ready =
      values.accountMethod.length > 0 &&
      values.startDay.length > 0 &&
      values.currency.length > 0 &&
      values.startMonth > 0;
    // const { accountMethod, companyStartDate, taxType, currency } = values;
    return ready;
  };

  const setFinancialYearDate = () => {
    const year = new Date().getFullYear();
    const cSDate = `${year}-${values.startMonth}-${values.startDay}`;
    setValues({
      ...values,
      companyStartDate: cSDate,
    });
  };

  console.log('values -> ', values);

  if (loading) {
    return <LoadingIndicator />;
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
                      const year = new Date().getFullYear();
                      const cSDate = `${year}-${value.value}-${
                        values.startDay
                      }`;
                      setValues({
                        ...values,
                        startMonth: value.value,
                        companyStartDate: cSDate,
                      });
                    }}
                    style={{ width: 200 }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Select Month"
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
                      if (values.startMonth.length > 0) {
                        const year = new Date().getFullYear();
                        const cSDate = `${year}-${values.startMonth}-${
                          value.value
                        }`;
                        setValues({
                          ...values,
                          startDay: value.value,
                          companyStartDate: cSDate,
                        });
                      } else {
                        setValues({ ...values, startDay: value.value });
                      }

                      // setFinancialYearDate();
                    }}
                    style={{ width: 200 }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Select Day"
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
                          value="Accural"
                          onChange={e => {
                            setValues({
                              ...values,
                              accountMethod: e.target.value,
                            });
                          }}
                          checked={values.accountMethod === 'Accural'}
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
                          value="Cash basis"
                          onChange={e => {
                            setValues({
                              ...values,
                              accountMethod: e.target.value,
                            });
                          }}
                          checked={values.accountMethod === 'Cash basis'}
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
                  onChange={(event, value) =>
                    setValues({ ...values, currency: value.code })
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
                      label="Choose a currency"
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
                  <div>
                    <Typography className={classes.note} variant="p">
                      Your Finacial year or Accounting method cannot change
                      after Setup is completed
                    </Typography>
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
                  onClick={() => createAccountingSetupAction(values)}
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

AccountSetup.propTypes = {
  // loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    createAccountingSetupAction: evt =>
      dispatch(Actions.createAccountingSetupAction(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AccountSetup);
