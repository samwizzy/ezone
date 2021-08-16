import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as AppSelectors from '../../../App/selectors';
import * as AppActions from '../../../App/actions';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import LeaveRequestList from './LeaveRequestList';
import LeaveRequestDetails from './LeaveRequestDetails';

export function LeaveRequestPage(props) {
  const { getAttendance, match } = props;
  const { params } = match;

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Human Resource — Leave Request</title>
        <meta name="description" content="Ezone application - Leave request" />
      </Helmet>

      {params.leaveId ? <LeaveRequestDetails /> : <LeaveRequestList />}
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
