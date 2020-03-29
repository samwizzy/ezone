/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  MenuItem,
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
    value: 'Nigeria',
    label: 'Nigeria',
  },
  {
    value: 'Ghana',
    label: 'Ghana',
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const WarehouseDialog = props => {
  const {
    loading,
    warehouseDialog,
    getAllEmployees,
    closeNewWarehouseDialogAction,
    closeEditEmployeeDialogAction,
    dispatchCreateNewWarehouseAction,
  } = props;

  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    firstStreet: '',
    secondStreet: '',
    city: '',
    country: '',
    state: '',
    zipCode: '',
    wareHouseContactEmail: '',
    warehousePhoneNumber: '',
    headOfWareHouseEmailAddress: '',
    headOfWareHousePhoneNumber: '',
  });

  const canBeSubmitted = () => {
    const {
      name,
      phone,
      head,
      contactEmail,
      zipCode,
      firstStreet,
      secondStreet,
      city,
      state,
    } = values;
    return (
      name !== '' &&
      phone !== '' &&
      head !== '' &&
      contactEmail !== '' &&
      zipCode !== '' &&
      firstStreet !== '' &&
      secondStreet !== '' &&
      city !== '' &&
      state !== ''
    );
  };

  const handleSelectChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  //   const handleEmployeeChange = (evt, val) => {
  //  };

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
                id="standard-Name"
                label="Warehouse Name"
                variant="outlined"
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-firstStreet"
                label="First Street"
                variant="outlined"
                className={classes.textField}
                value={values.firstStreet}
                onChange={handleChange('firstStreet')}
                margin="normal"
                fullWidth
                rows={2}
                multiline
              />
              <TextField
                id="standard-secondStreet"
                label="Second Street"
                variant="outlined"
                className={classes.textField}
                value={values.secondStreet}
                onChange={handleChange('secondStreet')}
                margin="normal"
                fullWidth
                rows={2}
                multiline
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
                id="standard-select-state"
                label="Select Country"
                variant="outlined"
                className={classes.textField}
                margin="normal"
                value={values.country ? values.country : ''}
                onChange={handleSelectChange('country')}
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
                id="standard-state"
                label="State"
                variant="outlined"
                className={classes.textField}
                margin="normal"
                value={values.state ? values.state : ''}
                onChange={handleChange('state')}
                fullWidth
              />
              <TextField
                id="standard-zipCode"
                label="zipCode"
                type="number"
                variant="outlined"
                className={classes.textField}
                value={values.zipCode}
                onChange={handleChange('zipCode')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-warehousePhoneNumber"
                label="Warehouse Phone Number"
                variant="outlined"
                className={classes.textField}
                value={values.warehousePhoneNumber}
                onChange={handleChange('warehousePhoneNumber')}
                margin="normal"
                type="number"
                fullWidth
              />
              <TextField
                id="standard-wareHouseContactEmail"
                label="WareHouse Contact Email"
                type="email"
                variant="outlined"
                className={classes.textField}
                value={values.wareHouseContactEmail}
                onChange={handleChange('wareHouseContactEmail')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-headOfWareHousePhoneNumber"
                label="Head Of WareHouse PhoneNumber"
                variant="outlined"
                className={classes.textField}
                value={values.phone}
                onChange={handleChange('headOfWareHousePhoneNumber')}
                margin="normal"
                type="number"
                fullWidth
              />
              <TextField
                id="standard-headOfWareHouseEmailAddress"
                label="Head Of WareHouse Email Address"
                variant="outlined"
                className={classes.textField}
                value={values.phone}
                onChange={handleChange('headOfWareHouseEmailAddress')}
                margin="normal"
                type="email"
                fullWidth
              />
              {/* <Autocomplete
                id="combo-headOfWareHouseEmailAddress"
                options={getAllEmployees}
                getOptionLabel={option => option.email}
                // onChange={(evt, ve) => handleEmployeeChange(evt, ve)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Search Head"
                    variant="outlined"
                    placeholder="Search Head"
                    fullWidth
                  />
                )}
              /> */}
            </div>
          ) : (
            <div>
              <TextField
                id="standard-Name"
                label="Name"
                variant="outlined"
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-Phone"
                label="Phone Number"
                variant="outlined"
                className={classes.textField}
                value={values.phone}
                onChange={handleChange('phone')}
                margin="normal"
                type="number"
                fullWidth
              />
              <Autocomplete
                id="combo-box-demo"
                options={[]}
                getOptionLabel={option => option.firstName}
                // style={{ width: 800 }}
                // onChange={(evt, ve) => handleEmployeeChange(evt, ve)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Search contacts"
                    variant="outlined"
                    placeholder="Search Contacts"
                    fullWidth
                  />
                )}
              />
              <TextField
                id="standard-head"
                label="Warehouse Head"
                variant="outlined"
                className={classes.textField}
                value={values.head}
                onChange={handleChange('head')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-contactEmail"
                label="Contact Email"
                type="email"
                variant="outlined"
                className={classes.textField}
                value={values.contactEmail}
                onChange={handleChange('contactEmail')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-zipCode"
                label="zipCode"
                type="number"
                variant="outlined"
                className={classes.textField}
                value={values.zipCode}
                onChange={handleChange('zipCode')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-firstStreet"
                label="First Street"
                variant="outlined"
                className={classes.textField}
                value={values.firstStreet}
                onChange={handleChange('firstStreet')}
                margin="normal"
                fullWidth
                rows={2}
                multiline
              />
              <TextField
                id="standard-secondStreet"
                label="Second Street"
                variant="outlined"
                className={classes.textField}
                value={values.secondStreet}
                onChange={handleChange('secondStreet')}
                margin="normal"
                fullWidth
                rows={2}
                multiline
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
                id="standard-select-state"
                label="Select State"
                variant="outlined"
                className={classes.textField}
                margin="normal"
                value={values.state ? values.state : ''}
                onChange={handleSelectChange('state')}
                select
                fullWidth
              >
                {gender.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          )}
        </DialogContent>

        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => {
                dispatchCreateNewWarehouseAction(values);
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
  getAllEmployees: PropTypes.array,
  warehouseDialog: PropTypes.object,
  dispatchCreateNewWarehouseAction: PropTypes.func,
  closeNewWarehouseDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  warehouseDialog: Selectors.makeSelectWarehouseDialog(),
  getAllEmployees: Selectors.makeSelectGetAllEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCreateNewWarehouseAction: evt =>
      dispatch(Actions.createNewWarehouse(evt)),
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
