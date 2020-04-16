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
import { Widget1, Widget2, Widget3, Widget4 } from './widgets'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    }
}))

export function DashBoard() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Helmet>
                <title>CRM - Dashboard</title>
                <meta name="description" content="Description of Crm" />
            </Helmet>
            
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
                            <Widget2 />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container className={classes.grid} spacing={3}>
                        <Grid item xs={7}>
                            <Widget3 />
                        </Grid>
                        <Grid item xs={5}>
                            <Widget4 />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

DashBoard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
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
)(DashBoard);
