import React, { memo } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as Selectors from '../../../containers/App/selectors';
import * as Actions from '../../../containers/App/actions';

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
  const { messageDialog, openSnackBar, closeSnackBar } = props;
  const classes = useStyles();

  if(!messageDialog){
    return ''
  }

  console.log(messageDialog, 'messageDialog 2');
  return (
    <div className={classes.root}>
      {/* <Button variant="outlined" onClick={openSnackBar} style={{zIndex: 9999}}>
        Open success snackbar
      </Button> */}

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={messageDialog.open}
        autoHideDuration={6000}
        onClose={closeSnackBar}
      >
        <Alert
          onClose={closeSnackBar}
          severity={messageDialog.status}
        >
          {messageDialog.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

Snackbars.propTypes = {
  messageDialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  messageDialog: Selectors.makeSelectSnackBar(),
});

function mapDispatchToProps(dispatch) {
  return {
    openSnackBar: () => dispatch(Actions.openSnackBar({open: true})),
    closeSnackBar: () => dispatch(Actions.closeSnackBar()),
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
