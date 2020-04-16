/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
  Card,
  CardContent, 
  CardActions,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TextField,
  makeStyles,
  Button,
  Typography,
  Grid
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import DateFnsUtils from '@date-io/date-fns';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import LoadingIndicator from '../../../../../components/LoadingIndicator';
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    width: 600
  },
  grid: {
    marginBottom: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(2),
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
    '& .MuiTableFooter-root': {
      '& .MuiTableCell-root': {
        border: 'none !important',
      }
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
    marginRight: theme.spacing(1)
  }
}));

const InventoryAdjustmentDialog = props => {
  const {
    loading,
    inventoryAdjustDialog,
    getAllItems,
    getAllWarehouses,
    closeNewInventoryAdjustDialogAction,
    closeEditEmployeeDialogAction,
    dispatchCreateNewInventoryAdjustmentAction,
  } = props;

  console.log(inventoryAdjustDialog, 'inventoryAdjustDialog');
  const classes = useStyles();
  const [selectedDate, handleDateChange] = React.useState(new Date());

  const [rows, setRows] = React.useState([{}]);
  const [values, setValues] = React.useState({
    transferOrder: '',
    destinationWarehouseUuId: '',
    reason: '',
    sourceWareHouseUuid: '',
    // itemId: '',
    // itemSku: '',
    // transferQuantity: '',
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
    const { value } = e.target;
    const newRow = rows;
    newRow[idx].transferQuantity = parseFloat(value);
    setRows(newRow);
  };

  const handleItemChange = (e, value, idx) => {
    const newRoww = rows;
    newRoww[idx] = {
      itemId: value.id,
      itemSku: value.sku,
    };
    setRows(newRoww);
  };

  const addRow = () => {
    console.log(rows, 'rows values');
    const item = {
      itemId: '',
      itemSku: '',
      transferQuantity: '',
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
    setValues({ ...values, sourceWareHouseUuid: value.id });
  };

  const handleDestinationChange = (evt, value) => {
    setValues({ ...values, destinationWarehouseUuId: value.id });
  };

  // console.log(values, 'values');
  return (
    <div className={classes.root}>
      <Card className={classes.card} elevation={0}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" color="textPrimary" className={classes.title}>
                {inventoryAdjustDialog.type === 'new'
                  ? 'Inventory Adjustment'
                  : 'Edit Inventory Adjustment'}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                <Grid item xs={6}>
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
              {/* <TableTransfer
                getAllItems={getAllItems}
                values={values}
                setValues={setValues}
                addRow={addRow}
                removeRow={removeRow}
                handleItemChange={handleItemChange}
                handleQuantityChange={handleQuantityChange}
              /> */}

              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Item Details</TableCell>
                    <TableCell align="center">
                      Quantity Available
                    </TableCell>
                    <TableCell align="center">
                      New Quantity on hand
                    </TableCell>
                    <TableCell align="center">
                      Quantity Adjusted
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
                          options={getAllItems}
                          getOptionLabel={option => option.itemName}
                          onChange={(evt, ve) =>
                            handleItemChange(evt, ve, id)
                          }
                          renderInput={params => (
                            <TextField
                              {...params}
                              label="Items"
                              variant="outlined"
                              name="itemId"
                              placeholder="Items"
                              fullWidth
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          disabled
                          id="filled-disabled"
                          label=""
                          // defaultValue="0.00"
                          variant="filled"
                          placeholder="0.00"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="filled-disabled"
                          label=""
                          defaultValue="0.00"
                          variant="filled"
                          placeholder="0.00"
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
                        startIcon={<AddIcon/>}
                      >
                        Add Row
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </Grid>
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
                    dispatchCreateNewInventoryAdjustmentAction(
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
                onClick={() => closeNewInventoryAdjustDialogAction()}
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

InventoryAdjustmentDialog.propTypes = {
  loading: PropTypes.bool,
  inventoryAdjustDialog: PropTypes.object,
  getAllWarehouses: PropTypes.array,
  getAllItems: PropTypes.array,
  dispatchCreateNewInventoryAdjustmentAction: PropTypes.func,
  closeNewInventoryAdjustDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  inventoryAdjustDialog: Selectors.makeSelectInventoryAdjustDialog(),
  getAllWarehouses: Selectors.makeSelectGetAllWarehouses(),
  getAllItems: Selectors.makeSelectGetAllItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCreateNewInventoryAdjustmentAction: evt =>
      dispatch(Actions.createNewInventoryAdjustment(evt)),
    closeNewInventoryAdjustDialogAction: () =>
      dispatch(Actions.closeNewInventoryAdjustDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(InventoryAdjustmentDialog);
