import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, Grid, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    height: '80%',
    // height: '100vh',
  },
  button: {
    borderRadius: '20px',
    margin: theme.spacing(5, 0),
    padding: theme.spacing(1, 15),
  },
}));

const NoSignature = props => {
  const classes = useStyles();

  const { dispatchOpenSignatureDialogAction, currentUser } = props;

  console.log(currentUser, 'currentUser');
  return (
    <React.Fragment>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>
          <Box>
            <Typography variant="h6">
              You have not uploaded a signature
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => dispatchOpenSignatureDialogAction(currentUser)}
              className={classes.button}
              disableElevation
            >
              Upload a signature
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

NoSignature.propTypes = {
  currentUser: PropTypes.object,
  dispatchOpenSignatureDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatchOpenSignatureDialogAction: evt => dispatch(Actions.openSignatureDialog(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NoSignature);
