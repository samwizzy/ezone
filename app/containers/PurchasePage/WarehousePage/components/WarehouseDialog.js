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
  root: {
    flexGrow: 1
  }
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

  const handleSubmit = () => {
    warehouseDialog.type === 'new' ?
      dispatchCreateNewWarehouseAction(values) : dispatchUpdateWarehouseAction(values)
  }

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

        <DialogContent dividers>
          <div>
            <TextField
              id="standard-name"
              size="small"
              label="Warehouse Name"
              variant="outlined"
              value={values.name || ''}
              onChange={handleChange('name')}
              margin="normal"
              fullWidth
            />
            <TextField
              id="standard-firstStreet"
              size="small"
              label="First Street"
              variant="outlined"
              value={values.firstStreet || ''}
              onChange={handleChange('firstStreet')}
              margin="normal"
              fullWidth
              rows={2}
              multiline
            />
            <TextField
              id="standard-secondStreet"
              size="small"
              label="Second Street"
              variant="outlined"
              value={values.secondStreet || ''}
              onChange={handleChange('secondStreet')}
              margin="normal"
              fullWidth
              rows={2}
              multiline
            />
            <TextField
              id="standard-city"
              size="small"
              label="City"
              variant="outlined"
              value={values.city || ''}
              onChange={handleChange('city')}
              margin="normal"
              fullWidth
            />
            <TextField
              id="standard-state"
              size="small"
              label="State"
              variant="outlined"
              margin="normal"
              value={values.state ? values.state : ''}
              onChange={handleChange('state')}
              fullWidth
            />
            <TextField
              id="standard-zipCode"
              size="small"
              label="Zip Code"
              type="number"
              variant="outlined"
              value={values.zipCode || ''}
              onChange={handleChange('zipCode')}
              margin="normal"
              fullWidth
            />
            <TextField
              id="standard-warehousePhoneNumber"
              size="small"
              label="Warehouse Phone Number"
              variant="outlined"
              value={values.warehousePhoneNumber || ''}
              onChange={handleChange('warehousePhoneNumber')}
              margin="normal"
              type="number"
              fullWidth
            />
            <TextField
              id="standard-wareHouseContactEmail"
              size="small"
              label="WareHouse Contact Email"
              type="email"
              variant="outlined"
              value={values.wareHouseContactEmail || ''}
              onChange={handleChange('wareHouseContactEmail')}
              margin="normal"
              fullWidth
            />
            <Autocomplete
              id="combo-headOfWareHouseId"
              size="small"
              options={getAllEmployees}
              getOptionLabel={option =>
                `${option.firstName} ${option.lastName}`
              }
              onChange={(evt, ve) => handleEmployeeChange(evt, ve)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Head Of WareHouse"
                  variant="outlined"
                  margin="normal"
                  placeholder="Head Of WareHouse Email Address"
                  fullWidth
                />
              )}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={!canBeSubmitted()}
          >
            {warehouseDialog.type === 'new' ? "Save" : "Update"}
          </Button>

          <Button
            onClick={() => closeNewWarehouseDialogAction()}
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
