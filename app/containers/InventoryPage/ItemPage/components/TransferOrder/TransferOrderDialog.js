/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
  makeStyles,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TextField,
  Typography,
  Paper
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import AddIcon from '@material-ui/icons/Add';
import DateFnsUtils from '@date-io/date-fns';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import LoadingIndicator from '../../../../../components/LoadingIndicator';
import TableTransfer from './TableTransfer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  table: {
    marginTop: theme.spacing(2),
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer',
    },
    '& .MuiTableFooter-root': {
      '& .MuiTableCell-root': {
        border: 'none !important',
      },
    },
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        color: theme.palette.common.white,
      },
      '& .MuiTableCell-root:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiTableCell-root:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

const TransferOrderDialog = props => {
  const {
    loading,
    transferOrderDialog,
    getAllItems,
    getAllWarehouses,
    closeNewTransferOrderDialogAction,
    closeEditEmployeeDialogAction,
    dispatchCreateNewTransferOrderAction,
    getAllItemsPerWarehouseAction,
    getAllItemsPerWarehouse,
  } = props;

  const classes = useStyles();
  const [selectedDate, handleDateChange] = React.useState(new Date());

  const [rows, setRows] = React.useState([{}]);
  const [values, setValues] = React.useState({
    referenceNumber: '',
    transferOrder: '',
    destinationWarehouseUuId: '',
    reason: '',
    sourceWareHouseUuid: '',
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

  const handleQuantityChange = idx => e => {
    const { name, value } = e.target;
    const newRow = rows;
    newRow[idx][name] = parseFloat(value);
    setRows(newRow);
  };

  const handleItemChange = (e, value, idx) => {
    const newRoww = rows;
    newRoww[idx] = {
      itemId: value.id,
      itemSku: value.sku,
      sourceStock: value.unit,
    };
    setRows(newRoww);
  };

  const addRow = () => {
    const item = {
      itemId: '',
      itemSku: '',
      transferQuantity: '',
      sourceStock: '',
      destinationStock: '',
    };
    setRows([...rows, item]);
  };

  const removeRow = idx => {
    setRows(rows.filter((item, id) => id !== idx));
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSourceChange = (evt, value) => {
    getAllItemsPerWarehouseAction(value.uuid);
    setValues({ ...values, sourceWareHouseUuid: value.uuid });
  };

  const handleDestinationChange = (evt, value) => {
    setValues({ ...values, destinationWarehouseUuId: value.uuid });
  };

  console.log(getAllItemsPerWarehouse, 'getAllItemsPerWarehouse');
  // console.log('inventory rows -> ', rows);

  console.log(rows, 'rows');
  console.log(values, 'values');
  return (
    <div>
      <Card elevation={0}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                {transferOrderDialog.type === 'new' ? 'New Transfer Order' : 'Edit Transfer Order'}
              </Typography>
            </Grid>
            {transferOrderDialog.type === 'new' ? (
              <React.Fragment>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-referenceNumber"
                        label="Reference Number"
                        value={values.referenceNumber}
                        onChange={handleChange('referenceNumber')}
                        variant="outlined"
                        className={classes.textField}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-transfer-order"
                        label="Transfer Order"
                        value={values.transferOrder}
                        onChange={handleChange('transferOrder')}
                        variant="outlined"
                        className={classes.textField}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                    <Grid item xs={12}>
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
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Autocomplete
                        id="combo-itemCategory"
                        options={getAllWarehouses}
                        getOptionLabel={option => option.name}
                        onChange={(evt, ve) => handleSourceChange(evt, ve)}
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
                    </Grid>
                    <Grid item xs={6}>
                      <Autocomplete
                        id="combo-itemCategory"
                        options={getAllWarehouses}
                        getOptionLabel={option => option.name}
                        onChange={(evt, ve) => handleDestinationChange(evt, ve)}
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
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Item Details</TableCell>
                            <TableCell align="center">
                              Destination Current Availablilty
                            </TableCell>
                            <TableCell align="center">
                              Source Current Availablilty
                            </TableCell>
                            <TableCell align="center">
                              Transfer Quantity
                            </TableCell>
                            <TableCell align="center" />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row, id) => (
                            <TableRow key={id}>
                              <TableCell component="th" scope="row">
                                <Autocomplete
                                  id="combo-itemCategory"
                                  options={getAllItemsPerWarehouse}
                                  getOptionLabel={option => option.itemName}
                                  onChange={(evt, ve) =>
                                    handleItemChange(evt, ve, id)
                                  }
                                  renderInput={params => (
                                    <TextField
                                      {...params}
                                      label="Source Warehouse"
                                      variant="outlined"
                                      name="itemId"
                                      placeholder="Source Warehouse"
                                      fullWidth
                                    />
                                  )}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextField
                                  // disabled
                                  id="filled-disabled"
                                  label="Destination Stock"
                                  defaultValue={row.destinationStock}
                                  variant="filled"
                                  name="destinationStock"
                                  // value={row.destinationStock}
                                  onChange={evt => console.log(evt, 'evt')}
                                  // onChange={(evt) => handleQuantityChange(id)}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextField
                                  disabled
                                  id="filled-disabled"
                                  label="Source Stock"
                                  defaultValue="0.00 Units"
                                  variant="filled"
                                  name="sourceStock"
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextField
                                  id="filled-disabled"
                                  label=""
                                  defaultValue="1.00"
                                  variant="outlined"
                                  name="transferQuantity"
                                  onChange={handleQuantityChange(id)}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  onClick={() => removeRow(id)}
                                >
                                  Remove
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TableCell colSpan={5}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => addRow()}
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
              </React.Fragment>
            ) : (
              <div />
            )}
          </Grid>
        </CardContent>

        <CardActions>
          <Grid container>
            <Grid item>
              {loading ? (
                <LoadingIndicator />
              ) : (
                <Button
                  className={classes.button}
                  onClick={() => {
                    dispatchCreateNewTransferOrderAction(
                      Object.assign(values, { items: rows }),
                    );
                  }}
                  color="primary"
                  variant="contained"
                  // disabled={!canBeSubmitted()}
                >
                  Save
                </Button>
              )}
              <Button
                className={classes.button}
                onClick={() => closeNewTransferOrderDialogAction()}
                color="primary"
                variant="contained"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};

TransferOrderDialog.propTypes = {
  loading: PropTypes.bool,
  transferOrderDialog: PropTypes.object,
  getAllWarehouses: PropTypes.array,
  getAllItems: PropTypes.array,
  dispatchCreateNewTransferOrderAction: PropTypes.func,
  closeNewTransferOrderDialogAction: PropTypes.func,
  getAllItemsPerWarehouseAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  transferOrderDialog: Selectors.makeSelectTransferOrderDialog(),
  getAllWarehouses: Selectors.makeSelectGetAllWarehouses(),
  getAllItems: Selectors.makeSelectGetAllItems(),
  getAllItemsPerWarehouse: Selectors.makeSelectGetAllItemsPerWarehouse(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllItemsPerWarehouseAction: evt =>
      dispatch(Actions.getAllItemsPerWarehouse(evt)),
    dispatchCreateNewTransferOrderAction: evt =>
      dispatch(Actions.createNewTransferOrder(evt)),
    closeNewTransferOrderDialogAction: () =>
      dispatch(Actions.closeNewTransferOrderDialog()),
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
