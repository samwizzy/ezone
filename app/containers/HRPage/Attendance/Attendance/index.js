import React, { Fragment, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import AttendanceList from './AttendanceList'
import AttendanceDetails from './attendanceDetails'

export function AttendancePage(props) {
  const { getAttendances, match } = props;
  const { path } = match

  console.log(path, "path attendance")

  useEffect(() => {
    getAttendances();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Attendance Page</title>
        <meta name="description" content="ezone application attendance page" />
      </Helmet>

      <Fragment>
        <Route exact path={path} component={AttendanceList} />
        <Route path={`${path}/:attendanceId`} component={AttendanceDetails} />
      </Fragment>

    </div>
  );
}

AttendancePage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    getAttendances: () => dispatch(Actions.getAttendances()),
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
)(AttendancePage);
