import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Grid, Paper, Typography, Toolbar } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import classNames from 'classnames'
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../../App/selectors';
import RecognitionItem from './RecognitionItem'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(4, 6),
    margin: theme.spacing(1, 0)
  },
  toolbar: theme.mixins.toolbar,
}));

const RecognitionDetails = props => {
  const classes = useStyles();
  const { loading, openNewRecognitionDialog, recognition } = props;

  if (!recognition) {
    return ''
  }

  console.log(recognition, "recognition details")

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static" color="inherit" elevation={2}>
            <Toolbar variant="dense">
              <Typography variant="h6" className={classes.title}>
                Recognition
              </Typography>
              <Button variant="contained" color="primary" onClick={openNewRecognitionDialog}>Add Recognition</Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item md={12}>
          <RecognitionItem recognition={recognition} />
        </Grid>
      </Grid>
    </div>
  );
};

RecognitionDetails.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  recognition: Selectors.makeSelectRecognition()
});

function mapDispatchToProps(dispatch) {
  return {
    openNewRecognitionDialog: () => dispatch(Actions.openNewRecognitionDialog())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(RecognitionDetails);
