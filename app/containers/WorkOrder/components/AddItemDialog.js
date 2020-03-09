/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';

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
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@material-ui/core';

import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../components/LoadingIndicator';

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



const AddItemDialog = props => {
  const {
    loading,
    workOrderDialog,
    closeWorkOrderDialogAction,
    listOfVendorsData,
  } = props;

  const classes = useStyles();


  const [values, setValues] = React.useState({
    id: "",
    addedBy: "",
    amountBal: "",
    amountPaid: "",
    approved: "",
    cost: "",
    date: "",
    dateAdded: "",
    dateCreated: "",
    dateUpdated: "",
    description: "",
    expectedCompletionDate: "",
  });


  const handleSelectChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };


  return (
    <div>
      <Dialog
        {...workOrderDialog.props}
        onClose={closeWorkOrderDialogAction}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {workOrderDialog.type === 'new' ? 'Work Order' : 'Edit Work Order'}
        </DialogTitle>

        <Divider />

        <DialogContent>
          {workOrderDialog.type === 'new' ? (
            <div>
              <Autocomplete
                id="combo-box-demo"
                options={listOfVendorsData}
                getOptionLabel={option => option.description}
                // style={{ width: 800 }}
                fullWidth
                onChange={(evt) => handleSelectChange(evt)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Search Vendors"
                    variant="outlined"
                    placeholder="Vendors"
                    fullWidth
                  />
                )}
              />
              <TextField
                id="standard-amountBal"
                label="Amount Balance"
                variant="outlined"
                className={classes.textField}
                value={values.amountBal}
                onChange={handleChange('amountBal')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-amountPaid"
                label="Amount Paid"
                variant="outlined"
                className={classes.textField}
                value={values.amountPaid}
                onChange={handleChange('amountPaid')}
                margin="normal"
                fullWidth
              />
              <FormControl component="fieldset">
                <FormLabel component="legend">Approve Order.</FormLabel>
                <br />
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value={values.approved}
                    onChange={handleChange('approved')}
                    control={<Checkbox color="primary" />}
                    label="Yes"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="start"
                    control={<Checkbox color="primary" />}
                    label="No"
                    labelPlacement="top"
                  />
                </FormGroup>
              </FormControl>
              <TextField
                id="standard-cost"
                label="Cost"
                variant="outlined"
                className={classes.textField}
                value={values.cost}
                onChange={handleChange('cost')}
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
                openCreateWorkOrderDialogAction(values);
              }}
              color="primary"
              variant="contained"
              // disabled={!canBeSubmitted()}
            >
              Save Item
            </Button>
          )}
          <Button
            onClick={() => closeWorkOrderDialogAction()}
            color="primary"
            variant="contained"
          >
            Cancel item
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddItemDialog.propTypes = {
  loading: PropTypes.bool,
  AddItemDialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(), 
  workOrderDialog: Selectors.makeSelectWorkOrderDialog(),
  listOfVendorsData: Selectors.makeSelectGetListOfVendorsData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openCreateWorkOrderDialogAction: () => dispatch(Actions.openCreateWorkOrderDialog()),
    closeWorkOrderDialogAction: () => dispatch(Actions.closeCreateWorkOrderDialog()),
    getListOfVendorsAction: evt => dispatch(Actions.getAllVendorsAction(evt)),
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
)(AddItemDialog);
