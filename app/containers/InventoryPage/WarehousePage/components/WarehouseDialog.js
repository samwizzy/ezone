/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  withStyles,
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
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(1.5, 0),
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const gender = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WarehouseDialog = props => {
  const {
    loading,
    warehouseDialog,
    closeNewWarehouseDialogAction,
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
    <div>
      <Dialog
        {...warehouseDialog.props}
        onClose={closeNewWarehouseDialogAction}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {warehouseDialog.type === 'new' ? 'New Warehouse' : 'Edit Warehouse'}
        </DialogTitle>

        <Divider />

        <DialogContent>
          {warehouseDialog.type === 'new' ? (
            <div>
              <TextField
                id="standard-First-Name"
                label="First Name"
                variant="outlined"
                className={classes.textField}
                value={values.firstName}
                onChange={handleChange('firstName')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-Last-Name"
                label="Last Name"
                variant="outlined"
                className={classes.textField}
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
                className={classes.textField}
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
                className={classes.textField}
                value={values.phoneNumber}
                onChange={handleChange('phoneNumber')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-employeeID"
                label="Employee ID"
                variant="outlined"
                className={classes.textField}
                value={values.employeeId}
                onChange={handleChange('employeeId')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-password"
                label="Password"
                variant="outlined"
                className={classes.textField}
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
                className={classes.textField}
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
                className={classes.textField}
                value={values.address}
                onChange={handleChange('address')}
                margin="normal"
                fullWidth
                rows={2}
                multiline
              />
            </div>
          ) : null}
        </DialogContent>

        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => {
                dispatchCreateNewEmployeeAction(values);
              }}
              color="primary"
              variant="contained"
              disabled={!canBeSubmitted()}
            >
              Save
            </Button>
          )}
          <Button
            onClick={() => closeNewWarehouseDialogAction()}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

WarehouseDialog.propTypes = {
  loading: PropTypes.bool,
  warehouseDialog: PropTypes.object,
  dispatchCreateNewEmployeeAction: PropTypes.func,
  closeNewWarehouseDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  warehouseDialog: Selectors.makeSelectWarehouseDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatchCreateNewEmployeeAction: evt =>
    //   dispatch(Actions.createNewEmployee(evt)),
    closeNewWarehouseDialogAction: () =>
      dispatch(Actions.closeNewWarehouseDialog()),
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
)(WarehouseDialog);
