import React, { memo, useState } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as Selectors from './../selectors';
import {
  makeStyles,
  Button,
  CardActions,
  Paper,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormControl,
  Table, TableBody, TableRow, TableCell,
  Toolbar,
  RadioGroup
} from '@material-ui/core';
import _ from 'lodash';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Autocomplete } from '@material-ui/lab';
import SendIcon from '@material-ui/icons/ArrowForward';
import Radio from '@material-ui/core/Radio';
import Logo from '../images/logo.svg';
import accSettingDemo2 from '../images/accSettingDemo2.svg';
import NigeriaFlag from '../images/flag/nigeria.png';
import UsaFlag from '../images/flag/usa.png';
import EnglandFlag from '../images/flag/great-britain.png';
import CanadaFlag from '../images/flag/canada.png';
import SpainFlag from '../images/flag/spain.png';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 200,
    '& tr': {
      '& td:first-child': {
        whiteSpace: 'nowrap'
      }
    },
    '& tr:last-child': {
      '& td': {
        border: 0
      }
    }
  },
  paper: {
    padding: theme.spacing(2, 2),
    color: theme.palette.text.secondary,
  },
  flag: {
    width: 20,
    marginRight: theme.spacing(1),
  },
  toolbar: {
    ...theme.mixins.toolbar,
    background: theme.palette.grey[50],
    border: `2px dotted ${theme.palette.divider}`
  }
}));

const FinancialYearSetup = (props) => {
  const classes = useStyles();
  const { businessTypes, currencies, form, handleNext, handleChange, handleDateChange, handleSelectChange } = props

  console.log(businessTypes, "businessTypes in financial setup")
  console.log(currencies, "currencies in financial setup")

  const flag = src => <img className={classes.flag} src={src} />;

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

  const canSubmitValues = () => {
    return (
      form.accountMethod && form.businessType && form.startDay > 0 &&
      form.currency && form.startMonth > 0
    )
  };

  return (
    <div>
      <Paper square elevation={0} className={classes.paper}>
        <Grid item xs={12}>
          <Typography variant="h5" color="textPrimary">
            Financial year starts:
          </Typography>
          <Typography>
            Accural accounting reports revenue and expences as they are
            earned and incurred
          </Typography>
        </Grid>

        <Grid item xs>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              disableToolbar
              id="start-month"
              inputVariant="outlined"
              format="MMMM"
              margin="normal"
              views={["month"]}
              name="month"
              label="Start Month"
              value={form.startMonth}
              onChange={handleDateChange('startMonth')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              disableToolbar
              leftArrowIcon={false}
              rightArrowIcon={false}
              id="start-day"
              inputVariant="outlined"
              format="dd"
              margin="normal"
              views={["date"]}
              name="startDay"
              label="Start Day"
              value={`${form.startMonth}-${form.startDay}`}
              onChange={handleDateChange('startDay')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Toolbar variant="dense" className={classes.toolbar}>
          <Typography variant="subtitle1" color="textPrimary">
            Accounting Method
          </Typography>
        </Toolbar>

        <FormControl component="fieldset">
          <RadioGroup aria-label="account-method" name="accountMethod" value={form.accountMethod} onChange={handleChange}>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <FormControlLabel
                      value='ACCURAL'
                      checked={form.accountMethod === 'ACCURAL'}
                      control={<Radio color="primary" />}
                      label="Accural"
                      labelPlacement="end"
                    />
                  </TableCell>
                  <TableCell>
                    Accural accounting reports revenue and expences as they
                    are earned and incurred
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <FormControlLabel
                      value='CASH'
                      checked={form.accountMethod === 'CASH'}
                      control={<Radio color="primary" />}
                      label='Cash'
                      labelPlacement="end"
                    />
                  </TableCell>
                  <TableCell>
                    Cash accounting reports revenue and expenses as they are
                    recieved and paid
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </RadioGroup>
        </FormControl>

        <Toolbar variant="dense" className={classes.toolbar}>
          <Typography variant="subtitle1" color="textPrimary">
            Business Activity
          </Typography>
        </Toolbar>

        <Autocomplete
          id="business-type"
          options={businessTypes}
          getOptionLabel={option => option.name}
          onChange={handleSelectChange('businessType')}
          style={{ width: 300 }}
          renderInput={params => (
            <TextField
              {...params}
              label='Select Business Type'
              variant="outlined"
              margin="normal"
              placeholder="Business Type"
            />
          )}
        />

        <Autocomplete
          id="currency"
          style={{ width: 300 }}
          options={currencies}
          onChange={handleSelectChange('currency')}
          value={form.currency}
          autoHighlight
          getOptionLabel={option => option ? `${option.code} - ${option.name}` : ""}
          renderOption={option => (
            <React.Fragment>
              <span>{flag(currencyToFlag(option.code))}</span>
              {option.name}
            </React.Fragment>
          )}
          renderInput={params => (
            <TextField
              {...params}
              label='Choose a currency'
              variant="outlined"
              margin="normal"
            />
          )}
        />

        <FormControl component="fieldset">
          <FormControlLabel
            name="multiCurrency"
            value="end"
            checked={form.multiCurrency === true}
            onChange={handleChange}
            control={<Checkbox color="primary" />}
            label="Enable Multicurrency"
            labelPlacement="end"
          />
        </FormControl>

        <Typography variant="overline" component="h1" gutterBottom>
          Your Financial year or Accounting method cannot change after Setup is completed
        </Typography>
      </Paper>

      <CardActions>
        <Button
          variant="contained"
          color="primary"
          disabled={!canSubmitValues()}
          onClick={handleNext}
          endIcon={<SendIcon />}
        >
          Next
        </Button>
      </CardActions>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  businessTypes: Selectors.makeSelectBusinessTypes(),
  currencies: Selectors.makeSelectCurrencies(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
  memo,
)(FinancialYearSetup);


