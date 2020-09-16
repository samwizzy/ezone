/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import * as AppSelectors from '../../../App/selectors';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {
  withStyles,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  MenuItem,
  Grid,
  DialogTitle,
  Divider,
  Slide,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  FilterListIcon,
} from '@material-ui/core';
import ItemTable from './ItemTable';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0),
    },
  },
}));

const status = [
  {
    value: 'NOT_STARTED',
    label: 'NOT STARTED',
  },
  {
    value: 'STARTED',
    label: 'STARTED',
  },
  {
    value: 'COMPLETED',
    label: 'COMPLETED',
  },
  {
    value: 'CANCELED',
    label: 'CANCELED',
  },
];

const priority = [
  {
    value: 'Low',
    label: 'Low',
  },
  {
    value: 'Medium',
    label: 'Medium (Normal)',
  },
  {
    value: 'High',
    label: 'High',
  },
  {
    value: 'Critical',
    label: 'Critical',
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const WorkOrderDialog = props => {
  const {
    loading,
    workOrderDialog,
    addItemDialog,
    openAddItemDialogAction,
    closeWorkOrderDialogAction,
    listOfVendorsData,
    getListOfVendorsAction,
    savedItemData,
    savedItemStore,
    openCreateWorkOrderDialogAction,
    saveWorkOrderAction,
  } = props;

  const classes = useStyles();

  const [values, setValues] = React.useState({
    orgId: '',
    addedBy: '',
    amountBal: '',
    amountPaid: '',
    approved: false,
    cost: '',
    description: '',
    expectedCompletionDate: '',
    paymentDate: '',
    id: '',
    items: savedItemStore,
    memo: '',
    number: '',
    priority: '',
    status: '',
    updatedBy: '',
    vendor: ''
  });

  React.useEffect(() => {
    if (workOrderDialog.type === 'edit') {
      const {
        orgId,
        addedBy,
        amountBal,
        amountPaid,
        approved,
        cost,
        description,
        expectedCompletionDate,
        paymentDate,
        items,
        memo,
        number,
        priority,
        status,
        updatedBy,
        vendor
      } = workOrderDialog.data;

      setValues({
        ...values,
        orgId,
        addedBy,
        amountBal,
        amountPaid,
        approved,
        cost,
        description,
        expectedCompletionDate,
        paymentDate,
        id: workOrderDialog.data.id,
        items,
        memo,
        number,
        priority,
        status,
        updatedBy,
        vendor
      });
    }
  }, [workOrderDialog])


  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSelectChange = (name, value) => {
    setValues({ ...values, vendor: value });
  };

  const handleStatusSelectChange = (name, value) => {
    setValues({ ...values, status: value.value });
  };

  const handlePrioritySelectChange = (name, value) => {
    setValues({ ...values, priority: value.value });
  };

  // console.log('values from state: ', values);

  if (savedItemData) {
    savedItemStore.push(savedItemData);
  }

  console.log('VendorsData --> ', listOfVendorsData);
  console.log('savedItemData --> ', savedItemData);
  console.log('savedItemStore --> ', savedItemStore);
  console.log('postValues : ', values);
  // console.log('workOrderPostData : ', workOrderPostData);

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChangeExpectedCompletionDate = date => {
    setValues({ ...values, expectedCompletionDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` });
  };

  const handleDateChangePaymentDate = date => {
    setValues({ ...values, paymentDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` });
  };

  return (
    <div>
      <Dialog
        {...workOrderDialog.props}
        onClose={closeWorkOrderDialogAction}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {workOrderDialog.type === 'new' ? 'Create Work Order' : 'Edit Work Order'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          {workOrderDialog.type === 'new' ? (
            <Grid container spacing={3} className={classes.root}>
              <Grid item xs={6} md={6} lg={6}>
                <Autocomplete
                  id="combo-box-vendor"
                  size="small"
                  options={listOfVendorsData}
                  getOptionLabel={option => option.busName}
                  onChange={(evt, value) => handleSelectChange(evt, value)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Search Vendors"
                      variant="outlined"
                      placeholder="Vendors"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  id="standard-amountBal"
                  label="Amount Balance"
                  size="small"
                  variant="outlined"
                  className={classes.textField}
                  value={values.amountBal}
                  onChange={handleChange('amountBal')}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  id="standard-amountPaid"
                  label="Amount Paid"
                  size="small"
                  variant="outlined"
                  className={classes.textField}
                  value={values.amountPaid}
                  onChange={handleChange('amountPaid')}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              {/* <FormControl component="fieldset">
                <FormLabel component="legend">Approve Order.</FormLabel>
                <br />
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value={values.approved}
                    onChange={handleChange('approved')}
                    control={<Checkbox color="primary" />}
                    label="Yes"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="start"
                    control={<Checkbox color="primary" />}
                    label="No"
                    labelPlacement="top"
                  />
                </FormGroup>
              </FormControl> */}
              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  id="standard-cost"
                  label="Cost"
                  size="small"
                  variant="outlined"
                  className={classes.textField}
                  value={values.cost}
                  onChange={handleChange('cost')}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-expected-completion-date"
                      label="Expected Completion Date"
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      onChange={handleDateChangeExpectedCompletionDate}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-payment-date"
                      label="Payment Date"
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      onChange={handleDateChangePaymentDate}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <ItemTable savedItemStore={savedItemStore} />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => openAddItemDialogAction()}
                >
                  Add Item
                </Button>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  id="standard-phone-number"
                  label="Phone Number"
                  size="small"
                  type="number"
                  variant="outlined"
                  className={classes.textField}
                  value={values.number}
                  onChange={handleChange('number')}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <TextField
                  id="standard-employee-id"
                  label="Employee ID"
                  size="small"
                  variant="outlined"
                  className={classes.textField}
                  value={values.employeeId}
                  onChange={handleChange('employeeId')}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <Autocomplete
                  id="combo-box-status"
                  size="small"
                  options={status}
                  getOptionLabel={option => option.label}
                  onChange={(evt, value) => handleStatusSelectChange(evt, value)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Status"
                      variant="outlined"
                      placeholder="Status"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <Autocomplete
                  id="combo-box-level-urgency"
                  size="small"
                  options={priority}
                  getOptionLabel={option => option.label}
                  onChange={(evt, value) => handlePrioritySelectChange(evt, value)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Urgency Level"
                      variant="outlined"
                      placeholder="Urgency"
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>
          ) : (
              <Grid container spacing={3} className={classes.root}>
                <Grid item xs={6} md={6} lg={6}>
                  <Autocomplete
                    id="combo-box-vendors"
                    size="small"
                    options={listOfVendorsData}
                    getOptionLabel={option => option.busName}
                    onChange={(evt, value) => handleSelectChange(evt, value)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Search Vendors"
                        variant="outlined"
                        placeholder="Vendors"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <TextField
                    id="standard-amount-bal"
                    label="Amount Balance"
                    size="small"
                    variant="outlined"
                    className={classes.textField}
                    value={values.amountBal}
                    onChange={handleChange('amountBal')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <TextField
                    id="standard-amountPaid"
                    label="Amount Paid"
                    size="small"
                    variant="outlined"
                    className={classes.textField}
                    value={values.amountPaid}
                    onChange={handleChange('amountPaid')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                {/* <FormControl component="fieldset">
                <FormLabel component="legend">Approve Order.</FormLabel>
                <br />
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value={values.approved}
                    onChange={handleChange('approved')}
                    control={<Checkbox color="primary" />}
                    label="Yes"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="start"
                    control={<Checkbox color="primary" />}
                    label="No"
                    labelPlacement="top"
                  />
                </FormGroup>
              </FormControl> */}
                <Grid item xs={6} md={6} lg={6}>
                  <TextField
                    id="standard-cost"
                    label="Cost"
                    size="small"
                    variant="outlined"
                    className={classes.textField}
                    value={values.cost}
                    onChange={handleChange('cost')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-completion-date"
                        label="Expected Completion Date"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChangeExpectedCompletionDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-payment-date"
                        label="Payment Date"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChangePaymentDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <ItemTable savedItemStore={savedItemStore} />
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => openAddItemDialogAction()}
                  >
                    Add Item
                </Button>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <TextField
                    id="standard-phone-number"
                    label="Phone Number"
                    size="small"
                    type="number"
                    variant="outlined"
                    className={classes.textField}
                    value={values.number}
                    onChange={handleChange('number')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <TextField
                    id="standard-employeeID"
                    label="Employee ID"
                    size="small"
                    variant="outlined"
                    className={classes.textField}
                    value={values.employeeId}
                    onChange={handleChange('employeeId')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <Autocomplete
                    id="combo-box-statuses"
                    size="small"
                    options={status}
                    getOptionLabel={option => option.label}
                    onChange={(evt, value) => handleStatusSelectChange(evt, value)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Status"
                        variant="outlined"
                        placeholder="Status"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <Autocomplete
                    id="combo-box-urgency-level"
                    size="small"
                    options={priority}
                    getOptionLabel={option => option.label}
                    onChange={(evt, value) => handlePrioritySelectChange(evt, value)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Urgency Level"
                        variant="outlined"
                        placeholder="Urgency"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
              </Grid>
            )}
        </DialogContent>

        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
              <Button
                onClick={() => {
                  saveWorkOrderAction(values),
                    closeWorkOrderDialogAction()
                }}
                color="primary"
                variant="contained"
              // disabled={!canBeSubmitted()}
              >
                Save
              </Button>
            )}
          <Button
            onClick={() => closeWorkOrderDialogAction()}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

WorkOrderDialog.propTypes = {
  loading: PropTypes.bool,
  workOrderDialog: PropTypes.object,
  addItemDialog: PropTypes.object,
  savedItemStore: PropTypes.array,
  openCreateWorkOrderDialogAction: PropTypes.func,
  listOfVendorsData: PropTypes.array,
  saveWorkOrderAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  workOrderDialog: Selectors.makeSelectWorkOrderDialog(),
  addItemDialog: Selectors.makeSelectItemDialog(),
  listOfVendorsData: Selectors.makeSelectGetListOfVendorsData(),
  savedItemData: Selectors.makeSelectSavedItemData(),
  savedItemStore: Selectors.makeSelectSavedItemStore(),
  workOrderPostData: Selectors.makeSelectWorkOrderPostData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openCreateWorkOrderDialogAction: () =>
      dispatch(Actions.openCreateWorkOrderDialog()),
    closeWorkOrderDialogAction: () =>
      dispatch(Actions.closeCreateWorkOrderDialog()),
    openAddItemDialogAction: () => dispatch(Actions.openAddItemDialog()),
    closeAddItemDialogAction: () => dispatch(Actions.closeAddItemDialog()),
    getListOfVendorsAction: () => dispatch(Actions.getAllVendorsAction()),
    saveWorkOrderAction: evt => dispatch(Actions.saveWorkOrderAction(evt)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WorkOrderDialog);
