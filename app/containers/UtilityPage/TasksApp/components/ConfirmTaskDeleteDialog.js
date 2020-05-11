import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Slide, Typography, TextField } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import QuestionMark from '../../../../images/questionMarkIcon.svg'

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center'
  },
  icon: {
    width: '70px', 
    height: '70px', 
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ConfirmTaskDeleteDialog(props) {
  const classes = useStyles()
  const { closeConfirmTaskDeleteDialog, deleteTask, dialog } = props

  return (
    <div className={classes.root}>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmTaskDeleteDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{textAlign: 'center'}}>
          <img src={QuestionMark} className={classes.icon} />
        </DialogTitle>
       
        <DialogContent>
          <DialogContentText variant="h6" gutterBottom={false}>
            Delete "<code>{dialog.data && dialog.data.title}</code>" task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmTaskDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => deleteTask(dialog.data && dialog.data.id)} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


ConfirmTaskDeleteDialog.propTypes = {
  closeConfirmTaskDeleteDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectConfirmTaskDeleteDialog()
});

function mapDispatchToProps(dispatch) {
  return {
    closeConfirmTaskDeleteDialog: () => dispatch(Actions.closeConfirmTaskDeleteDialog()),
    deleteTask: id => dispatch(Actions.deleteTask(id)),
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
)(ConfirmTaskDeleteDialog);