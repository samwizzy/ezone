/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  makeStyles,
  AppBar,
  Typography,
  Tabs,
  Tab,
  Box,
  Slide,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
  Paper,
} from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import SignaturePad from './SignaturePad';
import SignatureUpload from './SignatureUpload';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SignatureDialog = props => {
  const {
    loading,
    signatureDialog,
    closeSignatureDialog,
    closeEditEmployeeDialogAction,
    createNewEmployee,
  } = props;

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(signatureDialog, 'come to dialog')
  return (
    <div>
      <Dialog
        {...signatureDialog.props}
        onClose={closeSignatureDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {signatureDialog.type === 'new' ? 'New Signature' : 'Edit Signature'}
        </DialogTitle>


          {signatureDialog.type === 'new' ? (
            <div>
              <Paper square>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Draw" {...a11yProps(0)} />
                  <Tab label="Upload" {...a11yProps(1)} />
                </Tabs>
              </Paper>
              
              { value === 0 &&
                <SignaturePad signatureDialog={signatureDialog} />
              }
              { value === 1 &&
                <SignatureUpload />
              }
            </div>
          ) : null}
      </Dialog>
    </div>
  );
};

SignatureDialog.propTypes = {
  loading: PropTypes.bool,
  signatureDialog: PropTypes.object,
  createNewEmployee: PropTypes.func,
  closeSignatureDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  signatureDialog: Selectors.makeSelectSignatureDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    createNewEmployee: evt => dispatch(Actions.createNewEmployee(evt)),
    closeSignatureDialog: () => dispatch(Actions.closeSignatureDialog()),
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
)(SignatureDialog);
