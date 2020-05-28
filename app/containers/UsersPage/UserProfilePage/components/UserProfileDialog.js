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
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  MenuItem,
  DialogTitle,
  Slide,
} from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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
    closeEditUserProfileDialog,
    updateUserProfile,
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
    setValues({...values, [name]: event.target.value});
  };

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value});
  };

  console.log(values, "values")

  return (
    <div>
      <Dialog
        {...updateUserProfileDialog.props}
        onClose={closeEditUserProfileDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {updateUserProfileDialog.type === 'new' ? '' : 'Edit User Profile'}
        </DialogTitle>

        <DialogContent dividers>
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
          <Button
            onClick={() => updateUserProfile(values)}
            color="primary"
            variant="contained"
            disabled={loading? loading : !canBeSubmitted()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            Save
          </Button>
          <Button
            onClick={() => closeEditUserProfileDialog()}
            color="primary"
            variant="outlined"
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
  updateUserProfile: PropTypes.func,
  closeEditUserProfileDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  updateUserProfileDialog: Selectors.makeSelectUpdateUserProfileDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateUserProfile: evt => dispatch(Actions.updateUserProfile(evt)),
    closeEditUserProfileDialog: () => dispatch(Actions.closeEditUserProfileDialog()),
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
