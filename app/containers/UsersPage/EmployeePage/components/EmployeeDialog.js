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
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
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
    payTypes,
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
    gender: '',
    city: '',
    state: '',
    country: '',
    branchId: '',
    departmentId: '',
    imageChanged: false,
    signatureChanged: false,
  });

  const canBeSubmitted = () => {
    const {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      gender,
      departmentId,
      branchId,
    } = values;
    return (
      firstName !== '' &&
      lastName !== '' &&
      emailAddress !== '' &&
      phoneNumber !== '' &&
      gender !== '' &&
      departmentId !== '' &&
      branchId !== ''
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
        {employeeDialog.type === 'new' ? 'New user' : 'Edit user'}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              required
              id="first-name"
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
              required
              id="Last-Name"
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
              required
              id="email-address"
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
              required
              id="phone-number"
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

          <Grid item xs={6}>
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

          <Grid item xs={6}>
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

          <Grid item xs={5}>
            <TextField
              id="select-gender"
              label="Select gender"
              name="gender"
              required
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

          <Grid item xs={7}>
            <TextField
              name="city"
              label="City"
              required
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
