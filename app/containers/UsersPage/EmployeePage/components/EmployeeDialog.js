/* eslint-disable no-nested-ternary */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {
  CircularProgress,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  MenuItem,
  DialogTitle,
  Slide,
} from '@material-ui/core';
import moment from 'moment';
import _ from 'lodash';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import Countries from '../../../../utils/countries_states.json';

const gender = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const statuses = ['ACTIVE', 'RESIGNED', 'TERMINATED', 'DECEASED'];

const EmployeeDialog = props => {
  const {
    loading,
    employees,
    employeeDialog,
    closeNewEmployeeDialog,
    createEmployee,
    branches,
    departments,
    positions,
    employeeTypes,
    sourcesOfHire,
    payRates,
    payTypes
  } = props;

  console.log(branches, 'branches');
  console.log(departments, 'departments');
  console.log(positions, 'positions');
  console.log(employeeTypes, 'employeeTypes');
  console.log(sourcesOfHire, 'sourcesOfHire');
  console.log(payRates, 'payRates');
  console.log(payTypes, 'payTypes');

  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    address: '',
    gender: '',

    mobileNo: '',
    workPhone: '',
    nickName: '',
    employmentDate: null,
    branchId: '',
    employeeStatus: '',
    employeeType: '',
    sourceOfHire: '',
    positionId: '',
    extension: '',
    education: [],
    departmentId: '',
    reportingTo: '',
    payRate: '',
    payType: '',
    dob: null,
    maritalStatus: '',
    country: '',
    city: '',
    state: '',
    designation: null,
    jobDesc: '',
    about: '',
  });

  const canBeSubmitted = () => {
    const {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      address,
      gender,
      departmentId,
      branchId,
      positionId,
      employeeType,
      sourceOfHire,
      payRate,
      payType
    } = values;
    return (
      firstName !== '' &&
      lastName !== '' &&
      emailAddress !== '' &&
      phoneNumber !== '' &&
      address !== '' &&
      gender !== '' &&
      departmentId !== '' &&
      branchId !== '' &&
      positionId !== '' &&
      employeeType !== '' &&
      sourceOfHire !== '' &&
      payRate !== '' &&
      payType !== '' 
    );
  };

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSelectChange = name => (event, obj) => {
    name === 'state'
      ? setValues({ ...values, [name]: obj })
      : setValues({ ...values, [name]: obj.name }); // country
  };

  const handleDateChange = (date, name) => {
    setValues(_.set({ ...values }, name, moment(date).format('YYYY-MM-DD')));
  };

  const handleSubmit = () => {
    createEmployee(values);
  };

  return (
    <Dialog
      {...employeeDialog.props}
      onClose={closeNewEmployeeDialog}
      keepMounted
      TransitionComponent={Transition}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {employeeDialog.type === 'new' ? 'New Employee' : 'Edit Employee'}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              id="first-name"
              required
              label="First name"
              name="firstName"
              variant="outlined"
              size="small"
              margin="dense"
              value={values.firstName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="Last-Name"
              required
              label="Last name"
              name="lastName"
              variant="outlined"
              size="small"
              value={values.lastName}
              onChange={handleChange}
              margin="dense"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="email-address"
              required
              label="Email"
              name="emailAddress"
              type="email"
              variant="outlined"
              size="small"
              value={values.emailAddress}
              onChange={handleChange}
              margin="dense"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="phone-number"
              required
              label="Phone number"
              name="phoneNumber"
              type="number"
              variant="outlined"
              size="small"
              value={values.phoneNumber}
              onChange={handleChange}
              margin="dense"
              fullWidth
            />
          </Grid>

          <Grid item xs={7}>
            <TextField
              id="branch"
              name="branchId"
              required
              placeholder="Select branch"
              select
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Branch"
              value={values.branchId}
              onChange={handleChange}
            >
              <MenuItem value="">Select branch</MenuItem>
              {branches.map(branch => (
                <MenuItem key={branch.id} value={branch.id}>
                  {branch.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={5}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                required
                disablePast
                format="dd/MM/yyyy"
                margin="dense"
                size="small"
                inputVariant="outlined"
                fullWidth
                id="employment-date"
                label="Employment date"
                value={values.employmentDate}
                onChange={date => handleDateChange(date, 'employmentDate')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={8}>
            <TextField
              id="department"
              name="departmentId"
              required
              placeholder="Select department"
              select
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Department"
              value={values.departmentId}
              onChange={handleChange}
            >
              <MenuItem value="">Select department</MenuItem>
              {departments.map(dept => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="select-gender"
              required
              label="Select gender"
              name="gender"
              variant="outlined"
              size="small"
              margin="dense"
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
              size="small"
              label="Employment status"
              value={values.employeeStatus}
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
              id="position-id"
              required
              name="positionId"
              placeholder="Select position"
              select
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Position"
              value={values.positionId}
              onChange={handleChange}
            >
              <MenuItem value="">Select position</MenuItem>
              {positions.map(position => (
                <MenuItem key={position.id} value={position.id}>
                  {position.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              id="combo-box-countries"
              size="small"
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
                  required
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
              id="combo-box-state"
              size="small"
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
                  required
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
              required
              label="City"
              id="outlined-city"
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              value={values.city}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="reporting-to"
              required
              name="reportingTo"
              placeholder="Select employee you report to"
              select
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Reporting to"
              value={values.reportingTo}
              onChange={handleChange}
            >
              <MenuItem value="">Select employee to report to</MenuItem>
              {employees.map(employee => (
                  <MenuItem key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="employment-type"
              required
              name="employeeType"
              placeholder="Select employee type"
              select
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Employee type"
              value={values.employeeType}
              onChange={handleChange}
            >
              <MenuItem value="">Select employee type</MenuItem>
              {employeeTypes.map((empType, i) => (
                <MenuItem key={i} value={empType.id}>
                  {empType.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="source-of-hire"
              required
              name="sourceOfHire"
              placeholder="Select source of hire"
              select
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Source of hire"
              value={values.sourceOfHire}
              onChange={handleChange}
            >
              <MenuItem value="">Select source of hire</MenuItem>
              {sourcesOfHire.map((source, i) => (
                <MenuItem key={i} value={source.id}>
                  {source.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="pay-rate"
              name="payRate"
              placeholder="Enter pay rate"
              required
              select
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Pay rate"
              value={values.payRate}
              onChange={handleChange}
            >
              <MenuItem value="">Select pay rate</MenuItem>
              {payRates.map((payType, i) => (
                <MenuItem key={i} value={payType.id}>
                  {payType.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="pay-type"
              name="payType"
              required
              placeholder="Select pay type"
              select
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Pay type"
              value={values.payType}
              onChange={handleChange}
            >
              <MenuItem value="">Select pay type</MenuItem>
              {payTypes.map((payType, i) => (
                <MenuItem key={i} value={payType.id}>
                  {payType.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="address"
              required
              label="Address"
              name="address"
              variant="outlined"
              size="small"
              value={values.address}
              onChange={handleChange}
              margin="dense"
              fullWidth
              rows={3}
              multiline
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading ? loading : !canBeSubmitted()}
          endIcon={loading && <CircularProgress size={20} />}
        >
          Save
        </Button>
        <Button
          onClick={closeNewEmployeeDialog}
          variant="contained"
          disableElevation
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EmployeeDialog.propTypes = {
  loading: PropTypes.bool,
  employeeDialog: PropTypes.object,
  createEmployee: PropTypes.func,
  closeNewEmployeeDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employeeDialog: Selectors.makeSelectEmployeeDialog(),
  branches: Selectors.makeSelectBranches(),
  departments: Selectors.makeSelectDepartments(),
  positions: Selectors.makeSelectPositions(),
  employeeTypes: Selectors.makeSelectEmployeeTypes(),
  sourcesOfHire: Selectors.makeSelectSourcesOfHire(),
  payRates: Selectors.makeSelectPayRates(),
  payTypes: Selectors.makeSelectPayTypes(),
  employees: Selectors.makeSelectGetAllEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    createEmployee: data => dispatch(Actions.createNewEmployee(data)),
    closeNewEmployeeDialog: () => dispatch(Actions.closeNewEmployeeDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EmployeeDialog);
