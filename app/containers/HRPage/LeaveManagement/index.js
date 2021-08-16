import React, { useEffect, memo } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Actions from './actions';
import makeSelectLeaveMgtPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ModuleLayout from './components/ModuleLayout';

const key = 'leaveMgt';

export function LeaveManagementPage(props) {
  const {
    getAttendance,
    getEmployees,
    getDepartments,
    getBranches,
    getRoles,
    getLeaveTypes,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    getAttendance();
    getEmployees();
    getDepartments();
    getBranches();
    getRoles();
    getLeaveTypes();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Human Resource — Leave Management</title>
        <meta name="description" content="ezone application leave management" />
      </Helmet>

      <ModuleLayout />
    </React.Fragment>
  );
}

LeaveManagementPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  leaveMgt: makeSelectLeaveMgtPage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getAttendance: () => dispatch(Actions.getLeaveRequest()),
    getLeaveTypes: () => dispatch(Actions.getLeaveTypes()),
    getEmployees: () => dispatch(Actions.getEmployees()),
    getDepartments: () => dispatch(Actions.getDepartments()),
    getBranches: () => dispatch(Actions.getBranches()),
    getRoles: () => dispatch(Actions.getRoles()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LeaveManagementPage);
