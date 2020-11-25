import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  CircularProgress,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormLabel,
  Grid,
  Slide,
  TextField,
  Typography,
} from '@material-ui/core';
import * as AppSelectors from '../../../App/selectors';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import { CircleLoader } from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  more: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  id: '',
  employee: null,
  grossSalary: '',
  NHIS: null,
  NHISAmount: '',
  pension: null,
  pensionAmount: '',
  loan: null,
  loanAmount: '',
  tax: null,
  taxAmount: '',
  bonus: null,
  bonusAmount: '',
  overtime: '',
  overtimeAmount: '',
};

const PayrunDialog = props => {
  const classes = useStyles();

  const {
    loading,
    dialog,
    closePayrunAccountDialog,
    createPayrun,
    updatePayrun,
  } = props;

  const [values, setValues] = useState({ ...initialState });

  const canSubmitValues = () => {
    const { employee, grossSalary, pension, loan, tax, bonus, amount, overtime } = values;
    return (employee && grossSalary && pension && loan && tax && loan && bonus && amount && overtime);
  };

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      const { id, payrunCode, payrunName, payrunNumber, bankBalance, bankName, description } = dialog.data;
      setValues({
        ...values,
        id,
        payrunCode,
        payrunName,
        payrunNumber,
        bankBalance,
        bankName,
        description,
      });
    }
  }, [dialog]);

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSelectChange = name => (event, obj) => {
    setValues({ ...values, [name]: obj });
  };

  const handleSubmit = () => {
    dialog.type === 'new' ? createPayrun(values) : updatePayrun(values);
  };

  console.log('values is: ', values);
  console.log('dialog: ', dialog);

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closePayrunAccountDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="payrun-employee-dialog-form"
      >
        <DialogTitle id="payrun-employee-dialog-title">
          {dialog.type === 'new' ? 'Add Employee to Pay run' : 'Edit Employee to Pay run'}
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Autocomplete
                id="employee"
                options={[]}
                getOptionLabel={option => option}
                onChange={handleSelectChange('employee')}
                value={values.employee}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select employee"
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    placeholder="Employee"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-gross-salary"
                label="Gross Salary"
                name="grossSalary"
                variant="outlined"
                size="small"
                value={values.grossSalary}
                onChange={handleChange}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.more}>
                <Button color="primary" size="small" variant="contained" disableElevation>Add More</Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Benefits</FormLabel>
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="pension"
                options={[]}
                getOptionLabel={option => option}
                onChange={handleSelectChange('pension')}
                value={values.pension}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Pension"
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    placeholder="Pension"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-amount"
                label="Amount ( NGN )"
                name="pensionAmount"
                variant="outlined"
                size="small"
                value={values.pensionAmount}
                onChange={handleChange}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="NHIS"
                options={[]}
                getOptionLabel={option => option}
                onChange={handleSelectChange('NHIS')}
                value={values.NHIS}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select NHIS"
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    placeholder="NHIS"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-amount"
                label="Amount ( NGN )"
                name="NHISAmount"
                variant="outlined"
                size="small"
                value={values.NHISAmount}
                onChange={handleChange}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.more}>
                <Button color="primary" size="small" variant="contained" disableElevation>Add More</Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Deductions</FormLabel>
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="loan"
                options={[]}
                getOptionLabel={option => option}
                onChange={handleSelectChange('loan')}
                value={values.loan}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select loan"
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    placeholder="Loan"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="loan-amount"
                label="Amount ( NGN )"
                name="loanAmount"
                variant="outlined"
                size="small"
                value={values.loanAmount}
                onChange={handleChange}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="tax"
                options={[]}
                getOptionLabel={option => option}
                onChange={handleSelectChange('tax')}
                value={values.tax}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select Tax"
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    placeholder="Tax"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="tax-amount"
                label="Amount ( NGN )"
                name="taxAmount"
                variant="outlined"
                size="small"
                value={values.taxAmount}
                onChange={handleChange}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.more}>
                <Button color="primary" size="small" variant="contained" disableElevation>Add More</Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Earnings</FormLabel>
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="bonus"
                options={[]}
                getOptionLabel={option => option}
                onChange={handleSelectChange('bonus')}
                value={values.bonus}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select Bonus"
                    variant="outlined"
                    margin="dense"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    placeholder="Bonus"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="bonus-amount"
                label="Amount ( NGN )"
                name="bonusAmount"
                variant="outlined"
                size="small"
                value={values.bonusAmount}
                onChange={handleChange}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-overtime"
                label="Overtime"
                name="overtime"
                variant="outlined"
                size="small"
                value={values.overtime}
                onChange={handleChange}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="overtime-amount"
                label="Amount ( NGN )"
                name="overtimeAmount"
                variant="outlined"
                size="small"
                value={values.overtimeAmount}
                onChange={handleChange}
                margin="dense"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disableElevation
            disabled={loading || !canSubmitValues()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {dialog.type === 'new' ? 'Save' : 'Update'}
          </Button>

          <Button
            onClick={closePayrunAccountDialog}
            color="inherit"
            variant="contained"
            disableElevation
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

PayrunDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectPayrunDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closePayrunAccountDialog: () => dispatch(Actions.closeNewPayrunDialog()),
    createPayrun: data => dispatch(Actions.createPayrun(data)),
    updatePayrun: data => dispatch(Actions.updatePayrun(data)),
    deletePayrun: data => dispatch(Actions.deletePayrun(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PayrunDialog);
