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
  root: {}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDeleteAccountDialog = props => {
  const classes = useStyles();

  const {
    loading,
    dialog,
    closeDeleteAccountDialog,
    deleteChartOfAccount
  } = props;

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeDeleteAccountDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth={'xs'}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Confirm Delete
        </DialogTitle>

        <DialogContent dividers>
          <DialogContentText variant="h6">
            Are you sure you want to delete this Chart of Account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => deleteChartOfAccount(dialog.data)}
            color="primary"
            variant="contained"
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            Delete
          </Button>
          <Button
            onClick={closeDeleteAccountDialog}
            color="inherit"
            variant="contained"
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
  dialog: Selectors.makeSelectConfirmAccountDeleteDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    deleteChartOfAccount: data => dispatch(Actions.deleteChartOfAccount(data)),
    closeDeleteAccountDialog: () => dispatch(Actions.closeDeleteAccountDialog()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ConfirmDeleteAccountDialog);