import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Dialog, DialogContent, IconButton, Toolbar, Typography, Slide } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
    backgroundColor: theme.palette.common.white
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FilePreviewDialog(props) {
  const classes = useStyles();
  const { dialog, closeFilePreviewDialog } = props

  return (
    <div>
      <Dialog fullScreen open={dialog.open} onClose={closeFilePreviewDialog} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="primary" onClick={closeFilePreviewDialog} aria-label="close">
              <CloseIcon className={classes.icon} />
            </IconButton>
            {dialog.data.docName &&
              <Typography variant="h6" className={classes.title}>
                {dialog.data.docName}
              </Typography>
            }
          </Toolbar>
        </AppBar>

        <DialogContent>
          {dialog.data.fileUrl &&
            <img src={dialog.data.fileUrl} alt={dialog.data.docName} />
          }
        </DialogContent>
      </Dialog>
    </div>
  );
}


FilePreviewDialog.propTypes = {
  openFilePreviewDialog: PropTypes.func,
  closeFilePreviewDialog: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectFilePreviewDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    openFilePreviewDialog: ev => dispatch(Actions.openFilePreviewDialog(ev)),
    closeFilePreviewDialog: () => dispatch(Actions.closeFilePreviewDialog()),
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
)(FilePreviewDialog);
