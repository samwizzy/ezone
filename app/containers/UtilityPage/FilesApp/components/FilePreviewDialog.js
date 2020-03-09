import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import * as Actions from '../../actions'
import * as Selectors from '../../selectors';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
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
  const { filePreviewDialog, closeFilePreviewDialog } = props

  return (
    <div>
      <Dialog fullScreen open={filePreviewDialog.open} onClose={closeFilePreviewDialog} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={closeFilePreviewDialog} aria-label="close">
              <CloseIcon />
            </IconButton>
            {filePreviewDialog.data &&
              <Typography variant="h6" className={classes.title}>
                {filePreviewDialog.data.docName}
              </Typography>
            }
          </Toolbar>
        </AppBar>
        
        {filePreviewDialog.data &&
          <div>
            <img src={filePreviewDialog.data.fileUrl} alt={filePreviewDialog.data.docName} />
          </div>
        }
      </Dialog>
    </div>
  );
}


FilePreviewDialog.propTypes = {
  openFilePreviewDialog: PropTypes.func,
  closeFilePreviewDialog: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  filePreviewDialog: Selectors.makeSelectFilePreviewDialog(),
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