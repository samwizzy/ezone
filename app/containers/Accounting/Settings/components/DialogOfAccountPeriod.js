import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  TextField,
  Typography,
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

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import * as AppSelectors from '../../../App/selectors';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';

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
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogOfAccountPeriod = props => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const {
    loading,
    currentUser,
    accountPeriodDialog, 
    allAccountingPeriodData,
    closeAccountPeriodDialogAction,
    dispatchCreateAccountPeriodAction,
    dispatchSetAccountPeriodAsActiveAction,
    dispatchUpdateAccountPeriodAction
  } = props;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [values, setValues] = React.useState({
    orgId: currentUser.organisation.orgId,
    year: Number(allAccountingPeriodData[allAccountingPeriodData.length - 1])
  });
  
  console.log(' values is : ', values);
  console.log('allAccountingPeriodData-> ', allAccountingPeriodData);
  console.log('selected data-> ', accountPeriodDialog.data);


  return (
    <div>
      <Dialog
        {...accountPeriodDialog.props}
        onClose={closeAccountPeriodDialogAction}
        keepMounted
        TransitionComponent={Transition}
        maxWidth={'xs'}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {accountPeriodDialog.type === 'new' ? 'Add Accounting Period' : accountPeriodDialog.type === 'new' ? 'Mark Accounting Period As Active' : accountPeriodDialog.type === 'close' ? "Close Accounting Period" : ""}
        </DialogTitle>
        <Divider />
        <DialogContent>
          {accountPeriodDialog.type === 'new' ? (
            <form className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    id="standard-amount"
                    type="number"
                    variant="outlined"
                    size="small"
                    // InputProps={{
                    //   readOnly: true,
                    // }}
                    className={classes.textField}
                    value={Number(allAccountingPeriodData[allAccountingPeriodData.length - 1])}
                    onChange={handleChange('amount')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          ) : accountPeriodDialog.type === 'edit' ? (
            <form className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    id="standard-amount"
                    label={accountPeriodDialog.data.year}
                    type="number"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      readOnly: true,
                    }}
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          ) : accountPeriodDialog.type === 'close' ? (
            <Typography>Are you sure you want to close this account period?</Typography>
          ) : null}
        </DialogContent>
        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => {
                accountPeriodDialog.type === 'new' ? dispatchCreateAccountPeriodAction(values) : accountPeriodDialog.type === 'edit' ? dispatchSetAccountPeriodAsActiveAction(accountPeriodDialog.data) : accountPeriodDialog.type === 'close' ? dispatchUpdateAccountPeriodAction(accountPeriodDialog.data) : "" ;
              }}
              color="primary"
            >
              {accountPeriodDialog.type === 'close' ? 'Close' : 'Save'}
            </Button>
          )}
          <Button
            onClick={ closeAccountPeriodDialogAction }
            color="inherit"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogOfAccountPeriod.propTypes = {
//   loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
  accountPeriodDialog: Selectors.makeSelectAccountPeriodDialog(),
  allAccountingPeriodData: Selectors.makeSelectGetAllAccountingPeriodData(),
});



function mapDispatchToProps(dispatch) {
  return {
    closeAccountPeriodDialogAction: () => dispatch(Actions.closeAccountPeriodDialog()),
    dispatchCreateAccountPeriodAction: evt => dispatch(Actions.createAccountPeriodAction(evt)),
    dispatchSetAccountPeriodAsActiveAction: evt => dispatch(Actions.setAccountPeriodAsActiveAction(evt)),
    dispatchUpdateAccountPeriodAction: evt => dispatch(Actions.updateAccountPeriodAction(evt)),
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
)(DialogOfAccountPeriod);