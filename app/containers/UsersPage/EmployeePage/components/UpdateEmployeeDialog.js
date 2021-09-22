/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem,
  DialogTitle,
  Slide,
} from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import Countries from '../../../../utils/countries_states.jsonson';

const gender = [
  {
    value: 'MALE',
    label: 'Male',
  },
  {
    value: 'FEMALE',
    label: 'Female',
  },
];

const statuses = ['ACTIVE', 'RESIGNED', 'TERMINATED', 'DECEASED'];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserProfileDialog = props => {
  const {
    loading,
    employees,
    employeeTypes,
    branches,
    departments,
    positions,
    empDialog,
    closeEditEmployeeDialog,
    updateEmployee,
  } = props;

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    dob: null,
    jobDesc: '',
    gender: '',
    status: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    reportingTo: null,
  });

  useEffect(() => {
    if (empDialog.data) {
      setValues({
        ...empDialog.data,
      });
    }
  }, [empDialog.data]);

  const canBeSubmitted = () => {
    const { firstName, lastName, phoneNumber, address, gender } = values;
    return firstName && lastName && phoneNumber && address && gender;
  };

  const handleSelectChange = name => (event, obj) => {
    name === 'state'
      ? setValues({ ...values, [name]: obj })
      : setValues({ ...values, [name]: obj.name }); // country
  };

  const handleOptionChange = name => (event, obj) => {
    setValues({ ...values, [name]: obj });
  };

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date, name) => {
    setValues(_.set({ ...values }, name, moment(date).format('YYYY-MM-DD')));
  };

  console.log(values, 'values');

  return (
    <Dialog
      {...empDialog.props}
      onClose={closeEditEmployeeDialog}
      keepMounted
      TransitionComponent={Transition}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {empDialog.type === 'new' ? '' : 'Update user'}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              id="first-name"
              label="First name"
              variant="outlined"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              margin="dense"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="last-name"
              label="Last name"
              variant="outlined"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              margin="dense"
              fullWidth
            />
          </Grid>

          <Grid item xs={7}>
            <TextField
              id="email-address"
              label="Email address"
              variant="outlined"
              name="emailAddress"
              value={values.emailAddress}
              onChange={handleChange}
              margin="dense"
              fullWidth
            />
          </Grid>

          <Grid item xs={5}>
            <TextField
              id="employment-status"
              name="employeeStatus"
              required
              placeholder="Select employment status"
              select
              fullWidth
              margin="dense"
              variant="outlined"
              label="Employment status"
              value={values.status}
              onChange={handleChange}
            >
              <MenuItem value="">Select employment status</MenuItem>
              {statuses.map((status, i) => (
                <MenuItem key={i} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={7}>
            <TextField
              id="phone-number"
              label="Phone number"
              type="number"
              variant="outlined"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              margin="dense"
              fullWidth
            />
          </Grid>

          <Grid item xs={5}>
            <TextField
              id="select-gender"
              label="Select gender"
              variant="outlined"
              margin="dense"
              name="gender"
              value={values.gender}
              onChange={handleChange}
              select
              fullWidth
            >
              {gender.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="job-desc"
              name="jobDesc"
              label="Job description"
              fullWidth
              margin="dense"
              value={values.jobDesc}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              id="reporting-to"
              options={employees}
              getOptionLabel={option =>
                `${option.firstName} ${option.lastName}`
              }
              value={
                values.reportingTo
                  ? _.find(employees, { id: values.reportingTo.id })
                  : null
              }
              onChange={handleOptionChange('reportingTo')}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Reporting to"
                  variant="outlined"
                  placeholder="Search"
                  margin="dense"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              id="employee-type"
              options={employeeTypes}
              getOptionLabel={option => option.name}
              value={
                values.employeeType
                  ? _.find(employeeTypes, { id: values.employeeType.id })
                  : null
              }
              onChange={handleOptionChange('employeeType')}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Employee types"
                  variant="outlined"
                  placeholder="Search"
                  margin="dense"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              id="position"
              options={positions}
              getOptionLabel={option => option.name}
              value={
                values.position
                  ? _.find(positions, { id: values.position.id })
                  : null
              }
              onChange={handleOptionChange('position')}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Positions"
                  variant="outlined"
                  placeholder="Search"
                  margin="dense"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                disableFuture
                format="dd/MM/yyyy"
                inputVariant="outlined"
                margin="dense"
                fullWidth
                id="date-of-birth"
                label="Date of birth"
                value={values.dob}
                onChange={date => handleDateChange(date, 'dob')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              id="select-countries"
              options={Countries}
              getOptionLabel={option => option.name}
              getOptionSelected={option => option.name === values.country}
              value={
                values.country
                  ? _.find(Countries, { name: values.country })
                  : null
              }
              onChange={handleSelectChange('country')}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Countries"
                  variant="outlined"
                  placeholder="Search"
                  margin="dense"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id="select-country-state"
              options={
                values.country
                  ? _.find(Countries, { name: values.country }).states
                  : []
              }
              getOptionLabel={option => option}
              onChange={handleSelectChange('state')}
              value={values.state}
              renderInput={params => (
                <TextField
                  {...params}
                  label="State"
                  variant="outlined"
                  placeholder="Search"
                  margin="dense"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="city"
              label="City"
              id="outlined-city"
              fullWidth
              margin="dense"
              variant="outlined"
              value={values.city}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="standard-address"
              label="Address"
              variant="outlined"
              name="address"
              value={values.address}
              onChange={handleChange}
              margin="dense"
              fullWidth
              rows={2}
              multiline
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => updateEmployee(values)}
          color="primary"
          variant="contained"
          disabled={loading ? loading : !canBeSubmitted()}
          endIcon={loading && <CircularProgress size={16} />}
        >
          Save
        </Button>
        <Button
          onClick={() => closeEditEmployeeDialog()}
          color="primary"
          variant="outlined"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UserProfileDialog.propTypes = {
  loading: PropTypes.bool,
  empDialog: PropTypes.object,
  updateEmployee: PropTypes.func,
  closeEditEmployeeDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  empDialog: Selectors.makeSelectUpdateEmpDialog(),
  employees: Selectors.makeSelectEmployees(),

  departments: Selectors.makeSelectDepartmentsByOrgIdApi(),
  employeeTypes: Selectors.makeSelectEmployeeTypes(),
  payRates: Selectors.makeSelectPayRates(),
  payTypes: Selectors.makeSelectPayTypes(),
  branches: Selectors.makeSelectBranches(),
  positions: Selectors.makeSelectPositions(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateEmployee: data => dispatch(Actions.updateEmployee(data)),
    closeEditEmployeeDialog: () => dispatch(Actions.closeEditEmployeeDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserProfileDialog);
