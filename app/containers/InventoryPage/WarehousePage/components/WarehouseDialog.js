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
    dispatchCreateNewWarehouseAction,
    dispatchUpdateWarehouseAction,
    closeNewWarehouseDialogAction,
    closeEditWarehouseDialogAction,
  } = props;

  useEffect(() => {
    setValues({ ...warehouseDialog.data });
  }, [warehouseDialog.data]);

  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    firstStreet: '',
    secondStreet: '',
    city: '',
    state: '',
    zipCode: '',
    warehousePhoneNumber: '',
    wareHouseContactEmail: '',
    headOfWareHouseId: '',
  });

  const canBeSubmitted = () => {
    const {
      name,
      firstStreet,
      secondStreet,
      city,
      state,
      zipCode,
      warehousePhoneNumber,
      wareHouseContactEmail,
      headOfWareHouseId,
    } = values;
    return (
      name !== '' &&
      firstStreet !== '' &&
      secondStreet !== '' &&
      city !== '' &&
      state !== '' &&
      zipCode !== '' &&
      warehousePhoneNumber !== '' &&
      wareHouseContactEmail !== '' &&
      headOfWareHouseId !== ''
    );
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleEmployeeChange = (evt, value) => {
    setValues({ ...values, headOfWareHouseId: value.id });
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
                id="standard-Name"
                label="Warehouse Name"
                variant="outlined"
                className={classes.textField}
                value={values.name || ''}
                onChange={handleChange('name')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-firstStreet"
                label="First Street"
                variant="outlined"
                className={classes.textField}
                value={values.firstStreet || ''}
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
                value={values.secondStreet || ''}
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
                value={values.city || ''}
                onChange={handleChange('city')}
                margin="normal"
                fullWidth
              />
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
                value={values.zipCode || ''}
                onChange={handleChange('zipCode')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-warehousePhoneNumber"
                label="Warehouse Phone Number"
                variant="outlined"
                className={classes.textField}
                value={values.warehousePhoneNumber || ''}
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
                value={values.wareHouseContactEmail || ''}
                onChange={handleChange('wareHouseContactEmail')}
                margin="normal"
                fullWidth
              />
              <Autocomplete
                id="combo-headOfWareHouseId"
                options={getAllEmployees}
                getOptionLabel={option => option.firstName}
                onChange={(evt, ve) => handleEmployeeChange(evt, ve)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Search Head Of WareHouse Email Address"
                    variant="outlined"
                    placeholder="Search Head Of WareHouse Email Address"
                    fullWidth
                  />
                )}
              />
            </div>
          ) : (
            <div>
              <TextField
                id="standard-Name"
                label="Warehouse Name"
                variant="outlined"
                className={classes.textField}
                value={values.name || ''}
                onChange={handleChange('name')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-firstStreet"
                label="First Street"
                variant="outlined"
                className={classes.textField}
                value={values.firstStreet || ''}
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
                value={values.secondStreet || ''}
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
                value={values.city || ''}
                onChange={handleChange('city')}
                margin="normal"
                fullWidth
              />
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
                value={values.zipCode || ''}
                onChange={handleChange('zipCode')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-warehousePhoneNumber"
                label="Warehouse Phone Number"
                variant="outlined"
                className={classes.textField}
                value={values.warehousePhoneNumber || ''}
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
                value={values.wareHouseContactEmail || ''}
                onChange={handleChange('wareHouseContactEmail')}
                margin="normal"
                fullWidth
              />
              <Autocomplete
                id="combo-headOfWareHouseId"
                options={getAllEmployees}
                getOptionLabel={option => option.firstName}
                onChange={(evt, ve) => handleEmployeeChange(evt, ve)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Search Head Of WareHouse Email Address"
                    variant="outlined"
                    placeholder="Search Head Of WareHouse Email Address"
                    fullWidth
                  />
                )}
              />
            </div>
          )}
        </DialogContent>

        <DialogActions>
          {warehouseDialog.type === 'new' ? (
            <div>
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
            </div>
          ) : (
            <div>
              {loading ? (
                <LoadingIndicator />
              ) : (
                <Button
                  onClick={() => {
                    dispatchUpdateWarehouseAction(values);
                  }}
                  color="primary"
                  variant="contained"
                  disabled={!canBeSubmitted()}
                >
                  Update
                </Button>
              )}

              <Button
                onClick={() => closeEditWarehouseDialogAction()}
                color="primary"
                variant="contained"
              >
                Cancel
              </Button>
            </div>
          )}
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
  dispatchUpdateWarehouseAction: PropTypes.func,
  closeNewWarehouseDialogAction: PropTypes.func,
  closeEditWarehouseDialogAction: PropTypes.func,
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
    dispatchUpdateWarehouseAction: evt =>
      dispatch(Actions.updateWarehouse(evt)),
    closeEditWarehouseDialogAction: () =>
      dispatch(Actions.closeEditWarehouseDialog()),
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
