/**
 *
 * Crm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles, Grid } from '@material-ui/core';
import * as Selectors from '../selectors';
import { Widget1, Widget2, Widget3, Widget4, Widget5 } from './widgets'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}))

export function DashBoard() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container className={classes.grid} spacing={3}>
            <Grid item xs={4}>
              <Widget1 />
            </Grid>
            <Grid item xs={4}>
              <Widget2 />
            </Grid>
            <Grid item xs={4}>
              <Widget3 />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.grid} spacing={3}>
            <Grid item xs={7}>
              <Widget4 />
            </Grid>
            <Grid item xs={5}>
              <Widget5 />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

DashBoard.propTypes = {
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DashBoard);
