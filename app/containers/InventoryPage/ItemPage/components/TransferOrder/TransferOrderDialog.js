/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import EzoneUtils from '../../../../../utils/EzoneUtils'
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
  makeStyles,
  Button,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TextField
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import DateFnsUtils from '@date-io/date-fns';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    "& .MuiCardActions-root": {
      justifyContent: "flex-end",
      padding: theme.spacing(2),
      borderTop: `1px solid ${theme.palette.divider}`
    }
  },
  formTable: {
    width: 500,
    "& th.MuiTableCell-root": {
      fontWeight: theme.typography.fontWeightMedium
    },
    "& .MuiTableCell-root": {
      borderBottom: "none !important"
    },
  },
  table: {
    marginTop: theme.spacing(2),
    '& tr:hover': {
      cursor: 'pointer',
    },
    '& .MuiTableFooter-root': {
      '& .MuiTableCell-root': {
        border: 'none !important',
        padding: theme.spacing(2, 0)
      },
    },
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        color: theme.palette.common.white,
        padding: theme.spacing(1, 2)
      },
      '& .MuiTableCell-root:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiTableCell-root:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
}));

const initialItem = {
  itemSku: '',
  transferQuantity: ''
}

const initialState = {
  referenceNumber: '',
  destinationWarehouseUuId: '',
  reason: '',
  sourceWareHouseUuid: '',
  items: []
}

