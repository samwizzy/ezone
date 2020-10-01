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
  DialogContentText,
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

const initialState = {};

const AddBankAccountDialog = props => {
  const classes = useStyles();

  const {
    loading,
    dialog,
    closeDeleteBankAccountDialog,
    deleteBankAccount,
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
    if (dialog.type === 'delete' && dialog.data) {
      setValues(dialog.data);
    }
  }, [dialog]);

  const handleSubmit = () => {
    dialog.type === 'delete' ? deleteBankAccount(values) : '';
  };

  console.log('values is: ', values);
  console.log('dialog: ', dialog);

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeDeleteBankAccountDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="bank-account-dialog-form"
      >
        <DialogTitle id="bank-account-dialog-title">
          {dialog.type === 'delete' ? 'Delete Bank Account' : ''}
        </DialogTitle>

        <DialogContent dividers>
          <DialogContentText id="alert-dialog-slide-description" variant="h6">
            Are you sure you want to delete this Bank Account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disableElevation
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {dialog.type === 'delete' ? 'Delete' : ''}
          </Button>

          <Button
            onClick={closeDeleteBankAccountDialog}
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

AddBankAccountDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectBankAccountConfirmDialog(),
  accountTypes: Selectors.makeSelectAccountTypes(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeDeleteBankAccountDialog: () =>
      dispatch(Actions.closeDeleteBankAccountDialog()),
    deleteBankAccount: data => dispatch(Actions.deleteBankAccount(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddBankAccountDialog);
