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
  Typography
} from '@material-ui/core';

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

const ConfirmDeleteAccountDialog = props => {
  const classes = useStyles();

  const {
    loading,
    confirmAccountDeleteDialog,
    closeDeleteAccountDialogAction,
    deleteChartOfAccountAction
  } = props;


  return (
    <div>
      <Dialog
        {...confirmAccountDeleteDialog.props}
        onClose={closeDeleteAccountDialogAction}
        keepMounted
        TransitionComponent={Transition}
        maxWidth={'xs'}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Confirm Action.
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => {
                deleteChartOfAccountAction(confirmAccountDeleteDialog.data);
              }}
              color="primary"
            >
              Delete
            </Button>
          )}
          <Button
            onClick={ closeDeleteAccountDialogAction }
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

ConfirmDeleteAccountDialog.propTypes = {
//   loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  confirmAccountDeleteDialog: Selectors.makeSelectConfirmAccountDeleteDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    deleteChartOfAccountAction: evt => dispatch(Actions.deleteChartOfAccountAction(evt)),
    closeDeleteAccountDialogAction: () => dispatch(Actions.closeDeleteAccountDialog()),
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
)(ConfirmDeleteAccountDialog);