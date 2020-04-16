/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
  TextField,
  makeStyles,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
  FormControlLabel,
  Radio,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import PaperDropzone from '../../../components/PaperDropzone';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import LoadingIndicator from '../../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    color: theme.typography.fontWeightBold,
  },
  textField: {},
  button: {
    marginRight: theme.spacing(1),
  },
}));

const category = [
  { id: 1, name: 'STOCK_ITEM' },
  { id: 2, name: 'COMPONENT_ITEM' },
];

const ItemDialog = props => {
  const {
    history,
    message,
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
    attachments: [],
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

  const uploadFileAction = file => {
    // setValues({ ...values, attachments: file });
  };

  console.log(values, 'values');

  // if (message.id) {
  //   return <Redirect to="/inventory/items" />;
  // }

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                className={classes.title}
                color="primary"
                gutterBottom
              >
                {itemDialog.type === 'new' ? 'New Item' : 'Edit Item'}
              </Typography>
            </Grid>

            {itemDialog.type === 'new' ? (
              <React.Fragment>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" className={classes.textField}>
                      <Typography
                        variant="subtitle1"
                        className={classes.title}
                        color="textSecondary"
                      >
                        Item Type
                      </Typography>
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
                        onChange={handleChange('itemType')}
                      />
                      <FormControlLabel
                        value="SERVICE"
                        control={<Radio color="primary" />}
                        label="Services"
                        onChange={handleChange('itemType')}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-itemName"
                        label="Item Name"
                        value={values.itemName}
                        onChange={handleChange('itemName')}
                        variant="outlined"
                        className={classes.textField}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-SKU"
                        label="SKU"
                        value={values.sku}
                        onChange={handleChange('sku')}
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-barcode"
                        label="Barcode"
                        value={values.barcode}
                        onChange={handleChange('barcode')}
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-Unit"
                        label="Unit"
                        value={values.unit}
                        onChange={handleChange('unit')}
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <PaperDropzone uploadFileAction={uploadFileAction} />
                </Grid>
                <Divider />
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-Dimensions"
                        label="Dimensions (cm)"
                        value={values.itemDimension}
                        onChange={handleChange('itemDimension')}
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-Manufacturer"
                        label="Manufacturer"
                        value={values.manufacturer}
                        onChange={handleChange('manufacturer')}
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-Weight"
                        label="Weight (kg)"
                        value={values.itemWeight}
                        onChange={handleChange('itemWeight')}
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-Selling-Price"
                        label="Selling Price"
                        value={values.sellingPrice}
                        onChange={handleChange('sellingPrice')}
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-Cost-Price"
                        label="Cost Price"
                        value={values.costPrice}
                        onChange={handleChange('costPrice')}
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
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
                    </Grid>
                    <Grid item xs={6}>
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
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
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
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            ) : (
              <div>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" className={classes.textField}>
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
                        onChange={handleChange('itemType')}
                      />
                      <FormControlLabel
                        value="SERVICE"
                        control={<Radio color="primary" />}
                        label="Services"
                        onChange={handleChange('itemType')}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-itemName"
                        label="Item Name"
                        value={values.itemName}
                        onChange={handleChange('itemName')}
                        variant="outlined"
                        className={classes.textField}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-SKU"
                        label="SKU"
                        value={values.sku}
                        onChange={handleChange('sku')}
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-barcode"
                        label="Barcode"
                        value={values.barcode}
                        onChange={handleChange('barcode')}
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-Unit"
                        label="Unit"
                        value={values.unit}
                        onChange={handleChange('unit')}
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <PaperDropzone uploadFileAction={uploadFileAction} />
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-Dimensions"
                        label="Dimensions (cm)"
                        value={values.itemDimension}
                        onChange={handleChange('itemDimension')}
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-Manufacturer"
                        label="Manufacturer"
                        value={values.manufacturer}
                        onChange={handleChange('manufacturer')}
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-Weight"
                        label="Weight (kg)"
                        value={values.itemWeight}
                        onChange={handleChange('itemWeight')}
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-Selling-Price"
                        label="Selling Price"
                        value={values.sellingPrice}
                        onChange={handleChange('sellingPrice')}
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-Cost-Price"
                        label="Cost Price"
                        value={values.costPrice}
                        onChange={handleChange('costPrice')}
                        fullWidth
                        variant="outlined"
                        className={classes.textField}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
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
                    </Grid>
                    <Grid item xs={6}>
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
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
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
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            )}
          </Grid>
        </CardContent>

        <CardActions>
          <Grid container spacing={2}>
            <Grid item>
              {loading ? (
                <LoadingIndicator />
              ) : (
                <Button
                  className={classes.button}
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
              {/* <Button
                className={classes.button}
                onClick={() => closeNewItemDialogAction()}
                color="primary"
                variant="contained"
              >
                Cancel
              </Button> */}
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};

ItemDialog.propTypes = {
  loading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  itemDialog: PropTypes.object,
  getAllWarehouses: PropTypes.array,
  dispatchCreateNewItemAction: PropTypes.func,
  closeNewItemDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  message: Selectors.makeSelectMessage(),
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
  withRouter,
  withConnect,
  memo,
)(ItemDialog);
