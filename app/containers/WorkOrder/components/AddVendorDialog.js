/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as AppSelectors from '../../App/selectors';

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
// import LoadingIndicator from '../../../../components/LoadingIndicator';

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

const type = [
  {
    value: 'BUSINESS',
    label: 'BUSINESS',
  },
  {
    value: 'INDIVIDUAL',
    label: 'INDIVIDUAL',
  },
];

const countryList = [
  {
    value: 'country',
    label: 'Nigeria',
  },
  {
    value: 'country',
    label: 'Canada',
  },
  {
    value: 'country',
    label: 'Germany',
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AddVendorDialog = props => {
  const {
    loading,
    closeVendorDialogAction,
    vendorDialog,
    saveVendorAction,
    currentUser
  } = props;

  const classes = useStyles();
  const [values, setValues] = React.useState({
    id: "",
    orgId: currentUser.organisation.orgId,
    type: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    busName: "",
    registered: "",
    regNumber: "",
    regYear: "",
    busType: "",
    noOfEmployees: "",
    address: "",
    city: "",
    state: "",
    country: "",
    mobilePhone: "",
    officePhone: "",
    email: "",
    website: "",
    zip: "",
    contactName: "",
    contactPhone: "",
    fax: "",
    companyNumber: "",
    description: "",
    dateCreated: "",
    addedBy: "",
    dateUpdated: "",
    updatedBy: ""
  });

  // const canBeSubmitted = () => {
  //   const {
  //     firstName,
  //     lastName,
  //     emailAddress,
  //     employeeId,
  //     phoneNumber,
  //     address,
  //     gender,
  //     password,
  //   } = values;
  //   return (
  //     firstName !== '' &&
  //     lastName !== '' &&
  //     emailAddress !== '' &&
  //     employeeId !== '' &&
  //     phoneNumber !== '' &&
  //     address !== '' &&
  //     gender !== '' &&
  //     password !== ''
  //   );
  // };

  // const handleSelectChange = name => event => {
  //   setValues({ ...values, [name]: event.target.value });
  // };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div>
      <Dialog
        {...vendorDialog.props}
        onClose={closeVendorDialogAction}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {vendorDialog.type === 'new' ? 'Vendor' : 'Edit Vendor'}
        </DialogTitle>

        <Divider />

        <DialogContent>
          {vendorDialog.type === 'new' ? (
            <div>
              <TextField
                id="standard-type"
                label="Type"
                variant="outlined"
                className={classes.textField}
                margin="normal"
                value={values.type ? values.type : ''}
                onChange={handleChange('type')}
                select
                fullWidth
              >
                {type.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {values.type == 'BUSINESS' ? (
                <div>
                  <TextField
                    id="standard-busName"
                    label="Business Name"
                    type="busName"
                    variant="outlined"
                    className={classes.textField}
                    value={values.busName}
                    onChange={handleChange('busName')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-registered"
                    label="registered"
                    type="registered"
                    variant="outlined"
                    className={classes.textField}
                    value={values.registered}
                    onChange={handleChange('registered')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-regNumber"
                    label="Registration Number"
                    type="regNumber"
                    variant="outlined"
                    className={classes.textField}
                    value={values.regNumber}
                    onChange={handleChange('regNumber')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-regYear"
                    label="Registration Year"
                    type="regYear"
                    variant="outlined"
                    className={classes.textField}
                    value={values.regYear}
                    onChange={handleChange('regYear')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-noOfEmployees"
                    label="Number of employees"
                    type="number"
                    variant="outlined"
                    className={classes.textField}
                    value={values.noOfEmployees}
                    onChange={handleChange('noOfEmployees')}
                    margin="normal"
                    fullWidth
                  />
                  {/* <TextField
                    id="standard-phone-number"
                    label="Phone Number"
                    type="number"
                    variant="outlined"
                    className={classes.textField}
                    value={values.phoneNumber}
                    onChange={handleChange('phoneNumber')}
                    margin="normal"
                    fullWidth
                  /> */}
                  <TextField
                    id="standard-officePhone"
                    label="Office Phone Number"
                    type="number"
                    variant="outlined"
                    className={classes.textField}
                    value={values.officePhone}
                    onChange={handleChange('officePhone')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-country"
                    label="Select Country"
                    variant="outlined"
                    className={classes.textField}
                    margin="normal"
                    value={values.country ? values.country : ''}
                    onChange={handleChange('country')}
                    select
                    fullWidth
                  >
                    {countryList.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="standard-state"
                    label="State"
                    variant="outlined"
                    className={classes.textField}
                    value={values.state}
                    onChange={handleChange('state')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-city"
                    label="City"
                    variant="outlined"
                    className={classes.textField}
                    value={values.city}
                    onChange={handleChange('city')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-email"
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    className={classes.textField}
                    value={values.email}
                    onChange={handleChange('email')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-website"
                    label="Website Link"
                    variant="outlined"
                    className={classes.textField}
                    value={values.website}
                    onChange={handleChange('website')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-zip"
                    label="Zip"
                    type="number"
                    variant="outlined"
                    className={classes.textField}
                    value={values.zip}
                    onChange={handleChange('zip')}
                    margin="normal"
                    fullWidth
                  />
                  {/* <TextField
                    id="standard-contactName"
                    label="Contact Name"
                    variant="outlined"
                    className={classes.textField}
                    value={values.contactName}
                    onChange={handleChange('contactName')}
                    margin="normal"
                    fullWidth
                  /> */}
                  <TextField
                    id="standard-contactPhone"
                    label="Contact Phone"
                    variant="outlined"
                    className={classes.textField}
                    value={values.contactPhone}
                    onChange={handleChange('contactPhone')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-fax"
                    label="Fax"
                    type="number"
                    variant="outlined"
                    className={classes.textField}
                    value={values.fax}
                    onChange={handleChange('fax')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-companyNumber"
                    label="Company Number"
                    variant="outlined"
                    className={classes.textField}
                    value={values.companyNumber}
                    onChange={handleChange('companyNumber')}
                    margin="normal"
                    fullWidth
                  />
                  {/* <TextField
                    id="standard-employeeID"
                    label="Employee ID"
                    variant="outlined"
                    className={classes.textField}
                    value={values.employeeId}
                    onChange={handleChange('employeeId')}
                    margin="normal"
                    fullWidth
                  /> */}
                  <TextField
                    id="standard-description"
                    label="Description"
                    variant="outlined"
                    className={classes.textField}
                    value={values.description}
                    onChange={handleChange('description')}
                    margin="normal"
                    fullWidth
                    rows={2}
                    multiline
                  />
                </div>
              ) : (
                <div>
                    <TextField
                    id="standard-firstName"
                    label="First Name"
                    type="firstName"
                    variant="outlined"
                    className={classes.textField}
                    value={values.firstName}
                    onChange={handleChange('firstName')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-lastName"
                    label="Last Name"
                    type="lastName"
                    variant="outlined"
                    className={classes.textField}
                    value={values.lastName}
                    onChange={handleChange('lastName')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-gender"
                    label="Gender"
                    variant="outlined"
                    className={classes.textField}
                    margin="normal"
                    value={values.gender ? values.gender : ''}
                    onChange={handleChange('gender')}
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
                    id="standard-busName"
                    label="Business Name"
                    type="busName"
                    variant="outlined"
                    className={classes.textField}
                    value={values.busName}
                    onChange={handleChange('busName')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-registered"
                    label="registered"
                    type="registered"
                    variant="outlined"
                    className={classes.textField}
                    value={values.registered}
                    onChange={handleChange('registered')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-regNumber"
                    label="Registration Number"
                    type="regNumber"
                    variant="outlined"
                    className={classes.textField}
                    value={values.regNumber}
                    onChange={handleChange('regNumber')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-regYear"
                    label="Registration Year"
                    type="regYear"
                    variant="outlined"
                    className={classes.textField}
                    value={values.regYear}
                    onChange={handleChange('regYear')}
                    margin="normal"
                    fullWidth
                  />
                  {/* <TextField
                    id="standard-noOfEmployees"
                    label="Number of employees"
                    type="number"
                    variant="outlined"
                    className={classes.textField}
                    value={values.noOfEmployees}
                    onChange={handleChange('noOfEmployees')}
                    margin="normal"
                    fullWidth
                  /> */}
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
                  {/* <TextField
                    id="standard-officePhone"
                    label="Office Phone Number"
                    type="number"
                    variant="outlined"
                    className={classes.textField}
                    value={values.officePhone}
                    onChange={handleChange('officePhone')}
                    margin="normal"
                    fullWidth
                  /> */}
                  <TextField
                    id="standard-country"
                    label="Select Country"
                    variant="outlined"
                    className={classes.textField}
                    margin="normal"
                    value={values.country ? values.country : ''}
                    onChange={handleChange('country')}
                    select
                    fullWidth
                  >
                    {countryList.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="standard-state"
                    label="State"
                    variant="outlined"
                    className={classes.textField}
                    value={values.state}
                    onChange={handleChange('state')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-city"
                    label="City"
                    variant="outlined"
                    className={classes.textField}
                    value={values.city}
                    onChange={handleChange('city')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-email"
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    className={classes.textField}
                    value={values.email}
                    onChange={handleChange('email')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-website"
                    label="Website Link"
                    variant="outlined"
                    className={classes.textField}
                    value={values.website}
                    onChange={handleChange('website')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-zip"
                    label="Zip"
                    type="number"
                    variant="outlined"
                    className={classes.textField}
                    value={values.zip}
                    onChange={handleChange('zip')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-contactName"
                    label="Contact Name"
                    variant="outlined"
                    className={classes.textField}
                    value={values.contactName}
                    onChange={handleChange('contactName')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-contactPhone"
                    label="Contact Phone"
                    variant="outlined"
                    className={classes.textField}
                    value={values.contactPhone}
                    onChange={handleChange('contactPhone')}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    id="standard-fax"
                    label="Fax"
                    type="number"
                    variant="outlined"
                    className={classes.textField}
                    value={values.fax}
                    onChange={handleChange('fax')}
                    margin="normal"
                    fullWidth
                  />
                  {/* <TextField
                    id="standard-companyNumber"
                    label="Company Number"
                    variant="outlined"
                    className={classes.textField}
                    value={values.companyNumber}
                    onChange={handleChange('companyNumber')}
                    margin="normal"
                    fullWidth
                  /> */}
                  {/* <TextField
                    id="standard-employeeID"
                    label="Employee ID"
                    variant="outlined"
                    className={classes.textField}
                    value={values.employeeId}
                    onChange={handleChange('employeeId')}
                    margin="normal"
                    fullWidth
                  /> */}
                  <TextField
                    id="standard-description"
                    label="Description"
                    variant="outlined"
                    className={classes.textField}
                    value={values.description}
                    onChange={handleChange('description')}
                    margin="normal"
                    fullWidth
                    rows={2}
                    multiline
                  />
                </div>
            )}

            </div>
          ) : null}
        </DialogContent>

        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => {
                saveVendorAction(values)
                closeVendorDialogAction()
              }}
              color="primary"
              variant="contained"
              // disabled={!canBeSubmitted()}
            >
              Save
            </Button>
          )}
          <Button
            onClick={() => closeVendorDialogAction() }
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

AddVendorDialog.propTypes = {
  loading: PropTypes.bool,
  vendorDialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
//   loading: Selectors.makeSelectLoading(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
  vendorDialog: Selectors.makeSelectVendorDialog(),
  vendorPostData: Selectors.makeSelectVendorPostData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openVendorDialogAction: () => dispatch(Actions.openVendorDialog()),
    closeVendorDialogAction: () => dispatch(Actions.closeVendorDialog()),
    saveVendorAction: evt => dispatch(Actions.saveVendorConfigAction(evt)),
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
)(AddVendorDialog);
