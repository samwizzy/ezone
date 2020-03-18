/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Divider,
  Slide,
  Grid 
} from '@material-ui/core';

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
    width: 100,
  },
}));

// if (values.amount && values.amountForOneUnit) {
//   setValues({...values, [totalAmount]: values.amount * values.amountForOneUnit});
// }

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const AddItemDialog = props => {
  const {
    loading,
    addItemDialog,
    openAddItemDialogAction,
    closeAddItemDialogAction,
    saveAddItemContentsAction
  } = props;


  const classes = useStyles();
  
  const [values, setValues] = React.useState({
    date: "",
    name: "",
    amount: "",
    amountForOneUnit: "",
    totalAmount: "",
    description: "",
    orgId: "",
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setValues({ ...values, date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`});
  };


  return (
    <div>
      <Dialog
        {...addItemDialog.props}
        onClose={closeAddItemDialogAction}
        keepMounted
        TransitionComponent={Transition}
        maxWidth={"xs"}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {addItemDialog.type === 'new' ? 'Item' : 'Edit Item'}
        </DialogTitle>

        <Divider />

        <DialogContent>
          {addItemDialog.type === 'new' ? (
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <TextField
                id="standard-name"
                label="Item"
                type="name"
                variant="outlined"
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-amount"
                label="Amount"
                type="number"
                variant="outlined"
                className={classes.textField}
                value={values.amount}
                onChange={handleChange('amount')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-amountForOneUnit"
                label="Amount per unit"
                type="number"
                variant="outlined"
                className={classes.textField}
                value={values.amountForOneUnit}
                onChange={handleChange('amountForOneUnit')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-totalAmount "
                label="Total Amount"
                readOnly
                type="number"
                variant="outlined"
                className={classes.textField}
                value={values.totalAmount }
                onChange={handleChange('totalAmount ')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-description"
                label="Item Description"
                variant="outlined"
                className={classes.textField}
                value={values.description}
                onChange={handleChange('description')}
                margin="normal"
                fullWidth
                rows={2}
                multiline
              />
            </div>
          ) : null }
        </DialogContent>

        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => { saveAddItemContentsAction(values), closeAddItemDialogAction(), setValues('') }}
              color="primary"
              variant="contained"
              // disabled={!canBeSubmitted()}
            >
              Save Item
            </Button>
          )}
          <Button
            onClick={() => { closeAddItemDialogAction(), setValues('') }}
            color="primary"
            variant="contained"
          >
            Cancel item
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddItemDialog.propTypes = {
  loading: PropTypes.bool,
  AddItemDialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(), 
  addItemDialog: Selectors.makeSelectItemDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeAddItemDialogAction: () => dispatch(Actions.closeAddItemDialog()),
    openAddItemDialogAction: () => dispatch(Actions.openAddItemDialog()),
    saveAddItemContentsAction: evt => dispatch(Actions.saveAddItemContents(evt)),
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
)(AddItemDialog);
