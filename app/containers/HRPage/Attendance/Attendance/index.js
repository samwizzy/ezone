/*
 * HRPage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as AppSelectors from '../../../App/selectors';
import * as AppActions from '../../../App/actions';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import AttendanceList from './AttendanceList'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export function AttendancePage(props) {
  const { getAttendances } = props;

  React.useEffect(() => {
    getAttendances();  
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Attendance Page</title>
        <meta name="description" content="ezone application attendance page" />
      </Helmet>

      <AttendanceList />

    </React.Fragment>
  );
}

AttendancePage.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  token: AppSelectors.makeSelectAccessToken(),
});

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
  withConnect,
  memo,
)(AttendancePage);
