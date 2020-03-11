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
} from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import Signature from './Signature';

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
    width: 200,
  },
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
    closeSignatureDialogAction,
    closeEditEmployeeDialogAction,
    dispatchCreateNewEmployeeAction,
  } = props;

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Dialog
        {...signatureDialog.props}
        onClose={closeSignatureDialogAction}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {signatureDialog.type === 'new' ? 'New Signature' : 'Edit Signature'}
        </DialogTitle>

        <Divider />

        <DialogContent>
          {signatureDialog.type === 'new' ? (
            <div>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Draw" {...a11yProps(0)} />
                  <Tab label="Upload" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <Signature />
              </TabPanel>
              <TabPanel value={value} index={1}>
                {/* <UploadSignature /> */}
              </TabPanel>
            </div>
          ) : null}
        </DialogContent>

        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => {
                // dispatchCreateNewEmployeeAction(values);
              }}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
          )}
          <Button
            onClick={() => closeSignatureDialogAction()}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SignatureDialog.propTypes = {
  loading: PropTypes.bool,
  signatureDialog: PropTypes.object,
  dispatchCreateNewEmployeeAction: PropTypes.func,
  closeSignatureDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  signatureDialog: Selectors.makeSelectSignatureDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCreateNewEmployeeAction: evt =>
      dispatch(Actions.createNewEmployee(evt)),
      closeSignatureDialogAction: () =>
      dispatch(Actions.closeSignatureDialog()),
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
