/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import * as AppSelectors from '../../App/selectors';

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
import LoadingIndicator from '../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(1.5, 0),
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  table: {
    minWidth: 650,
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
    console.log('selected value: ', value);
    setValues({ ...values, vendor: value });
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
    setValues({ ...values, expectedCompletionDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`});
  };

  const handleDateChangePaymentDate = date => {
    setValues({ ...values, paymentDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`});
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
            <div>
              <Autocomplete
                id="combo-box-demo"
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
              <TextField
                id="standard-amountBal"
                label="Amount Balance"
                variant="outlined"
                className={classes.textField}
                value={values.amountBal}
                onChange={handleChange('amountBal')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-amountPaid"
                label="Amount Paid"
                variant="outlined"
                className={classes.textField}
                value={values.amountPaid}
                onChange={handleChange('amountPaid')}
                margin="normal"
                fullWidth
              />
              <FormControl component="fieldset">
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
              </FormControl>
              <TextField
                id="standard-cost"
                label="Cost"
                variant="outlined"
                className={classes.textField}
                value={values.cost}
                onChange={handleChange('cost')}
                margin="normal"
                fullWidth
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
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
                    id="date-picker-dialog"
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

              <ItemTable savedItemStore={savedItemStore} />

              <Button
                variant="outlined"
                color="primary"
                onClick={() => openAddItemDialogAction()}
              >
                Add Item
              </Button>
              <TextField
                id="standard-phone-number"
                label="Phone Number"
                type="number"
                variant="outlined"
                className={classes.textField}
                value={values.number}
                onChange={handleChange('number')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-employeeID"
                label="Employee ID"
                variant="outlined"
                className={classes.textField}
                value={values.employeeId}
                onChange={handleChange('employeeId')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-status"
                label="Status"
                variant="outlined"
                className={classes.textField}
                margin="normal"
                value={values.status ? values.status : ''}
                onChange={handleChange('status')}
                select
                fullWidth
              >
                {status.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-priority"
                label="Urgency Level"
                variant="outlined"
                className={classes.textField}
                margin="normal"
                value={values.priority ? values.priority : ''}
                onChange={handleChange('priority')}
                select
                fullWidth
              >
                {priority.map(option => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          ) : (
            <div>
              <Autocomplete
                id="combo-box-demo"
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
              <TextField
                id="standard-amountBal"
                label="Amount Balance"
                variant="outlined"
                className={classes.textField}
                value={values.amountBal}
                onChange={handleChange('amountBal')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-amountPaid"
                label="Amount Paid"
                variant="outlined"
                className={classes.textField}
                value={values.amountPaid}
                onChange={handleChange('amountPaid')}
                margin="normal"
                fullWidth
              />
              <FormControl component="fieldset">
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
              </FormControl>
              <TextField
                id="standard-cost"
                label="Cost"
                variant="outlined"
                className={classes.textField}
                value={values.cost}
                onChange={handleChange('cost')}
                margin="normal"
                fullWidth
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
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
                    id="date-picker-dialog"
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

              <ItemTable savedItemStore={savedItemStore} />

              <Button
                variant="outlined"
                color="primary"
                onClick={() => openAddItemDialogAction()}
              >
                Add Item
              </Button>
              <TextField
                id="standard-phone-number"
                label="Phone Number"
                type="number"
                variant="outlined"
                className={classes.textField}
                value={values.number}
                onChange={handleChange('number')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-employeeID"
                label="Employee ID"
                variant="outlined"
                className={classes.textField}
                value={values.employeeId}
                onChange={handleChange('employeeId')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-status"
                label="Status"
                variant="outlined"
                className={classes.textField}
                margin="normal"
                value={values.status ? values.status : ''}
                onChange={handleChange('status')}
                select
                fullWidth
              >
                {status.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-priority"
                label="Urgency Level"
                variant="outlined"
                className={classes.textField}
                margin="normal"
                value={values.priority ? values.priority : ''}
                onChange={handleChange('priority')}
                select
                fullWidth
              >
                {priority.map(option => (
                  <MenuItem key={option.label} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          )}
        </DialogContent>

        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => {
                // openCreateWorkOrderDialogAction(values),
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
            variant="contained"
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
