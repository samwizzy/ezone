import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  CircularProgress,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  Slide,
} from '@material-ui/core';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const useStyles = makeStyles(theme => ({
  root: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDeleteAccountDialog = props => {
  const classes = useStyles();

  const {
    loading,
    dialog,
    closeDeleteEmployeeSalaryDialog,
    deleteEmployeeSalary,
  } = props;

  const { data } = dialog

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeDeleteEmployeeSalaryDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">Confirm Delete</DialogTitle>

        <DialogContent dividers>
          <DialogContentText variant="h6">
            Are you sure you want to delete this <strong><code>{data && data.accountName}</code></strong> account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => deleteEmployeeSalary(dialog.data)}
            color="primary"
            variant="contained"
            disableElevation
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            Delete
          </Button>
          <Button
            onClick={closeDeleteEmployeeSalaryDialog}
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

ConfirmDeleteAccountDialog.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectConfirmEmployeeSalaryDeleteDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    deleteEmployeeSalary: data => dispatch(Actions.deleteEmployeeSalary(data)),
    closeDeleteEmployeeSalaryDialog: () => dispatch(Actions.closeDeleteEmployeeSalaryDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ConfirmDeleteAccountDialog);
