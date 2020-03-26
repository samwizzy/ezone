/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
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

const UserProfileDialog = props => {
  const {
    loading,
    updateUserProfileDialog,
    closeEditUserProfileDialogAction,
    updateUserProfileAction,
  } = props;

  useEffect(() => {
    setValues({
      ...updateUserProfileDialog.data,
    });
  }, [updateUserProfileDialog.data]);

  const classes = useStyles();
  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
  });

  const canBeSubmitted = () => {
    const { firstName, lastName, phoneNumber, address, gender } = values;
    return (
      firstName !== '' &&
      lastName !== '' &&
      phoneNumber !== '' &&
      address !== '' &&
      gender !== ''
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
        {...updateUserProfileDialog.props}
        onClose={closeEditUserProfileDialogAction}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {updateUserProfileDialog.type === 'new' ? '' : 'Edit User Profile'}
        </DialogTitle>

        <Divider />

        <DialogContent>
          {updateUserProfileDialog.type === 'edit' ? (
            <div>
              <TextField
                id="standard-First-Name"
                label="First Name"
                variant="outlined"
                className={classes.textField}
                value={values.firstName || ''}
                onChange={handleChange('firstName')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-Last-Name"
                label="Last Name"
                variant="outlined"
                className={classes.textField}
                value={values.lastName || ''}
                onChange={handleChange('lastName')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-phone-number"
                label="Phone Number"
                type="number"
                variant="outlined"
                className={classes.textField}
                value={values.phoneNumber || ''}
                onChange={handleChange('phoneNumber')}
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
                value={values.address || ''}
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
                updateUserProfileAction(values);
              }}
              color="primary"
              variant="contained"
              disabled={!canBeSubmitted()}
            >
              Save
            </Button>
          )}
          <Button
            onClick={() => closeEditUserProfileDialogAction()}
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

UserProfileDialog.propTypes = {
  loading: PropTypes.bool,
  updateUserProfileDialog: PropTypes.object,
  updateUserProfileAction: PropTypes.func,
  closeEditUserProfileDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  updateUserProfileDialog: Selectors.makeSelectUpdateUserProfileDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateUserProfileAction: evt => dispatch(Actions.updateUserProfile(evt)),
    closeEditUserProfileDialogAction: () =>
      dispatch(Actions.closeEditUserProfileDialog()),
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
)(UserProfileDialog);