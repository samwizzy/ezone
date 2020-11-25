import React, { memo, useEffect, useState } from 'react';
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  id: '',
  accountCode: '',
  accountName: '',
  accountNumber: '',
  bankBalance: '',
  bankName: '',
  description: '',
};

const SalaryAdvanceDialog = props => {
  const classes = useStyles();

  const {
    loading,
    dialog,
    closeNewSalaryAdvanceDialog,
    createSalaryAdvance,
    updateSalaryAdvance,
  } = props;

  const [values, setValues] = React.useState({ ...initialState });

  const canSubmitValues = () => {
    const {
      accountCode,
      accountName,
      accountNumber,
      bankBalance,
      bankName,
      description,
    } = values;
    return (
      accountCode.length > 0 &&
      accountName.length > 0 &&
      accountNumber &&
      bankBalance &&
      bankName.length > 0 &&
      description.length > 0
    );
  };

  useEffect(() => {
    if (dialog.type === 'edit') {
      const { id, accountCode, accountName, accountNumber, bankBalance, bankName, description } = dialog.data;
      setValues({
        ...values,
        id,
        accountCode,
        accountName,
        accountNumber,
        bankBalance,
        bankName,
        description,
      });
    }
  }, [dialog.data]);

  const handleChange = event => {
    event.target.name === 'bankBalance' || event.target.name === 'accountNumber'
      ? setValues({
        ...values,
        [event.target.name]: event.target.value.replace(/[^0-9]/g, ''),
      })
      : setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    dialog.type === 'new' ? createSalaryAdvance(values) : updateSalaryAdvance(values);
  };

  console.log('values is: ', values);
  console.log('dialog: ', dialog);

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewSalaryAdvanceDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="salary-advance-dialog-form"
      >
        <DialogTitle id="bank-account-dialog-title">
          {dialog.type === 'new' ? 'Add Salary Advance' : 'Edit Salary Advance'}
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                id="standard-account-name"
                label="Employee"
                name="accountName"
                type="name"
                variant="outlined"
                size="small"
                value={values.accountName}
                onChange={handleChange}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-bank-name"
                label="Amount"
                name="bankName"
                variant="outlined"
                size="small"
                value={values.bankName}
                onChange={handleChange}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-description"
                label="Description"
                name="description"
                variant="outlined"
                size="small"
                value={values.description}
                onChange={handleChange}
                margin="dense"
                fullWidth
                rows={3}
                rowsMax={4}
                multiline
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
            onClick={closeNewSalaryAdvanceDialog}
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

SalaryAdvanceDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectSalaryAdvanceDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewSalaryAdvanceDialog: () => dispatch(Actions.closeNewSalaryAdvanceDialog()),
    createSalaryAdvance: data => dispatch(Actions.createSalaryAdvance(data)),
    updateSalaryAdvance: data => dispatch(Actions.updateSalaryAdvance(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SalaryAdvanceDialog);
