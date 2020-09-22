/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import EzoneUtils from '../../../../../utils/EzoneUtils'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { Autocomplete } from '@material-ui/lab';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {
  TextField,
  makeStyles,
  Button,
  Collapse,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Divider,
  List, ListItem, ListItemText,
  Typography,
  Table, TableBody, TableRow, TableCell,
  FormControlLabel,
  Radio,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';
import PaperDropzone from './PaperDropzone';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    boxShadow: theme.shadows[0],
    '& .MuiCardActions-root': {
      justifyContent: 'flex-end',
      "& button": {
        marginLeft: theme.spacing(1)
      }
    },
  },
  table: {
    whiteSpace: "nowrap",
    display: "flex",
    "& td, th": {
      borderBottom: 0
    }
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const category = [
  { id: 1, value: 'STOCK_ITEM', label: 'Stock' },
  { id: 2, value: 'COMPONENT_ITEM', label: 'Component' },
];

const initialState = {
  barcode: '',
  costPrice: '',
  description: '',
  state: '',
  itemDimension: '',
  itemName: '',
  itemCategory: '',
  itemType: '',
  itemWeight: '',
  manufacturer: '',
  quantity: '',
  sellingPrice: '',
  sku: '',
  unit: '',
  wareHouseId: '',
  vendorId: '',
  orgId: '',
  componentItemIds: null,
  inventoryAccountId: '',
  taxAccountId: '',
  salesAccountId: '',
  purchaseAccountId: '',
  attachments: [],
}

const ItemDialog = props => {
  const {
    match,
    loading,
    dialog,
    accounts,
    vendors,
    warehouses,
    getAllItems,
    createNewItem,
    updateItem,
    itemById,
  } = props;

  const classes = useStyles();
  const [values, setValues] = React.useState({ ...initialState });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  }

  const canBeSubmitted = () => {
    const { itemName, itemType, description, costPrice, itemCategory, wareHouseId, manufacturer } = values;
    return (
      itemName.length > 0 && itemType.length > 0 && description.length > 0 &&
      costPrice && manufacturer.length > 0 && wareHouseId && itemCategory.length > 0
    )
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  }

  const handleSubmit = () => {
    dialog.type === 'new' ? createNewItem(values) : updateItem(values)
  }

  const handleMultiSelectChange = name => (event, arrValues) => {
    setValues({ ...values, [name]: arrValues });
  };

  const handleSelectChange = name => (event, value) => {
    if (name === 'itemCategory') {
      setValues({ ...values, [name]: value.value });
    } else {
      setValues({ ...values, [name]: value.id });
    }
  };

  const uploadFileAction = file => {
    setValues({ ...values, attachments: [...values.attachments, file] });
  };

  const { params } = match;
  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      const matchedData = EzoneUtils.matchWithPairs({ ...initialState }, dialog.data)
      const { id, componentItems: componentItemIds, wareHouseUuid: wareHouseId } = dialog.data
      const newData = Object.assign({}, values, matchedData, { id, wareHouseId, componentItemIds })
      setValues(newData);
    } else {
      setValues({ ...initialState });
    }
  }, []);

  useEffect(() => {
  }, [itemById]);

  console.log(values, "values item")
  console.log(loading, "loading item")

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <Card square className={classes.card}>
            <CardContent>
              <Typography
                variant="h6"
                className={classes.title}
              >
                {params.status === 'new' ? 'New Item' : 'Edit Item'}
              </Typography>
            </CardContent>
            <Divider />

            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Table size="small" className={classes.table}>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">Item Type</FormLabel>
                            <RadioGroup
                              row
                              aria-label="position"
                              name="position"
                              value={values.itemType}
                            >
                              <FormControlLabel
                                value="GOODS"
                                control={<Radio color="primary" />}
                                label="Goods"
                                onChange={handleChange('itemType')}
                              />
                              <FormControlLabel
                                value="SERVICE"
                                control={<Radio color="primary" />}
                                label="Service"
                                onChange={handleChange('itemType')}
                              />
                            </RadioGroup>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <TextField
                            id="outlined-item-name"
                            size="small"
                            label="Item Name"
                            value={values.itemName}
                            onChange={handleChange('itemName')}
                            variant="outlined"
                          />
                        </TableCell>

                        <TableCell>
                          <TextField
                            id="outlined-sku"
                            size="small"
                            label="SKU"
                            value={values.sku}
                            onChange={handleChange('sku')}
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <TextField
                            id="outlined-barcode"
                            size="small"
                            label="Barcode"
                            value={values.barcode}
                            onChange={handleChange('barcode')}
                            variant="outlined"
                          />
                        </TableCell>

                        <TableCell>
                          <TextField
                            id="outlined-Unit"
                            size="small"
                            label="Unit"
                            value={values.unit}
                            onChange={handleChange('unit')}
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <PaperDropzone uploadFileAction={uploadFileAction} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell colSpan="2">
                          <TextField
                            id="outlined-Manufacturer"
                            size="small"
                            fullWidth
                            name="manufacturer"
                            label="Manufacturer"
                            value={values.manufacturer}
                            onChange={handleChange('manufacturer')}
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <TextField
                            id="outlined-quantity"
                            size="small"
                            fullWidth
                            label="Quantity"
                            value={values.quantity}
                            onChange={handleChange('quantity')}
                            variant="outlined"
                          />
                        </TableCell>

                        <TableCell>
                          <TextField
                            id="outlined-dimensions"
                            size="small"
                            fullWidth
                            label="Dimensions (cm)"
                            value={values.itemDimension}
                            onChange={handleChange('itemDimension')}
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <TextField
                            id="outlined-weight"
                            size="small"
                            fullWidth
                            label="Weight (kg)"
                            value={values.itemWeight}
                            onChange={handleChange('itemWeight')}
                            variant="outlined"
                          />
                        </TableCell>

                        <TableCell>
                          <TextField
                            id="outlined-selling-price"
                            size="small"
                            fullWidth
                            label="Selling Price"
                            value={values.sellingPrice}
                            onChange={handleChange('sellingPrice')}
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan="2">
                          <Autocomplete
                            multiple
                            id="combo-component-item-ids"
                            size="small"
                            options={getAllItems}
                            getOptionLabel={option => option.itemName}
                            onChange={handleMultiSelectChange('componentItemIds')}
                            value={values.componentItemIds ? values.componentItemIds : []}
                            renderInput={params => (
                              <TextField
                                {...params}
                                label="Select Items"
                                variant="outlined"
                                fullWidth
                                placeholder="Items"
                              />
                            )}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <TextField
                            id="outlined-cost-price"
                            size="small"
                            label="Cost Price"
                            value={values.costPrice}
                            onChange={handleChange('costPrice')}
                            variant="outlined"
                          />
                        </TableCell>

                        <TableCell>
                          <Autocomplete
                            id="combo-item-category"
                            size="small"
                            options={category}
                            getOptionLabel={option => option.label}
                            onChange={handleSelectChange('itemCategory')}
                            value={values.itemCategory ? _.find(category, { value: values.itemCategory }) : null}
                            renderInput={params => (
                              <TextField
                                {...params}
                                label="Select Category"
                                variant="outlined"
                                fullWidth
                                placeholder="Category"
                              />
                            )}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan="2">
                          <Autocomplete
                            id="combo-item-vendor"
                            size="small"
                            options={vendors}
                            getOptionLabel={option => option.fullName}
                            onChange={handleSelectChange('vendorId')}
                            value={values.vendorId ? _.find(vendors, { id: values.vendorId }) : null}
                            renderInput={params => (
                              <TextField
                                {...params}
                                label="Select Vendor"
                                variant="outlined"
                                fullWidth
                                placeholder="Vendors"
                              />
                            )}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <TextField
                            id="outlined-state"
                            size="small"
                            name="state"
                            label="State"
                            value={values.state}
                            onChange={handleChange('state')}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Autocomplete
                            id="combo-warehouse-id"
                            size="small"
                            options={warehouses}
                            getOptionLabel={option => option.name}
                            onChange={handleSelectChange('wareHouseId')}
                            value={values.wareHouseId ? _.find(warehouses, { uuid: values.wareHouseId }) : null}
                            renderInput={params => (
                              <TextField
                                {...params}
                                label="Select WareHouse"
                                variant="outlined"
                                placeholder="WareHouse"
                              />
                            )}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <TextField
                            id="standard-description"
                            size="small"
                            label="Description"
                            variant="outlined"
                            value={values.description ? values.description : ""}
                            onChange={handleChange('description')}
                            margin="normal"
                            fullWidth
                            rows={2}
                            multiline
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan="2">
                          <List>
                            <ListItem button onClick={handleClick} dense>
                              <ListItemText primary="Accounting" />
                              {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                              <Autocomplete
                                id="combo-inventory-accounts"
                                size="small"
                                options={accounts}
                                getOptionLabel={option => option.accountName}
                                onChange={handleSelectChange('inventoryAccountId')}
                                value={values.inventoryAccountId ? _.find(accounts, { id: values.inventoryAccountId }) : null}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    margin="normal"
                                    label="Select Inventory Account"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Accounts"
                                  />
                                )}
                              />

                              <Autocomplete
                                id="combo-sales-accounts"
                                size="small"
                                options={accounts}
                                getOptionLabel={option => option.accountName}
                                onChange={handleSelectChange('salesAccountId')}
                                value={values.salesAccountId ? _.find(accounts, { id: values.salesAccountId }) : null}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    label="Select Sales Account"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Accounts"
                                  />
                                )}
                              />

                              <Autocomplete
                                id="combo-purchase-accounts"
                                size="small"
                                options={accounts}
                                getOptionLabel={option => option.accountName}
                                onChange={handleSelectChange('purchaseAccountId')}
                                value={values.purchaseAccountId ? _.find(accounts, { id: values.purchaseAccountId }) : null}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    label="Select Purchase Account"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Accounts"
                                  />
                                )}
                              />

                              <Autocomplete
                                id="combo-tax-accounts"
                                size="small"
                                options={accounts}
                                getOptionLabel={option => option.accountName}
                                onChange={handleSelectChange('taxAccountId')}
                                value={values.taxAccountId ? _.find(accounts, { id: values.taxAccountId }) : null}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    margin="normal"
                                    label="Select Tax Account"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Accounts"
                                  />
                                )}
                              />
                            </Collapse>
                          </List>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </CardContent>

            <CardActions>
              <Button
                color="primary"
                variant="outlined"
                size="small"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                color="primary"
                variant="contained"
                size="small"
                disabled={loading ? loading : !canBeSubmitted()}
                endIcon={loading && <CircularProgress size={20} />}
              >
                {dialog.type === 'new' ? 'Save' : 'Update Item'}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

ItemDialog.propTypes = {
  loading: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  dialog: PropTypes.object,
  warehouses: PropTypes.array,
  createNewItem: PropTypes.func,
  itemById: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  message: Selectors.makeSelectMessage(),
  dialog: Selectors.makeSelectItemDialog(),
  warehouses: Selectors.makeSelectGetAllWarehouses(),
  accounts: Selectors.makeSelectGetAccounts(),
  vendors: Selectors.makeSelectGetVendors(),
  itemById: Selectors.makeSelectGetItemById(),
  getAllItems: Selectors.makeSelectGetAllItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    createNewItem: data => dispatch(Actions.createNewItem(data)),
    updateItem: data => dispatch(Actions.updateItem(data)),
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
