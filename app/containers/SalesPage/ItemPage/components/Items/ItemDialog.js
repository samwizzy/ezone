/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import EzoneUtils from './../../../../../utils/EzoneUtils';
import {
  TextField,
  makeStyles,
  Button,
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
  Table, TableBody, TableRow, TableCell,
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
  }
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
    getAllWarehouses,
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

  const handleImageChange = ({ target }) => {
    // const { name, files } = target
    // const result = EzoneUtils.toBase64(files[0])
    // result.then(data => updateCompanyInfo({ ...companyInfo, logo: data }))
  }

  const uploadFileAction = file => {
    // setValues({ ...values, attachments: file });
  };

  const { params } = match;
  useEffect(() => {
    getItemByIdAction(params.sku);
  }, []);

  useEffect(() => {
    setValues({ ...getItemById });
  }, [getItemById]);

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
                <React.Fragment>
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
                          <TableCell>
                            <TextField
                              id="outlined-Dimensions"
                              size="small"
                              label="Dimensions (cm)"
                              value={values.itemDimension}
                              onChange={handleChange('itemDimension')}
                              variant="outlined"
                            />
                          </TableCell>

                          <TableCell>
                            <TextField
                              id="outlined-Manufacturer"
                              size="small"
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
                              id="outlined-Weight"
                              size="small"
                              label="Weight (kg)"
                              value={values.itemWeight}
                              onChange={handleChange('itemWeight')}
                              variant="outlined"
                            />
                          </TableCell>

                          <TableCell>
                            <TextField
                              id="outlined-Selling-Price"
                              size="small"
                              label="Selling Price"
                              value={values.sellingPrice}
                              onChange={handleChange('sellingPrice')}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <TextField
                              id="outlined-Cost-Price"
                              size="small"
                              label="Cost Price"
                              value={values.costPrice}
                              onChange={handleChange('costPrice')}
                              variant="outlined"
                            />
                          </TableCell>

                          <TableCell>
                            <Autocomplete
                              id="combo-itemCategory"
                              fullWidth={false}
                              size="small"
                              options={category}
                              getOptionLabel={option => option.name}
                              onChange={(evt, ve) => handleCategoryChange(evt, ve)}
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  label="Select Category"
                                  variant="outlined"
                                  placeholder="Select Category"
                                />
                              )}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2}>
                            <Autocomplete
                              id="combo-wareHouseId"
                              size="small"
                              options={getAllWarehouses}
                              getOptionLabel={option => option.name}
                              onChange={(evt, ve) => handleWarehouseChange(evt, ve)}
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
                      </TableBody>
                    </Table>
                  </Grid>
                </React.Fragment>
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
  getItemById: Selectors.makeSelectGetItemByIdResponse(),
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
