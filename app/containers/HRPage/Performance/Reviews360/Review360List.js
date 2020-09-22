import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Avatar, Breadcrumbs, Box, Button, Divider, IconButton, Link, List, ListItem, ListItemText, ListItemAvatar, Table, TableRow, TableCell, TableBody, Grid, Paper, Typography, Toolbar, Stepper, Step, StepLabel } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import classNames from 'classnames'
import _ from 'lodash'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../../App/selectors';
import Feedback360Item from './reviews/Feedback360Item'
import DataMessage from '../../components/DataMessage'

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
  toolbar: theme.mixins.toolbar
}));

const Review360List = props => {
  const classes = useStyles();
  const { loading, openNewReviewDialog, recognitions } = props;

  console.log(recognitions, "recognitions")

  const orderedRecognitions = _.orderBy(recognitions, ['dateCreated'], ['desc'])

  if (!recognitions) {
    return ''
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static" color="inherit" elevation={1}>
            <Toolbar variant="dense">
              <Typography variant="h6" className={classes.title}>
                360<sup>o</sup> Reviews
              </Typography>
              <Button variant="contained" color="primary" onClick={openNewReviewDialog}>Create Cycle</Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item md={12}>
          {orderedRecognitions && orderedRecognitions.length ?
            <Fragment>
              {orderedRecognitions.map((recognition, i) =>
                <Feedback360Item key={i} recognition={recognition} />
              )}
            </Fragment>
            :
            <DataMessage message="No recognition has been recorded yet" />
          }
        </Grid>
      </Grid>
    </div>
  );
};

Review360List.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  recognitions: Selectors.makeSelectRecognitions(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewReviewDialog: () => dispatch(Actions.openNewReviewDialog())
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
)(Review360List);
