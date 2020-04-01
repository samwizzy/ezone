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
  Divider,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  FormControlLabel,
  Radio,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import TableTransfer from './TableTransfer';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
    width: 400,
  },
  textField: {
    margin: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(1),
    border: '1px solid red',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const category = [
  { id: 1, name: 'STOCK_ITEM' },
  { id: 2, name: 'COMPONENT_ITEM' },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TransferOrderDialog = props => {
  const {
    loading,
    transferOrderDialog,
    getAllWarehouses,
    closeNewTransferOrderDialogAction,
    closeEditEmployeeDialogAction,
    dispatchCreateNewTransferOrderAction,
  } = props;

  console.log(getAllWarehouses, 'getAllWarehouses');
  const classes = useStyles();
  const [selectedDate, handleDateChange] = React.useState(new Date());
  const [values, setValues] = React.useState({
    transferOrder: '',
    destinationWarehouseUuId: '',
    itemId: '',
    itemSku: '',
    reason: '',
    sourceWareHouseUuid: '',
    transferQuantity: '',
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

  const handleWarehouseChange = (evt, value) => {
    setValues({ ...values, wareHouseId: value.id });
  };

  const handleCategoryChange = (evt, value) => {
    setValues({ ...values, itemCategory: value.name });
  };

  return (
    <div>
      <Dialog
        {...transferOrderDialog.props}
        onClose={closeNewTransferOrderDialogAction}
        keepMounted
        fullScreen
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={closeNewTransferOrderDialogAction}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {transferOrderDialog.type === 'new'
                ? 'New Transfer Order'
                : 'Edit Transfer Order'}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={closeNewTransferOrderDialogAction}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Divider />

        <DialogContent>
          {transferOrderDialog.type === 'new' ? (
            <div>
              <Grid container spacing={0}>
                <Grid item xs={12} md={6} lg={6}>
                  <div className={classes.container}>
                    <TextField
                      id="outlined-transfer-order"
                      label="Transfer Order"
                      value={values.transferOrder}
                      onChange={handleChange('transferOrder')}
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Date"
                        format="dd/MM/yyyy"
                        value={selectedDate}
                        InputAdornmentProps={{ position: 'end' }}
                        onChange={date => handleDateChange(date)}
                        className={classes.textField}
                        fullWidth
                      />
                    </MuiPickersUtilsProvider>
                    <TextField
                      id="outlined-reason"
                      label="Reason"
                      value={values.reason}
                      onChange={handleChange('reason')}
                      fullWidth
                      variant="outlined"
                      className={classes.textField}
                      multiline
                      rows={2}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6} />
              </Grid>
              <Divider />
              <Grid container spacing={0}>
                <Grid item xs={12} md={6} lg={6}>
                  <div className={classes.container}>
                    <Autocomplete
                      id="combo-itemCategory"
                      options={getAllWarehouses}
                      getOptionLabel={option => option.name}
                      onChange={(evt, ve) => handleCategoryChange(evt, ve)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Source Warehouse"
                          variant="outlined"
                          placeholder="Source Warehouse"
                          fullWidth
                          className={classes.textField}
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <div className={classes.container}>
                    <Autocomplete
                      id="combo-itemCategory"
                      options={getAllWarehouses}
                      getOptionLabel={option => option.name}
                      onChange={(evt, ve) => handleCategoryChange(evt, ve)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Destination Warehouse"
                          variant="outlined"
                          placeholder="Destination Warehouse"
                          fullWidth
                          className={classes.textField}
                        />
                      )}
                    />
                  </div>
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={0}>
                <Grid item xs={12} md={12} lg={12}>
                  <TableTransfer />
                </Grid>
              </Grid>
              <Divider />
            </div>
          ) : (
            <div>
              <Grid container spacing={0}>
                <Grid item xs={12} md={6} lg={6}>
                  <div className={classes.container}>
                    <FormControl component="fieldset">
                      <FormLabel
                        component="legend"
                        className={classes.textField}
                      >
                        Item Type
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue="top"
                      >
                        <FormControlLabel
                          value="Group"
                          control={<Radio color="primary" />}
                          label="Group"
                          labelPlacement="top"
                          onChange={handleChange('itemType')}
                        />
                        <FormControlLabel
                          value="Services"
                          control={<Radio color="primary" />}
                          label="Services"
                          labelPlacement="top"
                          onChange={handleChange('itemType')}
                        />
                      </RadioGroup>
                    </FormControl>
                    <TextField
                      id="outlined-itemName"
                      label="Item Name"
                      value={values.itemName}
                      onChange={handleChange('itemName')}
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
                    />
                    <TextField
                      id="outlined-SKU"
                      label="SKU"
                      value={values.sku}
                      onChange={handleChange('sku')}
                      fullWidth
                      variant="outlined"
                      className={classes.textField}
                    />
                    <TextField
                      id="outlined-barcode"
                      label="Barcode"
                      value={values.barcode}
                      onChange={handleChange('barcode')}
                      fullWidth
                      variant="outlined"
                      className={classes.textField}
                    />
                    <TextField
                      id="outlined-Unit"
                      label="Unit"
                      value={values.unit}
                      onChange={handleChange('unit')}
                      fullWidth
                      variant="outlined"
                      className={classes.textField}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  Image Upload
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={0}>
                <Grid item xs={12} md={6} lg={6}>
                  <div className={classes.container}>
                    <TextField
                      id="outlined-Dimensions"
                      label="Dimensions (cm)"
                      value={values.itemDimension}
                      onChange={handleChange('itemDimension')}
                      fullWidth
                      variant="outlined"
                      className={classes.textField}
                    />
                    <TextField
                      id="outlined-Manufacturer"
                      label="Manufacturer"
                      value={values.manufacturer}
                      onChange={handleChange('manufacturer')}
                      fullWidth
                      variant="outlined"
                      className={classes.textField}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <div className={classes.container}>
                    <TextField
                      id="outlined-Weight"
                      label="Weight (kg)"
                      value={values.itemWeight}
                      onChange={handleChange('itemWeight')}
                      fullWidth
                      variant="outlined"
                      className={classes.textField}
                    />
                  </div>
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={0}>
                <Grid item xs={12} md={6} lg={6}>
                  <div className={classes.container}>
                    <TextField
                      id="outlined-Selling-Price"
                      label="Selling Price"
                      value={values.sellingPrice}
                      onChange={handleChange('sellingPrice')}
                      fullWidth
                      variant="outlined"
                      className={classes.textField}
                    />
                    <TextField
                      id="outlined-quantity"
                      label="Quantity"
                      value={values.quantity}
                      onChange={handleChange('quantity')}
                      fullWidth
                      variant="outlined"
                      className={classes.textField}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <div className={classes.container}>
                    <TextField
                      id="outlined-Cost-Price"
                      label="Cost Price"
                      value={values.costPrice}
                      onChange={handleChange('costPrice')}
                      fullWidth
                      variant="outlined"
                      className={classes.textField}
                    />
                  </div>
                </Grid>
              </Grid>
              <Divider />
            </div>
          )}
        </DialogContent>

        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => {
                dispatchCreateNewTransferOrderAction(values);
              }}
              color="primary"
              variant="contained"
              // disabled={!canBeSubmitted()}
            >
              Save
            </Button>
          )}
          <Button
            onClick={() => closeNewTransferOrderDialogAction()}
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

TransferOrderDialog.propTypes = {
  loading: PropTypes.bool,
  transferOrderDialog: PropTypes.object,
  getAllWarehouses: PropTypes.array,
  dispatchCreateNewTransferOrderAction: PropTypes.func,
  closeNewTransferOrderDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  transferOrderDialog: Selectors.makeSelectTransferOrderDialog(),
  getAllWarehouses: Selectors.makeSelectGetAllWarehouses(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCreateNewTransferOrderAction: evt =>
      dispatch(Actions.createNewTransferOrder(evt)),
    closeNewTransferOrderDialogAction: () =>
      dispatch(Actions.closeNewTransferOrderDialog()),
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
)(TransferOrderDialog);
