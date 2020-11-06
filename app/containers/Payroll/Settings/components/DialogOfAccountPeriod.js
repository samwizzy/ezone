import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import {
  makeStyles,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormHelperText,
  Slide,
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

const useStyles = makeStyles(theme => ({
  root: {},
  formControl: {
    marginTop: theme.spacing(2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  activeYear: false,
  endDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
  journals: [],
  startDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
  status: false,
  year: moment().format('YYYY'),
};

const DialogOfAccountPeriod = props => {
  const classes = useStyles();
  const [form, setForm] = React.useState({ ...initialState });

  const {
    loading,
    currentUser,
    accountPeriodDialog,
    accountingPeriods,
    closeAccountPeriodDialog,
    createAccountPeriod,
    setAccountPeriodAsActive,
    updateAccountPeriod,
  } = props;

  useEffect(() => {
    if (accountPeriodDialog.type === 'edit') {
      setForm({ ...initialState });
    } else {
      setForm({ ...initialState });
    }
  }, []);

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    });
  };

  const handleDateChange = name => date => {
    name === 'year'
      ? setForm({ ...form, [name]: moment(date).format('YYYY') })
      : setForm({
        ...form,
        [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss'),
      });
  };

  const handleSubmit = () => {
    accountPeriodDialog.type === 'new'
      ? createAccountPeriod(form)
      : updateAccountPeriod(form);
  };

  console.log(form, 'form');

  return (
    <div>
      <Dialog
        {...accountPeriodDialog.props}
        onClose={closeAccountPeriodDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {accountPeriodDialog.type === 'new' && 'Add Accounting Period'}
          {accountPeriodDialog.type === 'edit' &&
            'Mark Accounting Period As Active'}
          {accountPeriodDialog.type === 'close' && 'Close Accounting Period'}
        </DialogTitle>

        <DialogContent dividers>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              disableToolbar
              id="start-year"
              inputVariant="outlined"
              format="yyyy"
              fullWidth
              margin="normal"
              views={['year']}
              label="Year"
              value={form.year}
              onChange={handleDateChange('year')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              id="start-date"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              fullWidth
              margin="normal"
              label="Start Date"
              value={form.startDate}
              onChange={handleDateChange('startDate')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              id="end-date"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              fullWidth
              margin="normal"
              label="End Date"
              value={form.endDate}
              onChange={handleDateChange('endDate')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>

          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Preferences</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.activeYear}
                    onChange={handleChange}
                    name="activeYear"
                  />
                }
                label="Active year"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.status}
                    onChange={handleChange}
                    name="status"
                  />
                }
                label="Keep this period open"
              />
            </FormGroup>
            <FormHelperText>Be careful</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            {accountPeriodDialog.type === 'edit' ? 'Update' : 'Save'}
          </Button>

          <Button variant="contained" onClick={closeAccountPeriodDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DialogOfAccountPeriod.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
  accountPeriodDialog: Selectors.makeSelectAccountPeriodDialog(),
  accountingPeriods: Selectors.makeSelectGetAccountingPeriods(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeAccountPeriodDialog: () =>
      dispatch(Actions.closeAccountPeriodDialog()),
    createAccountPeriod: data => dispatch(Actions.createAccountPeriod(data)),
    setAccountPeriodAsActive: data =>
      dispatch(Actions.setAccountPeriodAsActive(data)),
    updateAccountPeriod: data => dispatch(Actions.updateAccountPeriod(data)),
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
