import React, { memo } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Snackbars = props => {
  const { messageDialog, openSnackAction, closeSnackAction } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // console.log(messageDialog, 'messageDialog 2');
  return (
    <div className={classes.root}>
      {/* <Button variant="outlined" onClick={openSnackAction}>
        Open success snackbar
      </Button> */}
      {messageDialog && (
        <Snackbar
          open={messageDialog.data.open}
          autoHideDuration={6000}
          onClose={closeSnackAction}
        >
          <Alert
            onClose={closeSnackAction}
            severity={messageDialog.data.status}
          >
            {messageDialog.data.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

Snackbars.propTypes = {
  // getPartyGroup: PropTypes.func,
  messageDialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  messageDialog: Selectors.makeSelectSnackBar(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeSnackAction: () =>
      dispatch(
        Actions.closeSnackBar({
          open: false,
        }),
      ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Snackbars);
