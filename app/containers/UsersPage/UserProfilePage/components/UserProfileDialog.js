/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
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

  useEffect(() => {
    if (updateUserProfileDialog.data) {
      setValues({
        ...updateUserProfileDialog.data,
      });
    }
  }, [updateUserProfileDialog.data]);

  const canBeSubmitted = () => {
    const { firstName, lastName, phoneNumber, address, gender } = values;
    return firstName && lastName && phoneNumber && address && gender;
  };

  const handleSelectChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  console.log(values, 'values');

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
          {updateUserProfileDialog.type === 'new' ? '' : 'Edit user profile'}
        </DialogTitle>

        <DialogContent dividers>
          {updateUserProfileDialog.type === 'edit' ? (
            <div>
              <TextField
                id="standard-first-name"
                label="First name"
                variant="outlined"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                margin="normal"
                size="small"
                fullWidth
              />
              <TextField
                id="standard-last-name"
                label="Last name"
                variant="outlined"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                margin="normal"
                size="small"
                fullWidth
              />

              <Grid container spacing={1}>
                <Grid item xs={7}>
                  <TextField
                    id="standard-phone-number"
                    label="Phone number"
                    type="number"
                    variant="outlined"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    margin="normal"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    id="standard-select-gender"
                    label="Select gender"
                    variant="outlined"
                    margin="normal"
                    size="small"
                    name="gender"
                    value={values.gender}
                    onChange={handleSelectChange}
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
              </Grid>

              <TextField
                id="standard-address"
                label="Address"
                variant="outlined"
                name="address"
                value={values.address}
                onChange={handleChange}
                margin="normal"
                size="small"
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
            disabled={loading ? loading : !canBeSubmitted()}
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
    closeEditUserProfileDialog: () =>
      dispatch(Actions.closeEditUserProfileDialog()),
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
