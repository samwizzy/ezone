/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  TextField,
  Grid,
  FormControlLabel,
  Radio,
  Divider,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as Actions from '../../actions';
import LoadingIndicator from '../../../../../components/LoadingIndicator';
import ModuleLayout from '../../../components/ModuleLayout';

import reducer from '../../reducer';
import saga from '../../saga';

const useStyles = makeStyles(theme => ({
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

const NewItem = props => {
  useInjectReducer({ key: 'itemPage', reducer });
  useInjectSaga({ key: 'itemPage', saga });

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
  });

  const {
    loading,
    dispatchCreateNewItemAction,
  } = props;

  console.log(values, 'values');

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleItemChange = (evt, value) => {
    setValues({ ...values, headOfWareHouseId: value.id });
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      <ModuleLayout>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6} lg={6}>
            <div className={classes.container}>
              <FormControl component="fieldset">
                <FormLabel component="legend" className={classes.textField}>Item Type</FormLabel>
                <RadioGroup row aria-label="position" name="position" defaultValue="top">
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
        <div>
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

          <Button
          // onClick={() => closeNewWarehouseDialogAction()}
            color="primary"
            variant="contained"
          >
              Cancel
          </Button>
        </div>
      </ModuleLayout>
    </React.Fragment>
  );
};

NewItem.propTypes = {
  loading: PropTypes.bool,
  dispatchCreateNewItemAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // loading: Selectors.makeSelectLoading(),
  // getAllEmployees: Selectors.makeSelectGetAllEmployees(),
  // getAllEmployees: UtilitySelectors.makeSelectAllEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCreateNewItemAction: evt =>
      dispatch(Actions.createNewItem(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewItem);
