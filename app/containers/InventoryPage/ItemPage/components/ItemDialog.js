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
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';

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

const ItemDialog = props => {
  const {
    loading,
    itemDialog,
    getAllWarehouses,
    closeNewItemDialogAction,
    closeEditEmployeeDialogAction,
    dispatchCreateNewItemAction,
  } = props;

  const classes = useStyles();
  const [values, setValues] = React.useState({
    barcode: '',
    costPrice: '',
    description: '',
    fileFormat: '',
    state: '',
    fileUrl: '',
    itemDimension: '',
    itemName: '',
    itemType: '',
    itemWeight: '',
    manufacturer: '',
    quantity: '',
    sellingPrice: '',
    sku: '',
    unit: '',
    wareHouseId: '',
    orgId: '',
    itemCategory: '',
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
        {...itemDialog.props}
        onClose={closeNewItemDialogAction}
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
              onClick={closeNewItemDialogAction}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {itemDialog.type === 'new' ? 'New Warehouse' : 'Edit Warehouse'}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={closeNewItemDialogAction}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Divider />

        <DialogContent>
          {itemDialog.type === 'new' ? (
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
                          value="GROUP"
                          control={<Radio color="primary" />}
                          label="Group"
                          labelPlacement="top"
                          onChange={handleChange('itemType')}
                        />
                        <FormControlLabel
                          value="SERVICE"
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
                    {/* <TextField
                id="outlined-UPC"
                label="UPC"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              />
              <TextField
                id="outlined-EAN"
                label="EAN"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              /> */}
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
                    {/* <TextField
                id="outlined-Brand" 
                label="Brand"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              />
              <TextField
                id="outlined-MPN"
                label="MPN"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              />
              <TextField
                id="outlined-ISBN"
                label="ISBN"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              /> */}
                  </div>
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={0}>
                <Grid item xs={12} md={6} lg={6}>
                  <div className={classes.container}>
                    {/* <FormControlLabel
                value="Sales Information"
                control={<Checkbox color="primary" />}
                label="Sales Information"
                labelPlacement="start"
              /> */}
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
                    {/* <TextField 
                id="outlined-Account2" 
                label="Account"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              />
              <TextField 
                id="outlined-Description"
                label="Description"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                className={classes.textField}
              />
              <TextField 
                id="outlined-Tax"
                label="Tax"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              /> */}
                  </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <div className={classes.container}>
                    {/* <FormControlLabel
                value="Purchase Information"
                control={<Checkbox color="primary" />}
                label="Sales Information"
                labelPlacement="start"
              /> */}
                    <TextField
                      id="outlined-Cost-Price"
                      label="Cost Price"
                      value={values.costPrice}
                      onChange={handleChange('costPrice')}
                      fullWidth
                      variant="outlined"
                      className={classes.textField}
                    />
                    <Autocomplete
                      id="combo-itemCategory"
                      options={category}
                      getOptionLabel={option => option.name}
                      onChange={(evt, ve) => handleCategoryChange(evt, ve)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Select Category"
                          variant="outlined"
                          placeholder="Select Category"
                          fullWidth
                          className={classes.textField}
                        />
                      )}
                    />
                    <Autocomplete
                      id="combo-wareHouseId"
                      options={getAllWarehouses}
                      getOptionLabel={option => option.name}
                      onChange={(evt, ve) => handleWarehouseChange(evt, ve)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Select WareHouse"
                          variant="outlined"
                          placeholder="Select WareHouse"
                          fullWidth
                          className={classes.textField}
                        />
                      )}
                    />
                    {/* <TextField
                id="outlined-Cost-Price"
                label="Cost Price"
                value={values.costPrice}
                onChange={handleChange('costPrice')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              />
              <TextField
                id="outlined-Account1"
                label="Account"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              />
              <TextField
                id="outlined-Description"
                label="Description"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                className={classes.textField}
              /> */}
                  </div>
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
                    {/* <TextField
                id="outlined-UPC"
                label="UPC"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              />
              <TextField
                id="outlined-EAN"
                label="EAN"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              /> */}
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
                    {/* <TextField
                id="outlined-Brand" 
                label="Brand"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              />
              <TextField
                id="outlined-MPN"
                label="MPN"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              />
              <TextField
                id="outlined-ISBN"
                label="ISBN"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              /> */}
                  </div>
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={0}>
                <Grid item xs={12} md={6} lg={6}>
                  <div className={classes.container}>
                    {/* <FormControlLabel
                value="Sales Information"
                control={<Checkbox color="primary" />}
                label="Sales Information"
                labelPlacement="start"
              /> */}
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
                    {/* <TextField 
                id="outlined-Account2" 
                label="Account"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              />
              <TextField 
                id="outlined-Description"
                label="Description"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                className={classes.textField}
              />
              <TextField 
                id="outlined-Tax"
                label="Tax"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              /> */}
                  </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <div className={classes.container}>
                    {/* <FormControlLabel
                value="Purchase Information"
                control={<Checkbox color="primary" />}
                label="Sales Information"
                labelPlacement="start"
              /> */}
                    <TextField
                      id="outlined-Cost-Price"
                      label="Cost Price"
                      value={values.costPrice}
                      onChange={handleChange('costPrice')}
                      fullWidth
                      variant="outlined"
                      className={classes.textField}
                    />
                    {/* <TextField
                id="outlined-Cost-Price"
                label="Cost Price"
                value={values.costPrice}
                onChange={handleChange('costPrice')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              />
              <TextField
                id="outlined-Account1"
                label="Account"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                className={classes.textField}
              />
              <TextField
                id="outlined-Description"
                label="Description"
                value={values.itemName}
                onChange={handleChange('itemName')}
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                className={classes.textField}
              /> */}
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
                dispatchCreateNewItemAction(values);
              }}
              color="primary"
              variant="contained"
              // disabled={!canBeSubmitted()}
            >
              Save
            </Button>
          )}
          <Button
            onClick={() => closeNewItemDialogAction()}
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

ItemDialog.propTypes = {
  loading: PropTypes.bool,
  itemDialog: PropTypes.object,
  getAllWarehouses: PropTypes.array,
  dispatchCreateNewItemAction: PropTypes.func,
  closeNewItemDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  itemDialog: Selectors.makeSelectItemDialog(),
  getAllWarehouses: Selectors.makeSelectGetAllWarehouses(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCreateNewItemAction: evt => dispatch(Actions.createNewItem(evt)),
    closeNewItemDialogAction: () => dispatch(Actions.closeNewItemDialog()),
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
)(ItemDialog);
