import React, { Fragment, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from './../../actions';
import * as Selectors from './../../selectors';
import AttendanceDetails from './AttendanceDetails'

export function AttendanceDetailsPage(props) {
  const { loading, getAttendanceById, match } = props;
  const { params } = match

  useEffect(() => {
    getAttendanceById(params.attendanceId);
  }, []);

  return (
    <div>
      <Helmet>
        <title>Attendance Details Page</title>
        <meta name="description" content="ezone application attendance details page" />
      </Helmet>

      <Fragment>
        <AttendanceDetails />
      </Fragment>
    </div>
  );
}

AttendanceDetailsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading
});

export function mapDispatchToProps(dispatch) {
  return {
    getAttendanceById: (id) => dispatch(Actions.getAttendanceById(id)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(AttendanceDetailsPage);
