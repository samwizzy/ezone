/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  withStyles,
  CircularProgress,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Tabs,
  Tab,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  DialogTitle,
  Divider,
  Slide,
} from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
}));

const gender = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EmployeeDialog = props => {
  const {
    loading,
    employeeDialog,
    closeNewEmployeeDialogAction,
    closeEditEmployeeDialogAction,
    dispatchCreateNewEmployeeAction,
  } = props;

  const classes = useStyles();
  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    employeeId: '',
    phoneNumber: '',
    address: '',
    gender: '',
    password: '',
  });

  const canBeSubmitted = () => {
    const {
      firstName,
      lastName,
      emailAddress,
      employeeId,
      phoneNumber,
      address,
      gender,
      password,
    } = values;
    return (
      firstName !== '' &&
      lastName !== '' &&
      emailAddress !== '' &&
      employeeId !== '' &&
      phoneNumber !== '' &&
      address !== '' &&
      gender !== '' &&
      password !== ''
    );
  };

  const handleSelectChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Dialog
      {...employeeDialog.props}
      onClose={closeNewEmployeeDialogAction}
      keepMounted
      TransitionComponent={Transition}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {employeeDialog.type === 'new' ? 'New Employee' : 'Edit Employee'}
      </DialogTitle>

      <DialogContent dividers>
        <TextField
          id="standard-first-name"
          label="First Name"
          variant="outlined"
          size="small"
          value={values.firstName}
          onChange={handleChange('firstName')}
          margin="normal"
          fullWidth
        />
        <TextField
          id="standard-Last-Name"
          label="Last Name"
          variant="outlined"
          size="small"
          value={values.lastName}
          onChange={handleChange('lastName')}
          margin="normal"
          fullWidth
        />

        <TextField
          id="standard-email"
          label="Email"
          type="email"
          variant="outlined"
          size="small"
          value={values.emailAddress}
          onChange={handleChange('emailAddress')}
          margin="normal"
          fullWidth
        />

        <TextField
          id="standard-phone-number"
          label="Phone Number"
          type="number"
          variant="outlined"
          size="small"
          value={values.phoneNumber}
          onChange={handleChange('phoneNumber')}
          margin="normal"
          fullWidth
        />

        <TextField
          id="standard-employeeID"
          label="Employee ID"
          variant="outlined"
          size="small"
          value={values.employeeId}
          onChange={handleChange('employeeId')}
          margin="normal"
          fullWidth
        />

        <TextField
          id="standard-password"
          label="Password"
          variant="outlined"
          size="small"
          value={values.password}
          type="password"
          onChange={handleChange('password')}
          margin="normal"
          fullWidth
        />

        <TextField
          id="standard-select-gender"
          label="Select Gender"
          variant="outlined"
          size="small"
          margin="normal"
          value={values.gender ? values.gender : ''}
          onChange={handleSelectChange('gender')}
          select
          fullWidth
        >
          {gender.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="standard-address"
          label="Address"
          variant="outlined"
          size="small"
          value={values.address}
          onChange={handleChange('address')}
          margin="normal"
          fullWidth
          rows={2}
          multiline
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => dispatchCreateNewEmployeeAction(values)}
          color="primary"
          variant="contained"
          disabled={loading ? loading : !canBeSubmitted()}
          endIcon={loading && <CircularProgress size={20} />}
        >
          Save
        </Button>
        <Button
          onClick={closeNewEmployeeDialogAction}
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
  dispatchCreateNewEmployeeAction: PropTypes.func,
  closeNewEmployeeDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employeeDialog: Selectors.makeSelectEmployeeDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCreateNewEmployeeAction: evt =>
      dispatch(Actions.createNewEmployee(evt)),
    closeNewEmployeeDialogAction: () =>
      dispatch(Actions.closeNewEmployeeDialog()),
    dispatch,
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
