import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  makeStyles,
  Card, CardHeader, CardContent, CardActions,
  Grid,
  FormLabel,
  FormControlLabel,
  FormControl,
  TextField,
  Radio,
  RadioGroup,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import _ from 'lodash';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    '& .MuiCardHeader-root': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .MuiCardContent-root': {
      justifyContent: 'flex-end',
    },
    '& .MuiCardActions-root': {
      padding: theme.spacing(1, 2),
    }
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  title: { flexGrow: 1 },
  toolbar: {
    border: `1px solid ${theme.palette.divider}`
  }
}));

const currencies = [
  { value: 'NGN', label: 'NGN' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
]

const NewPayrun = props => {
  const classes = useStyles(props);
  const { loading, form, handleChange, handleDateChange, handleSelectChange } = props;

  return (
    <Card className={classes.root} elevation={0}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormLabel>Pay Run schedule</FormLabel>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs>
                <TextField
                  id="payrun-name"
                  name="payrunName"
                  label="Pay Run name"
                  variant="outlined"
                  size="small"
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={form.payrunName}
                  onChange={handleChange}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    margin="normal"
                    fullWidth
                    inputVariant="outlined"
                    id="date-from-dialog"
                    label="From Date"
                    size="small"
                    format="dd/MM/yyyy"
                    name="fromDate"
                    value={form.fromDate}
                    onChange={handleDateChange('fromDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    margin="normal"
                    fullWidth
                    inputVariant="outlined"
                    id="date-payment-dialog"
                    label="Payment Date"
                    size="small"
                    format="dd/MM/yyyy"
                    name="paymentDate"
                    value={form.fromDate}
                    onChange={handleDateChange('paymentDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs>
                <Autocomplete
                  id="payrun-type"
                  options={[]}
                  getOptionLabel={option => option.label}
                  onChange={handleSelectChange('payrunType')}
                  value={form.payrunType}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      margin="normal"
                      size="small"
                      placeholder="Payrun Type"
                      fullWidth
                    />
                  )}
                />

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    margin="normal"
                    fullWidth
                    inputVariant="outlined"
                    id="date-to-dialog"
                    label="To Date"
                    size="small"
                    format="dd/MM/yyyy"
                    name="toDate"
                    value={form.toDate}
                    onChange={handleDateChange('toDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs></Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewPayrun);
