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
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDeleteAnnouncementDialog = props => {
  const classes = useStyles();

  const {
    loading,
    dialog,
    closeConfirmAnnouncementDialog,
    deleteAnnouncement,
  } = props;

  const { data } = dialog

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeConfirmAnnouncementDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">Confirm Delete</DialogTitle>

        <DialogContent dividers>
          <DialogContentText variant="h6">
            Are you sure you want to delete this <strong><code>{data && data.title}</code></strong> announcement?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => deleteAnnouncement(dialog.data)}
            color="primary"
            variant="contained"
            disableElevation
            disabled={loading}
            endIcon={loading && <CircularProgress size={20} />}
          >
            Delete
          </Button>
          <Button
            onClick={closeConfirmAnnouncementDialog}
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

ConfirmDeleteAnnouncementDialog.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectConfirmAnnouncementDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    deleteAnnouncement: data => dispatch(Actions.deleteAnnouncement(data)),
    closeConfirmAnnouncementDialog: () => dispatch(Actions.closeConfirmAnnouncementDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ConfirmDeleteAnnouncementDialog);
