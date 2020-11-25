import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EzoneUtils from '../../../../utils/EzoneUtils';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  withStyles,
  CircularProgress,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormLabel,
  Slide,
  Grid
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import * as Selectors from '../selectors';
import * as AccSelectors from '../../selectors';
import _ from 'lodash';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const types = [
  { label: 'Credit', id: 'CREDIT' },
  { label: 'Debit', id: 'DEBIT' },
];

export const initialState = {
  terminationDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
  description: '',
};

const AccountDialog = props => {
  const classes = useStyles(props);

  const {
    loading,
    dialog,
    closeNewEmployeeSalaryDialog,
    payrollSetupData,
    employeeSalaries,
    createEmployeeSalary,
    updateEmployeeSalary,
  } = props;

  const [values, setValues] = useState({ ...initialState });

  const handleChange = event => {
    const { name, value, type, checked } = event.target
    setValues({ ...values, [name]: type === 'checkbox' ? checked : value })
  };

  const handleDateChange = name => (date, value) => {
    setForm({ ...values, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss') });
  }

  const handleSubmit = () => {
    dialog.type === 'new'
      ? createEmployeeSalary(values)
      : updateEmployeeSalary(values);
  };

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      setValues({ ...dialog.data });
    } else {
      setValues({ ...initialState });
    }
  }, [dialog.data]);

  const canSubmitValues = () => {
    const { terminationDate, description } = values;
    return (terminationDate && description);
  };

  console.log(`values  got it b4 post  -> `, values);
  console.log(`dialog -> `, dialog);

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewEmployeeSalaryDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-account-title">
          {dialog.type === 'new' ? 'Terminate Employee' : 'Edit Terminate Employee'}
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  margin="normal"
                  fullWidth
                  inputVariant="outlined"
                  id="date-termination-dialog"
                  label="Termination Date"
                  size="small"
                  format="dd/MM/yyyy"
                  name="terminationDate"
                  value={values.terminationDate}
                  onChange={handleDateChange('terminationDate')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="standard-description"
                label="Reason for Termination"
                name="description"
                variant="outlined"
                size="small"
                value={values.description}
                onChange={handleChange}
                margin="dense"
                fullWidth
                rows={2}
                rowsMax={3}
                multiline
              />
            </Grid>
            <Grid item><FormLabel>Do you want to continue?</FormLabel></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            disableElevation
            disabled={loading ? loading : !canSubmitValues()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {dialog.type === 'new' ? 'Ok' : 'Update'}
          </Button>

          <Button
            variant="contained"
            onClick={closeNewEmployeeSalaryDialog}
            color="inherit"
            disableElevation
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AccountDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectNewEmployeeSalaryDialog(),
  employeeSalaries: Selectors.makeSelectGetEmployeeSalariesData(),
  payrollSetupData: AccSelectors.makeSelectGetPayrollSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewEmployeeSalaryDialog: () => dispatch(Actions.closeNewEmployeeSalaryDialog()),
    createEmployeeSalary: data => dispatch(Actions.createEmployeeSalary(data)),
    updateEmployeeSalary: data => dispatch(Actions.updateEmployeeSalary(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AccountDialog);
