/*
 * HRPage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as AppSelectors from '../../../App/selectors';
import * as AppActions from '../../../App/actions';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import LeaveRequestList from './LeaveRequestList'
import LeaveRequestDetails from './LeaveRequestDetails'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export function LeaveRequestPage(props) {
  const { getAttendance, match } = props;
  const { params } = match

  React.useEffect(() => {
    getAttendance();  
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Leave Request Page</title>
        <meta name="description" content="ezone application attendance page" />
      </Helmet>

      { params.leaveId?
        <LeaveRequestDetails /> : <LeaveRequestList />
      }

    </React.Fragment>
  );
}

LeaveRequestPage.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  token: AppSelectors.makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getAttendance: () => dispatch(Actions.getLeaveRequest()),
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
)(LeaveRequestPage);