/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EzoneUtils from './../../../../../utils/EzoneUtils';
import {
  TextField,
  makeStyles,
  Button,
  Box,
  Collapse,
  Checkbox,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Divider,
  List, ListItem, ListItemIcon, ListItemText,
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const category = [
  { id: 1, name: 'STOCK_ITEM' },
  { id: 2, name: 'COMPONENT_ITEM' },
];

const ItemDialog = props => {
  const {
    match,
    history,
    message,
    loading,
    itemDialog,
    accounts,
    vendors,
    getAllWarehouses,
    getAllItems,
    closeEditEmployeeDialogAction,
    dispatchCreateNewItemAction,
    getItemByIdAction,
    getItemById,
  } = props;

  const classes = useStyles();
  const [values, setValues] = React.useState({
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
  });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const canBeSubmitted = () => {
    const { itemName, itemType, description, costPrice, itemCategory, wareHouseId, manufacturer } = values;
    return (
      itemName.length > 0 && itemType.length > 0 && description.length > 0 &&
      costPrice.length > 0 && manufacturer.length > 0 && wareHouseId && itemCategory.length > 0
    );
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleMultiSelectChange = name => (event, arrValues) => {
    setValues({ ...values, [name]: arrValues });
  };

  const handleSelectChange = name => (event, value) => {
    if (name === 'itemCategory') {
      setValues({ ...values, [name]: value.name });
    } else {
      setValues({ ...values, [name]: value.id });
    }
  };

  const uploadFileAction = file => {
    setValues({ ...values, attachments: [...values.attachments, file] });
  };

  const { params } = match;
  useEffect(() => {
    if (params.sku) {
      getItemByIdAction(params.sku);
    }
  }, []);

  useEffect(() => {
    // setValues({ ...getItemById });
  }, [getItemById]);

  console.log(values, "values item")
  console.log(vendors, "vendors item")
  // console.log(accounts, "accounts item")

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
                {itemDialog.type === 'new' ? 'New Item' : 'Edit Item'}
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
                            <FormLabel component="legend">
                              Item Type
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-label="position"
                              name="position"
                              defaultValue="top"
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
                            id="outlined-itemName"
                            size="small"
                            label="Item Name"
                            value={values.itemName}
                            onChange={handleChange('itemName')}
                            variant="outlined"
                            className={classes.textField}
                          />
                        </TableCell>

                        <TableCell>
                          <TextField
                            id="outlined-SKU"
                            size="small"
                            label="SKU"
                            value={values.sku}
                            onChange={handleChange('sku')}
                            variant="outlined"
                            className={classes.textField}
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
                            renderInput={params => (
                              <TextField
                                {...params}
                                label="Select Items"
                                variant="outlined"
                                fullWidth
                                placeholder="Select Items"
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
                            getOptionLabel={option => option.name}
                            onChange={handleSelectChange('itemCategory')}
                            renderInput={params => (
                              <TextField
                                {...params}
                                label="Select Category"
                                variant="outlined"
                                fullWidth
                                placeholder="Select Category"
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
                            id="combo-wareHouseId"
                            size="small"
                            options={getAllWarehouses}
                            getOptionLabel={option => option.name}
                            onChange={handleSelectChange('wareHouseId')}
                            renderInput={params => (
                              <TextField
                                {...params}
                                label="Select WareHouse"
                                variant="outlined"
                                placeholder="Select WareHouse"
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
                            value={values.description}
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
                              {/* <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={values.checked}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ 'aria-labelledby': 'collapse-accounting' }}
                                />
                              </ListItemIcon> */}
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
              <div>
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                >
                  Cancel
                </Button>
                {params.statusId === 'new' ?
                  <Button
                    onClick={() => {
                      dispatchCreateNewItemAction(values);
                    }}
                    color="primary"
                    variant="contained"
                    size="small"
                    disabled={loading ? loading : !canBeSubmitted()}
                    endIcon={loading && <CircularProgress size={20} />}
                  >
                    Save
                  </Button>
                  :
                  <Button
                    onClick={() => {
                      dispatchCreateNewItemAction(values);
                    }}
                    color="primary"
                    variant="contained"
                    disabled={loading ? loading : !canBeSubmitted()}
                    endIcon={loading && <CircularProgress size={20} />}
                  >
                    Update
                  </Button>
                }
              </div>

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
  itemDialog: PropTypes.object,
  getAllWarehouses: PropTypes.array,
  dispatchCreateNewItemAction: PropTypes.func,
  getItemByIdAction: PropTypes.func,
  getItemById: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  message: Selectors.makeSelectMessage(),
  itemDialog: Selectors.makeSelectItemDialog(),
  getAllWarehouses: Selectors.makeSelectGetAllWarehouses(),
  accounts: Selectors.makeSelectGetAccounts(),
  vendors: Selectors.makeSelectGetVendors(),
  getItemById: Selectors.makeSelectGetItemByIdResponse(),
  getAllItems: Selectors.makeSelectGetAllItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCreateNewItemAction: evt => dispatch(Actions.createNewItem(evt)),
    getItemByIdAction: evt => dispatch(Actions.getItemById(evt)),
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
