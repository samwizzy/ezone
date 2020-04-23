import React, { memo } from 'react';
import PropTypes from 'prop-types';
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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { Autocomplete } from '@material-ui/lab';
import SendIcon from '@material-ui/icons/Send';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../App/selectors';
// import LoadingIndicator from '../../../components/LoadingIndicator';
import Logo from '../../../images/logo.svg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 0),
  },
  paper: {
    padding: theme.spacing(2, 0),
    color: theme.palette.text.secondary,
  },
  table: {
    margin: theme.spacing(5, 1),
    '& .MuiTableCell-body': {
      border: 0,
    },
  },
  box: {
    textAlign: 'center',
    border: `1px solid ${theme.palette.grey[100]}`,
  },
}));

const AccountSetting = props => {
  const classes = useStyles();
  const {} = props;

  const accountingMethodData = [
    {
      value: 'Accural',
      label: 'Accural',
    },
  ];

  const taxTypeData = [
    {
      value: 'Limited liability',
      label: 'Limited liability',
    },
  ];

  const currencyData = [
    {
      value: 'NGN',
      label: 'NGN',
    },
    {
      value: 'EUR',
      label: 'EUR',
    },
    {
      value: 'GBP',
      label: 'GBP',
    },
  ];

  const {
    currentUser,
    accountingSetupData,
    createAccountingSetupAction,
  } = props;

  console.log(props, 'props');

  console.log('accountingSetupData setting.js -> ', accountingSetupData);

  const [values, setValues] = React.useState({
    accountMethod: '',
    companyStartDate: '',
    currency: '',
    orgId: currentUser.organisation && currentUser.organisation.orgId,
    startDay: 0,
    startMonth: 0,
    taxDay: 0,
    taxMonth: 0,
    taxType: '',
  });

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleAccountingMethodSelectChange = (name, value) => {
    setValues({ ...values, accountMethod: value.value });
  };

  const handleTaxTypeSelectChange = (name, value) => {
    setValues({ ...values, taxType: value.value });
  };

  const handleCurrencySelectChange = (name, value) => {
    setValues({ ...values, currency: value.value });
  };

  const handleFinancialYearDateChange = date => {
    setValues({
      ...values,
      companyStartDate: moment(date).format('YYYY-MM-DD'),
      startDay: Number(moment(date).format('D')),
      startMonth: Number(moment(date).format('M')),
    });
  };

  const handleTaxYearDateChange = date => {
    setValues({
      ...values,
      taxDay: Number(moment(date).format('D')),
      taxMonth: Number(moment(date).format('M')),
    });
  };

  console.log('values -> ', values);

  //   if (loading) {
  //     return <LoadingIndicator />;
  //   }

  // if (accountingSetupData.id) {
  //   return props.history.push({ pathname: '/dashboard' });
  // }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={6}>
            <Paper square elevation={1} style={{ padding: '20px 10px' }}>
              <Paper square elevation={0} className={classes.paper}>
                <Box p={2} my={2} className={classes.box}>
                  <Typography variant="h4" color="textSecondary">
                    Welcome To <img src={Logo} height="40" /> Accounting
                  </Typography>
                </Box>
                <Box p={2} my={2} className={classes.box}>
                  <Typography variant="h6" color="textSecondary">
                    SetUp Your Accounting Structure
                  </Typography>
                </Box>
              </Paper>
              <Divider />

              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      <Typography variant="subtitle1" color="textSecondary">
                        Financial year starts
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                          <KeyboardDatePicker
                            margin="normal"
                            inputVariant="outlined"
                            id="date-picker-dialog"
                            label="Select Date"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleFinancialYearDateChange}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            fullWidth
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography variant="subtitle1" color="textSecondary">
                        Accounting method
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Autocomplete
                        id="combo-box-demo"
                        options={accountingMethodData}
                        getOptionLabel={option => option.label}
                        onChange={(evt, value) =>
                          handleAccountingMethodSelectChange(evt, value)
                        }
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Select Method"
                            className={classes.textField}
                            variant="outlined"
                            placeholder="Search"
                            fullWidth
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography variant="subtitle1" color="textSecondary">
                        Tax Type
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Autocomplete
                        id="combo-box-demo"
                        options={taxTypeData}
                        getOptionLabel={option => option.label}
                        onChange={(evt, value) =>
                          handleTaxTypeSelectChange(evt, value)
                        }
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Select Tax"
                            className={classes.textField}
                            variant="outlined"
                            placeholder="Search"
                            fullWidth
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography variant="subtitle1" color="textSecondary">
                        Tax year starts
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                          <KeyboardDatePicker
                            margin="normal"
                            inputVariant="outlined"
                            id="date-picker-dialog"
                            label="Select Date"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleTaxYearDateChange}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            fullWidth
                            variant="outlined"
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography variant="subtitle1" color="textSecondary">
                        Currency
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Autocomplete
                        id="combo-box-demo"
                        options={currencyData}
                        getOptionLabel={option => option.value}
                        onChange={(evt, value) =>
                          handleCurrencySelectChange(evt, value)
                        }
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Select Currency"
                            className={classes.textField}
                            variant="outlined"
                            placeholder="Search"
                            fullWidth
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" />
                    <TableCell align="left">
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
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Divider />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell />
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => createAccountingSetupAction(values)}
                        endIcon={<SendIcon />}
                      >
                        Save And Continue
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

AccountSetting.propTypes = {
  //   loading: PropTypes.bool,
  //   openNewAccountDialogAction: PropTypes.func,
  //   editOpenAccountDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // loading: Selectors.makeSelectLoading(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
  accountingSetupData: Selectors.makeSelectGetAccountingSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    // openNewAccountDialogAction: () => dispatch(Actions.openNewAccountDialog()),
    // editOpenAccountDialogAction: evt => dispatch(Actions.editOpenAccountDialog(evt)),
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
)(AccountSetting);
