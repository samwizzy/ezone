import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

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
    dispatchCreateAccountPeriodAction
  } = props;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [values, setValues] = React.useState({
    orgId: currentUser.organisation.orgId,
    // year: Number(allAccountingPeriodData[allAccountingPeriodData.length - 1].year) + 1
  });
  
  console.log(' dialogfilevalues is : ', values);
  console.log('dialogfile data-> ', allAccountingPeriodData);

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
          {accountPeriodDialog.type === 'new' ? 'Add Accounting Period' : 'Edit Accounting Period'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          {accountPeriodDialog.type === 'new' ? (
            <form className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    id="standard-amount"
                    // label={Number(allAccountingPeriodData[allAccountingPeriodData.length - 1].year) + 1}
                    type="number"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    // value={allAccountingPeriodData[0].year}
                    // onChange={handleChange('amount')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          ) : (
            <form className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Start Date"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="End Date"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => {
                accountPeriodDialog.type === 'new' ? dispatchCreateAccountPeriodAction(values) : dispatchUpdateBankAccountAction(values);
              }}
              color="primary"
              // variant="contained"
              // disabled={!canSubmitValues()}
            >
              Save
            </Button>
          )}
          <Button
            onClick={ closeAccountPeriodDialogAction }
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