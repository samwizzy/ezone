import React, { Fragment, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as Actions from './actions';
import makeSelectHRPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import DashboardApp from './Dashboard';
import EmployeesApp from './Employees';
import PositionsApp from './Positions';
import DepartmentsApp from './Departments';
import BranchesApp from './Branches';
import RecruitmentApp from './Recruitment';
import AnnouncementApp from './Announcement';

const key = 'hrPage';
export function HumanResourceApp(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const {
    match,
    getEmployees,
    getDepartmentsByOrgIdApi,
    getEnrollmentTypes,
    getLocations,
    getAnnouncements,
    getJobOpenings,
    getApplicants,
    getAttendances,
    getEmployeeTypes,
    getSourceOfHire,
    getPayRates,
    getPayTypes,
    getRoles,
    getPositions,
    getBranches,
    getPartyGroups,
  } = props;

  const { path } = match;

  useEffect(() => {
    getEmployees();
    getDepartmentsByOrgIdApi();
    getEmployeeTypes();
    getSourceOfHire();
    getPayRates();
    getPayTypes();
    getRoles();
    getPositions();
    getBranches();
    getEnrollmentTypes();
    getLocations();
    getJobOpenings();
    getApplicants();
    getAttendances();
    getPartyGroups();
    getAnnouncements();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Human Resource Page</title>
        <meta name="description" content="ezone application human resource" />
      </Helmet>

      <Fragment>
        <Route exact path={path} component={DashboardApp} />
        <Route path={`${path}/dashboard`} component={DashboardApp} />
        <Route path={`${path}/employees`} component={EmployeesApp} />
        <Route path={`${path}/departments`} component={DepartmentsApp} />
        <Route path={`${path}/positions`} component={PositionsApp} />
        <Route path={`${path}/branches`} component={BranchesApp} />
        <Route path={`${path}/recruitment`} component={RecruitmentApp} />
        <Route path={`${path}/announcement`} component={AnnouncementApp} />
      </Fragment>
    </div>
  );
}

HumanResourceApp.propTypes = {};

const mapStateToProps = createStructuredSelector({
  hrPage: makeSelectHRPage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getEmployees: () => dispatch(Actions.getEmployees()),
    getDepartmentsByOrgIdApi: () =>
      dispatch(Actions.getDepartmentsByOrgIdApi()),
    getEmployeeTypes: () => dispatch(Actions.getEmployeeTypes()),
    getSourceOfHire: () => dispatch(Actions.getSourceOfHire()),
    getPayRates: () => dispatch(Actions.getPayRates()),
    getPayTypes: () => dispatch(Actions.getPayTypes()),
    getRoles: () => dispatch(Actions.getRoles()),
    getPositions: () => dispatch(Actions.getPositions()),
    getBranches: () => dispatch(Actions.getBranches()),
    getEnrollmentTypes: () => dispatch(Actions.getEnrollmentTypes()),
    getLocations: () => dispatch(Actions.getLocations()),
    getJobOpenings: () => dispatch(Actions.getJobOpenings()),
    getApplicants: () => dispatch(Actions.getApplicants()),
    getAttendances: () => dispatch(Actions.getAttendances()),
    getPartyGroups: () => dispatch(Actions.getPartyGroups()),
    getAnnouncements: () => dispatch(Actions.getAnnouncements()),
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
)(HumanResourceApp);
