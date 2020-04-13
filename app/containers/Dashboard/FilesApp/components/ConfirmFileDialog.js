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
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0)
    },
  },
  icon: {
    width: '70px', 
    height: '70px', 
  }
}));



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SharedFileDialog(props) {
  const classes = useStyles()
  const { closeSharedFileDialog, data } = props
  const [form, setForm] = React.useState({email: '', comment: ''})

  const handleChange = () => {}

  console.log(data, 'checking shared...')

  return (
    <div>
      <Dialog
        {...data.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeSharedFileDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title"><img src={QuestionMark} className={classes.icon} /></DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to move "Document Name" to Trash?
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={closeSharedFileDialog} color="primary">
            Cancel
          </Button>
          <Button variant="outlined" onClick={closeSharedFileDialog} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


SharedFileDialog.propTypes = {
  openSharedFileDialog: PropTypes.func,
  closeSharedFileDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: Selectors.makeSelectSharedFileDialog()
});

function mapDispatchToProps(dispatch) {
  return {
    openSharedFileDialog: ev => dispatch(Actions.openSharedFileDialog(ev)),
    closeSharedFileDialog: () => dispatch(Actions.closeSharedFileDialog()),
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
)(SharedFileDialog);