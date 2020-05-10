import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DropZone from './DropZone';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FileUploadDialog(props) {
  const { closeFileUploadDialog, data } = props

  console.log(data, 'checking...')

  return (
    <div>
      <Dialog
        {...data.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeFileUploadDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" style={{display: 'flex'}}>
            <DropZone />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFileUploadDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={closeFileUploadDialog} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


FileUploadDialog.propTypes = {
  openFileUploadDialog: PropTypes.func,
  closeFileUploadDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: Selectors.makeSelectFileUploadDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    openFileUploadDialog: ev => dispatch(Actions.openFileUploadDialog(ev)),
    closeFileUploadDialog: () => dispatch(Actions.closeFileUploadDialog()),
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
)(FileUploadDialog);