import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  CircularProgress,
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
  const {
    loading,
    currentUser,
    accountPeriodDialog, 
    allAccountingPeriodData,
    closeAccountPeriodDialogAction,
    dispatchCreateAccountPeriodAction,
    dispatchSetAccountPeriodAsActiveAction
  } = props;

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const selectedYear = allAccountingPeriodData && allAccountingPeriodData[allAccountingPeriodData.length - 1];
  console.log(selectedYear, "selectedYear")

  const [values, setValues] = React.useState({
    orgId: currentUser.organisation.orgId,
    // year: selectedYear.year && Number(selectedYear.year) + 1
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  console.log(' values is : ', values);
  console.log('dialogfile data-> ', allAccountingPeriodData);
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
          {accountPeriodDialog.type === 'new' ? 'Add Accounting Period' : 'Mark Accounting Period As Active'}
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
                    value={values.year}
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
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              accountPeriodDialog.type === 'new' ? dispatchCreateAccountPeriodAction(values) : dispatchSetAccountPeriodAsActiveAction(accountPeriodDialog.data);
            }}
            color="primary"
            // variant="contained"
            // disabled={!canSubmitValues()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            Save
          </Button>
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