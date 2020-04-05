/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import LoadingIndicator from '../../../../../components/LoadingIndicator';
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TransferOrderDialog = props => {
  const {
    loading,
    transferOrderDialog,
    getAllItems,
    getAllWarehouses,
    closeNewTransferOrderDialogAction,
    closeEditEmployeeDialogAction,
    dispatchCreateNewTransferOrderAction,
  } = props;

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

  console.log(values, 'values rows');

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
    newRow[idx].transferQuantity = value;
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
                  </div>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <div className={classes.container}>
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
                  </div>
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={0}>
                <Grid item xs={12} md={12} lg={12}>
                  {/* <TableTransfer
                    getAllItems={getAllItems}
                    values={values}
                    setValues={setValues}
                    addRow={addRow}
                    removeRow={removeRow}
                    handleItemChange={handleItemChange}
                    handleQuantityChange={handleQuantityChange}
                  /> */}

                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Item Details</TableCell>
                          <TableCell align="center">
                            Current Availablilty
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
                                options={getAllItems}
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
                                disabled
                                id="filled-disabled"
                                label="Source Stock"
                                defaultValue="0.00 Units"
                                variant="filled"
                              />
                              &nbsp; | &nbsp;
                              <TextField
                                disabled
                                id="filled-disabled"
                                label="Destination Stock"
                                defaultValue="0.00 Units"
                                variant="filled"
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
                    </Table>
                  </TableContainer>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addRow()}
                  >
                    Add Row
                  </Button>
                </Grid>
              </Grid>
              <Divider />
            </div>
          ) : (
            <div />
          )}
        </DialogContent>

        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
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
  getAllItems: PropTypes.array,
  dispatchCreateNewTransferOrderAction: PropTypes.func,
  closeNewTransferOrderDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  transferOrderDialog: Selectors.makeSelectTransferOrderDialog(),
  getAllWarehouses: Selectors.makeSelectGetAllWarehouses(),
  getAllItems: Selectors.makeSelectGetAllItems(),
});

function mapDispatchToProps(dispatch) {
  return {
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
