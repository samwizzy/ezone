/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Grid,
  MenuItem,
  Typography,
  Backdrop,
  CircularProgress,
  Dialog,
  Slide,
  Paper,
  TextField,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  flex: {
    display: 'flex',
    flex: '1 1 auto',
    margin: theme.spacing(1, 0),
    "& .MuiAutocomplete-root": {
      flex: 1
    }
  },
  mr_4: {
    marginRight: theme.spacing(4)
  },
  ml_4: {
    marginLeft: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(1, 0),
    margin: theme.spacing(1, 0),
    "& > div": {
      margin: theme.spacing(3),
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const JobForm = props => {
  const classes = useStyles();

  const [form, setForm] = React.useState({
    jobName: '',
    description: '',
    supervisor: null,
    customer: null,
    estimatedDate: moment().format('YYYY-MM-DD'),
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    expense: '',
    revenue: '',
    jobLocation: '',
    jobType: '',
    country: '',
    state: '',
    actualStartDate: moment().format('YYYY-MM-DD'),
    actualEndDate: moment().format('YYYY-MM-DD'),
  });

  const { loading, employees, createJob, updateJob } = props;

  React.useEffect(() => {
  }, []);

  const uploadFileAction = file => {
    setForm({ ...form, image: file });
  };

  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSelectChange = name => (event, obj) => {
    setForm({ ...form, [name]: obj.value });
  };

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DD') });
  };

  const handleSubmit = () => {
    createJob(form)
  }

  console.log(form, 'form');
  console.log(employees, 'employees');

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static" color="inherit" elevation={2}>
            <Toolbar variant="dense">
              <Typography variant="h6" className={classes.title}>
                New Job
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item md={12}>
          <Paper className={classes.paper}>
            <div>
              <div className={classes.flex}>
                <TextField
                  className={classes.mr_4}
                  name="jobName"
                  label="Job Name"
                  id="outlined-title"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  value={form.jobName}
                  onChange={handleChange}
                />
                <TextField
                  className={classes.ml_4}
                  name="description"
                  label="Description"
                  id="outlined-description"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
              <div className={classes.flex}>
                <Autocomplete
                  className={classes.mr_4}
                  id="combo-box-supervisor"
                  name="supervisor"
                  size="small"
                  options={employees ? employees : []}
                  getOptionLabel={option => option.firstName + ' ' + option.lastName}
                  onChange={handleSelectChange('supervisor')}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Supervisor"
                      variant="outlined"
                      placeholder="Search"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
                <Autocomplete
                  className={classes.ml_4}
                  id="combo-box-customer"
                  name="customer"
                  size="small"
                  options={employees ? employees : []}
                  getOptionLabel={option => option.firstName + ' ' + option.lastName}
                  onChange={handleSelectChange('customer')}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Customer"
                      variant="outlined"
                      placeholder="Search"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
              </div>
              <div className={classes.flex}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.mr_4}
                    margin="normal"
                    fullWidth
                    inputVariant="outlined"
                    id="date-picker-dialog"
                    label="Estimated date"
                    size="small"
                    format="dd/MM/yyyy"
                    name="date"
                    value={form.estimatedDate}
                    onChange={handleDateChange('estimatedDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.ml_4}
                    margin="normal"
                    fullWidth
                    inputVariant="outlined"
                    id="date-picker-start-date"
                    label="Start Date"
                    size="small"
                    format="dd/MM/yyyy"
                    name="date"
                    value={form.startDate}
                    onChange={handleDateChange('startDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div className={classes.flex}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    fullWidth
                    inputVariant="outlined"
                    id="date-picker-dialog"
                    label="End Date"
                    size="small"
                    format="dd/MM/yyyy"
                    name="date"
                    value={form.endDate}
                    onChange={handleDateChange('endDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div className={classes.flex}>
                <Button size="small" color="primary" variant="contained" disableElevation>
                  Next
                </Button>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item md={12}>
          <Paper className={classes.paper}>
            <div>
              <div className={classes.flex}>
                <TextField
                  className={classes.mr_4}
                  name="expense"
                  label="Expense"
                  id="outlined-expense"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  value={form.expense}
                  onChange={handleChange}
                />
                <TextField
                  className={classes.ml_4}
                  name="revenue"
                  label="Revenue"
                  id="outlined-revenue"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  value={form.revenue}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid item md={12}>
          <Paper className={classes.paper}>
            <div>
              <div className={classes.flex}>
                <TextField
                  className={classes.mr_4}
                  name="jobName"
                  label="Job Location"
                  id="outlined-job-location"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  value={form.jobLocation}
                  onChange={handleChange}
                />
                <TextField
                  className={classes.ml_4}
                  id="job-type"
                  name="jobType"
                  placeholder="Status"
                  select
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  size="small"
                  label="Job Type"
                  value={form.jobType}
                  onChange={handleChange}
                >
                  {[].map((option, i) =>
                    <MenuItem key={i} value={option.label}>
                      {option.label}
                    </MenuItem>
                  )}
                </TextField>
              </div>
              <div className={classes.flex}>
                <Autocomplete
                  className={classes.mr_4}
                  id="combo-box-country"
                  name="country"
                  size="small"
                  options={employees ? employees : []}
                  getOptionLabel={option => option.firstName + ' ' + option.lastName}
                  onChange={handleSelectChange('country')}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Country"
                      variant="outlined"
                      placeholder="Search"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
                <Autocomplete
                  className={classes.ml_4}
                  id="combo-box-state"
                  name="state"
                  size="small"
                  options={employees ? employees : []}
                  getOptionLabel={option => option.firstName + ' ' + option.lastName}
                  onChange={handleSelectChange('state')}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="State"
                      variant="outlined"
                      placeholder="Search"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
              </div>
              <div className={classes.flex}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.mr_4}
                    margin="normal"
                    fullWidth
                    inputVariant="outlined"
                    id="date-picker-actual-start-date"
                    label="Actual Start Date"
                    size="small"
                    format="dd/MM/yyyy"
                    name="actualStartDate"
                    value={form.actualStartDate}
                    onChange={handleDateChange('actualStartDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.ml_4}
                    margin="normal"
                    fullWidth
                    inputVariant="outlined"
                    id="date-picker-actual-end-date"
                    label="Actual End Date"
                    size="small"
                    format="dd/MM/yyyy"
                    name="actualEndDate"
                    value={form.actualEndDate}
                    onChange={handleDateChange('actualEndDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

JobForm.propTypes = {
  loading: PropTypes.bool,
  closeNewJobDialog: PropTypes.func,
  updateJob: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employees: Selectors.makeSelectEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    createJob: evt => dispatch(Actions.createJob(evt)),
    updateJob: evt => dispatch(Actions.updateJob(evt)),
    closeNewJobDialog: () => dispatch(Actions.closeNewJobDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(JobForm);
