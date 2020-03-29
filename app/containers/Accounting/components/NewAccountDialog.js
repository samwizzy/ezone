/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';

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
  Grid,
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const NewAccountDialog = props => {
  const { 
    loading, 
    accountDialog, 
    closeNewAccountDialogAction,
    accountTypeData,
    detailTypeData,
    dispatchGetDetailTypeAction,
    createChartOfAccountAction 
  } = props;

  console.log('accountTypeData: ', accountTypeData);
  console.log('detailTypeData: ', detailTypeData);

  const classes = useStyles();

  const [values, setValues] = React.useState({
    accountName: "",
    accountNumber: "",
    accountType: "",
    description: "",
    ezoneBalance: "",
    orgId: "",
    period: "",
    ref: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  console.log('values: ', values);

  const handleSelectChange = (name, value) => {
    setValues({ ...values, accountType: value.type });

    // Call detail type api
    dispatchGetDetailTypeAction(value);
  };


  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    setValues({ ...values, period: `${date.getFullYear()}-${month}-${date.getDate()}`});
  };


  return (
    <div>
      <Dialog
        {...accountDialog.props}
        onClose={closeNewAccountDialogAction}
        keepMounted
        TransitionComponent={Transition}
        maxWidth={'xs'}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {accountDialog.type === 'new' ? 'New Account' : 'Edit Account'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          {accountDialog.type === 'new' ? (
            <div>
              <TextField
                id="standard-accountName"
                label="Account Name"
                type="name"
                variant="outlined"
                className={classes.textField}
                value={values.accountName}
                onChange={handleChange('accountName')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-accountNumber"
                label="Account Code"
                type="number"
                variant="outlined"
                className={classes.textField}
                value={values.accountNumber}
                onChange={handleChange('accountNumber')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-ezoneBalance"
                label="E-Zone Balance"
                type="number"
                variant="outlined"
                className={classes.textField}
                value={values.ezoneBalance}
                onChange={handleChange('ezoneBalance')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-ref"
                label="Reference Code"
                type="name"
                variant="outlined"
                className={classes.textField}
                value={values.ref}
                onChange={handleChange('ref')}
                margin="normal"
                fullWidth
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Select Period"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
              <Autocomplete
                id="combo-box-demo"
                options={accountTypeData}
                getOptionLabel={option => option.type}
                onChange={(evt, value) => handleSelectChange(evt, value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select Account Type"
                    className={classes.textField}
                    variant="outlined"
                    placeholder="Search"
                    fullWidth
                  />
                )}
              />
              <Autocomplete
                id="combo-box-demo"
                options={detailTypeData}
                getOptionLabel={option => option.name}
                // onChange={(evt, value) => handleSelectChange(evt, value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select Detail Type"
                    className={classes.textField}
                    variant="outlined"
                    placeholder="Search"
                    fullWidth
                  />
                )}
              />
              <TextField
                id="standard-description"
                label="Description"
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
          ) : null}
        </DialogContent>

        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => {
                createChartOfAccountAction(values);
              }}
              color="primary"
              // variant="contained"
              // disabled={!canBeSubmitted()}
            >
              Save Account
            </Button>
          )}
          <Button
            onClick={() => {
              closeNewAccountDialogAction();
            }}
            color="inherit"
            // variant="contained"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

NewAccountDialog.propTypes = {
  loading: PropTypes.bool,
  accountDialog: PropTypes.object,
  accountTypeData: PropTypes.array,
  // detailTypeData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  accountDialog: Selectors.makeSelectNewAccountDialog(),
  accountTypeData: Selectors.makeSelectAccountTypeData(),
  detailTypeData: Selectors.makeSelectDetailTypeData(),
  chartOfAccountPostData: Selectors.makeSelectChartOfAccountPostData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewAccountDialogAction: () => dispatch(Actions.openNewAccountDialog()),
    closeNewAccountDialogAction: () => dispatch(Actions.closeNewAccountDialog()),
    dispatchGetDetailTypeAction: evt => dispatch(Actions.getDetailTypeAction(evt)),
    createChartOfAccountAction: evt => dispatch(Actions.createNewChartOfAccountAction(evt)),
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
)(NewAccountDialog);