const TransferOrderDialog = props => {
  const {
    loading,
    dialog,
    items,
    getAllWarehouses,
    createNewTransferOrder,
    itemsPerWarehouse,
  } = props;

  const classes = useStyles();
  const [values, setValues] = React.useState({ ...initialState })

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      const matchedData = EzoneUtils.matchWithPairs({ ...initialState }, dialog.data)
      const items = EzoneUtils.matchArrayPairs({ sku: 'itemSku', transferredQuantity: 'transferQuantity' }, dialog.data.items)
      const { id, sourceWarehouseUuid: sourceWareHouseUuid, destinationWarehouseUuid: destinationWarehouseUuId } = dialog.data
      const newData = Object.assign({}, values, { ...matchedData, items }, { id, sourceWareHouseUuid, destinationWarehouseUuId })
      setValues(newData);
    } else {
      setValues({ ...initialState });
    }
  }, []);

  const canBeSubmitted = () => {
    const { referenceNumber, destinationWarehouseUuId, reason } = values;
    return referenceNumber.length > 0 && destinationWarehouseUuId.length > 0 && reason.length > 0;
  }

  const handleItemChange = i => event => {
    const { name, value } = event.target
    const items = [...values.items]
    items[i][name] = value
    setValues({ ...values, items });
  }

  const handleSelectItemChange = i => (event, object) => {
    const items = [...values.items]
    const { id: itemId, sku: itemSku, quantity: transferQuantity } = object
    items[i] = Object.assign({}, { itemId, itemSku, transferQuantity })
    setValues({ ...values, items });
  }

  const addRow = () => {
    setValues({ ...values, items: [...values.items, { ...initialItem }] });
  }

  const removeRow = i => () => {
    setValues({ ...values, items: values.items.filter((item, id) => id !== i) });
  }

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const handleSelectChange = name => (event, object) => {
    setValues({ ...values, [name]: object.uuid });
  }

  const handleSubmit = () => {
    dialog.type === 'new' ? createNewTransferOrder(values) : ""
  }

  console.log(items, 'items');
  console.log(getAllWarehouses, 'getAllWarehouses');

  console.log(values, 'values');
  console.log(dialog, 'trasnsferDialog den');
  return (
    <div>
      <Card elevation={0} className={classes.card}>
        <CardHeader title={dialog.type === 'new' ? 'New Transfer Order' : 'Update Transfer Order'} />

        <Divider />

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Table size="small" className={classes.formTable}>
                <TableBody>
                  <TableRow>
                    <TableCell>Reference Number</TableCell>
                    <TableCell>
                      <TextField
                        id="outlined-reference-number"
                        size="small"
                        name="referenceNumber"
                        label="Reference Number"
                        value={values.referenceNumber}
                        style={{ width: 300 }}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Source Warehouse</TableCell>
                    <TableCell>
                      <Autocomplete
                        id="combo-source-warehouse"
                        size="small"
                        options={getAllWarehouses}
                        getOptionLabel={option => option.name}
                        onChange={handleSelectChange('sourceWareHouseUuid')}
                        value={values.sourceWareHouseUuid ? _.find(getAllWarehouses, { uuid: values.sourceWareHouseUuid }) : null}
                        style={{ width: 300 }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Source Warehouse"
                            variant="outlined"
                            placeholder="Source Warehouse"
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Destination Warehouse</TableCell>
                    <TableCell>
                      <Autocomplete
                        id="combo-destination"
                        size="small"
                        options={getAllWarehouses}
                        getOptionLabel={option => option.name}
                        onChange={handleSelectChange('destinationWarehouseUuId')}
                        value={values.destinationWarehouseUuId ? _.find(getAllWarehouses, { uuid: values.destinationWarehouseUuId }) : null}
                        style={{ width: 300 }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Destination Warehouse"
                            variant="outlined"
                            placeholder="Destination Warehouse"
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Reason</TableCell>
                    <TableCell>
                      <TextField
                        id="outlined-reason"
                        size="small"
                        name="reason"
                        label="Reason"
                        value={values.reason}
                        onChange={handleChange}
                        variant="outlined"
                        style={{ width: 300 }}
                        multiline
                        rows={3}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Item SKU</TableCell>
                        <TableCell>Transfer Quantity</TableCell>
                        <TableCell align="right">
                          <Button color="inherit" onClick={addRow} startIcon={<AddIcon />}>New</Button>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values.items.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <Autocomplete
                              id={`combo-items-${i}`}
                              size="small"
                              options={items.filter(item => item.wareHouseUuid === values.sourceWareHouseUuid)}
                              getOptionLabel={option => option.itemName}
                              onChange={handleSelectItemChange(i)}
                              value={row.itemId ? _.find(items, { id: row.itemId }) : null}
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  label="Select Items"
                                  variant="outlined"
                                  placeholder="Items"
                                  fullWidth
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              disabled
                              id={`item-sku-${i}`}
                              size="small"
                              variant="outlined"
                              label="Item SKU"
                              name="itemSku"
                              onChange={handleItemChange(i)}
                              value={row.itemSku ? row.itemSku : ""}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id={`transfer-quantity-${i}`}
                              size="small"
                              label="Transfer Quantity"
                              variant="outlined"
                              name="transferQuantity"
                              onChange={handleItemChange(i)}
                              value={row.transferQuantity ? row.transferQuantity : ""}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="outlined"
                              size="small"
                              color="secondary"
                              onClick={removeRow(i)}
                              startIcon={<CancelIcon />}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={4}>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={addRow}
                            startIcon={<AddIcon />}
                          >
                            Add Row
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button
            size="small"
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={loading ? loading : !canBeSubmitted()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {dialog.type === 'new' ? 'Save' : 'Update'}
          </Button>
          <Button
            size="small"
            onClick={() => { }}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

TransferOrderDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
  getAllWarehouses: PropTypes.array,
  items: PropTypes.array,
  createNewTransferOrder: PropTypes.func,
  getAllItemsPerWarehouse: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectTransferOrderDialog(),
  getAllWarehouses: Selectors.makeSelectGetAllWarehouses(),
  itemsPerWarehouse: Selectors.makeSelectGetAllItemsPerWarehouse(),
  items: Selectors.makeSelectGetAllItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllItemsPerWarehouse: data => dispatch(Actions.getAllItemsPerWarehouse(data)),
    createNewTransferOrder: data => dispatch(Actions.createNewTransferOrder(data)),
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
