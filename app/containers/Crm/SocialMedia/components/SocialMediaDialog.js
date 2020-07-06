/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  makeStyles,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  Slide,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'static',
  },
  title: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const SocialMediaDialog = props => {
  const classes = useStyles();
  const [form, setForm] = React.useState({});

  const {
    loading,
    dialog,
    closeNewSocialMediaDialog
  } = props;

  React.useEffect(() => {

  }, [dialog.data]);

  console.log(dialog, 'campaignDialog');
  const canSubmitForm = () => {
    return true
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => { }

  console.log(form, 'form');

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        {...dialog.props}
        onClose={closeNewSocialMediaDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent dividers></DialogContent>
        <DialogActions>
          <Button onClick={closeNewSocialMediaDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmitForm()}
            color="primary"
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SocialMediaDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
  closeNewSocialMediaDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectSocialMediaDialog(),
  employees: Selectors.makeSelectEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    createSocialMedia: evt => dispatch(Actions.createSocialMedia(evt)),
    updateSocialMedia: evt => dispatch(Actions.updateSocialMedia(evt)),
    closeNewSocialMediaDialog: () => dispatch(Actions.closeNewSocialMediaDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SocialMediaDialog);
