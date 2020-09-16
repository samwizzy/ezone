/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TextField,
  Toolbar,
  makeStyles,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import DateFnsUtils from '@date-io/date-fns';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import LoadingIndicator from '../../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    '& .MuiCardActions-root': {
      justifyContent: 'flex-end',
      padding: theme.spacing(2),
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
  grid: {
    marginBottom: theme.spacing(2),
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
    '& .MuiTableRow-root:hover': {
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
  adjustedQuantity: 0,
  itemDescription: "",
  itemId: 0
}

const InventoryAdjustmentDialog = props => {
  const {
    loading,
    dialog,
    items,
    createNewInventoryAdjustment,
  } = props;

  const classes = useStyles();

  const [values, setValues] = React.useState({
    inventoryAdjustedDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
    items: [],
    reason: "",
    reasonDescription: "",
    referenceNumber: ""
  });

  const canBeSubmitted = () => {
    const { reason, reasonDescription, referenceNumber, items } = values;
    return reason.length > 0 && reasonDescription.length > 0 && referenceNumber.length > 0 && items.length > 0;
  };

  const handleItemChange = i => event => {
    const { name, value } = event.target
    const items = [...values.items]
    items[i][name] = value
    setValues({ ...values, items });
  }

  const handleSelectItemChange = i => (event, object) => {
    const items = [...values.items]
    const { id: itemId, description: itemDescription, quantity: adjustedQuantity } = object
    items[i] = Object.assign({}, { itemId, itemDescription, adjustedQuantity })
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

  const handleDateChange = name => date => {
    setValues({ ...values, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss') });
  }

  const handleSubmit = () => {
    dialog.type === 'new' ? createNewInventoryAdjustment(values) : ""
  }

  console.log(items, "items")
  console.log(values, "values")

  return (
    <div className={classes.root}>
      <Card elevation={0} className={classes.card}>
        <CardHeader title={dialog.type === 'new' ? 'New Inventory Adjustment Order' : 'Update Inventory Adjustment'} />

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
                    <TableCell>Inventory Adjusted Date</TableCell>
                    <TableCell>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disablePast
                          autoOk
                          variant="inline"
                          size="small"
                          inputVariant="outlined"
                          style={{ width: 300 }}
                          label="Inventory Adjusted Date"
                          format="dd/MM/yyyy"
                          value={values.inventoryAdjustedDate}
                          InputAdornmentProps={{ position: 'end' }}
                          onChange={handleDateChange('inventoryAdjustedDate')}
                        />
                      </MuiPickersUtilsProvider>
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
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>
                      <TextField
                        id="outlined-reason"
                        size="small"
                        name="reasonDescription"
                        label="Description"
                        value={values.reasonDescription}
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
                              options={items}
                              getOptionLabel={option => option.itemName}
                              onChange={handleSelectItemChange(i)}
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
                              id={`adjusted-quantity-${i}`}
                              size="small"
                              variant="outlined"
                              label="Adjusted Quantity"
                              name="adjustedQuantity"
                              onChange={handleItemChange(i)}
                              value={row.adjustedQuantity ? row.adjustedQuantity : ""}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              disabled
                              id={`item-description-${i}`}
                              size="small"
                              label="Description"
                              variant="outlined"
                              name="itemDescription"
                              onChange={handleItemChange(i)}
                              value={row.itemDescription ? row.itemDescription : ""}
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
            disabled={!canBeSubmitted()}
          >
            Save
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

InventoryAdjustmentDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
  getAllWarehouses: PropTypes.array,
  items: PropTypes.array,
  createNewInventoryAdjustment: PropTypes.func,
  closeNewInventoryAdjustDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectInventoryAdjustDialog(),
  getAllWarehouses: Selectors.makeSelectGetAllWarehouses(),
  items: Selectors.makeSelectGetAllItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    createNewInventoryAdjustment: data => dispatch(Actions.createNewInventoryAdjustment(data)),
    closeNewInventoryAdjustDialog: () => dispatch(Actions.closeNewInventoryAdjustDialog()),
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
