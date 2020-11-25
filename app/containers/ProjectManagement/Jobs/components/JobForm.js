/* eslint-disable no-nested-ternary */
import React, { Fragment, memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  makeStyles,
  Button,
  Card, CardHeader, CardContent, CardActions,
  Checkbox,
  IconButton,
  Grid,
  FormControl,
  FormControlLabel,
  MenuItem,
  Typography,
  TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import countries_states from '../../../../utils/countries_states.json';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& .MuiCardActions-root': {
      justifyContent: "flex-end"
    }
  },
  title: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const types = [
  { label: "Manufacturing", value: "manufacturing" },
  { label: "Production", value: "production" },
  { label: "Business", value: "business" },
]

const phaseInitialState = {
  description: "",
  expense: 0,
  phase: "",
  revenue: 0,
  unit: ""
}

const initialState = {
  actualEndDate: moment().format("YYYY-MM-DD"),
  actualStartDate: moment().format("YYYY-MM-DD"),
  country: "",
  customer: "",
  description: "",
  endDate: moment().format("YYYY-MM-DD"),
  estimatedDate: moment().format("YYYY-MM-DD"),
  expense: 0,
  location: "",
  name: "",
  orgId: "",
  phases: [{ ...phaseInitialState }],
  revenue: 0,
  startDate: moment().format("YYYY-MM-DD"),
  supervisor: "",
  type: ""
}

const JobForm = props => {
  const classes = useStyles();
  const [options, setOptions] = useState({ phases: false });
  const [form, setForm] = useState({ ...initialState });

  const { loading, employees, customers, createJob, updateJob } = props;

  const addMore = event => {
    setForm({ ...form, phases: [...form.phases, phaseInitialState] });
  };

  const removeMore = i => event => {
    setForm({ ...form, phases: form.phases.filter((phase, x) => x !== i) });
  };

  const handleChange = event => {
    const { name, value, type, checked } = event.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleRowChange = index => event => {
    const { phases } = form
    phases[index][event.target.name] = event.target.value
    setForm({ ...form, phases });
  };

  const handleOptionsChange = event => {
    const { name, value, type, checked } = event.target
    setOptions({ ...options, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSelectChange = name => (event, obj) => {
    if (name === "country") {
      setForm({ ...form, [name]: obj ? obj.name : obj });
    } else if (name === "state") {
      setForm({ ...form, [name]: obj });
    } else if (name === "customer" || name === "supervisor") {
      setForm({ ...form, [name]: obj ? obj.fullName : obj });
    } else {
      setForm({ ...form, [name]: obj ? obj.name : obj });
    }
  };

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DD') });
  };

  const handleSubmit = () => {
    createJob(form)
  }

  console.log(form, 'form');
  console.log(options, 'options');
  console.log(customers, 'customers');
  console.log(employees, 'employees');
  console.log(countries_states, 'countries_states');

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Typography variant="h6" className={classes.title}>
            New Job
          </Typography>
        }
      />

      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              name="name"
              label="Job Name"
              id="outlined-title"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              value={form.name}
              onChange={handleChange}
            />

            <Autocomplete
              id="job-supervisor"
              name="supervisor"
              size="small"
              options={employees}
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

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                fullWidth
                inputVariant="outlined"
                id="estimated-date"
                label="Estimated date"
                size="small"
                format="dd/MM/yyyy"
                value={form.estimatedDate}
                onChange={handleDateChange('estimatedDate')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                fullWidth
                inputVariant="outlined"
                id="end-date"
                label="End Date"
                size="small"
                format="dd/MM/yyyy"
                value={form.endDate}
                onChange={handleDateChange('endDate')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
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

            <Autocomplete
              id="combo-box-customer"
              name="customer"
              size="small"
              options={customers}
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

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
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

            <FormControl margin="normal">
              <Button size="small" color="primary" variant="contained" disableElevation>
                Next
              </Button>
            </FormControl>
          </Grid>

          <Grid item md={12}>
            <FormControlLabel
              control={<Checkbox checked={options.phases} onChange={handleOptionsChange} name="phases" />}
              label="Phases"
            />
          </Grid>

          {options.phases ?
            <Grid item xs={12}>
              {form.phases && form.phases.map((phase, i) =>
                <Grid container spacing={2} key={i} alignItems="center">
                  <Grid item xs={3}>
                    <TextField
                      name="phase"
                      label="Phase"
                      id={`outlined-phase-${i}`}
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={phase.phase}
                      onChange={handleRowChange(i)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      name="description"
                      label="Description"
                      id={`outlined-phase-description-${i}`}
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={phase.description}
                      onChange={handleRowChange(i)}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      name="unit"
                      label="Unit"
                      id={`outlined-phase-unit-${i}`}
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={phase.unit}
                      onChange={handleRowChange(i)}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      name="expense"
                      label="Expense"
                      id={`outlined-phase-expense-${i}`}
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={phase.expense}
                      onChange={handleRowChange(i)}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      name="revenue"
                      label="Revenue"
                      id={`outlined-phase-revenue-${i}`}
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={phase.revenue}
                      onChange={handleRowChange(i)}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    {i !== 0 && <IconButton onClick={removeMore(i)}><CloseIcon /></IconButton>}
                  </Grid>
                </Grid>
              )}

              <FormControl margin="normal">
                <Button size="small" color="primary" onClick={addMore}>Add more</Button>
              </FormControl>
            </Grid>
            :
            <Fragment>
              <Grid item xs={6}>
                <TextField
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
              </Grid>
              <Grid item xs={6}>
                <TextField
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
              </Grid>
            </Fragment>
          }

          <Grid item md={6}>
            <TextField
              name="location"
              label="Location"
              id="job-location"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              value={form.location}
              onChange={handleChange}
            />

            <Autocomplete
              id="combo-box-country"
              name="country"
              size="small"
              options={countries_states}
              getOptionLabel={option => option.name}
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
              id="combo-box-state"
              name="state"
              size="small"
              options={form.country ? countries_states.find(country => country.name === form.country).states : []}
              getOptionLabel={option => option}
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
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="job-type"
              name="type"
              select
              fullWidth
              variant="outlined"
              margin="normal"
              size="small"
              label="Type"
              value={form.type}
              onChange={handleChange}
            >
              {types.map((option, i) =>
                <MenuItem key={i} value={option.value}>
                  {option.label}
                </MenuItem>
              )}
            </TextField>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                fullWidth
                inputVariant="outlined"
                id="actual-start-date"
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
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Button
          onClick={() => { }}
          variant="contained"
          disableElevation
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disableElevation
        >
          Save
        </Button>
      </CardActions>
    </Card >
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
  customers: Selectors.makeSelectCustomers(),
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
