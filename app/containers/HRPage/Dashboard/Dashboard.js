import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles, Grid } from '@material-ui/core';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../App/selectors';
import { Widget1, Widget2, Widget3, Widget4, Widget5, Widget6, Widget7, Widget8, Widget9, Widget10, Widget11, Widget12, Widget13 } from './widgets'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}))

export function DashBoard(props) {
  const classes = useStyles()
  const { employees, attendances, announcements, jobOpenings } = props

  console.log(attendances, "attendances")
  console.log(announcements, "announcements from dashboard")

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container className={classes.grid} spacing={3}>
            <Grid item xs={3}>
              <Widget1 />
            </Grid>
            <Grid item xs={3}>
              <Widget2 />
            </Grid>
            <Grid item xs={3}>
              <Widget3 />
            </Grid>
            <Grid item xs={3}>
              <Widget4 />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.grid} spacing={3}>
            <Grid item xs={4}>
              <Widget5 employees={employees} />
            </Grid>
            <Grid item xs={4}>
              <Widget6 />
            </Grid>
            <Grid item xs={4}>
              <Widget7 />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.grid} spacing={3}>
            <Grid item xs={6}>
              <Widget11 />
            </Grid>
            <Grid item xs={6}>
              <Widget12 employees={employees} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.grid} spacing={3}>
            <Grid item xs={6}>
              <Widget8 attendances={attendances} />
            </Grid>
            <Grid item xs={6}>
              <Widget10 />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.grid} spacing={3}>
            <Grid item xs={12}>
              <Widget13 />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

DashBoard.propTypes = {};

const mapStateToProps = createStructuredSelector({
  employees: Selectors.makeSelectEmployees(),
  attendances: Selectors.makeSelectAttendances(),
  announcements: Selectors.makeSelectAnnouncements(),
  jobOpenings: Selectors.makeSelectJobOpenings(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DashBoard);
