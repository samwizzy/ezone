import React, { Fragment, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, Route } from 'react-router-dom'
import DashboardApp from './Dashboard'
import EmployeesApp from './Employees'
import RolesApp from './Roles'
import DepartmentsApp from './Departments'
import BranchesApp from './Branches'
import RecruitmentApp from './Recruitment'
import AnnouncementApp from './Announcement'

const HumanResourcePage = props => {
  const { match } = props
  const { path } = match
  console.log(path, "path tired")

  return (
    <Fragment>
      <Route exact path={path} component={DashboardApp} />
      <Route path={`${path}/dashboard`} component={DashboardApp} />
      <Route path={`${path}/employees`} component={EmployeesApp} />
      <Route path={`${path}/departments`} component={DepartmentsApp} />
      <Route path={`${path}/roles`} component={RolesApp} />
      <Route path={`${path}/branches`} component={BranchesApp} />
      <Route path={`${path}/recruitment`} component={RecruitmentApp} />
      <Route path={`${path}/announcement`} component={AnnouncementApp} />
    </Fragment>
  )

  // switch (params.section) {
  //   case 'dashboard':
  //     return <DashboardApp />
  //     break;
  //   case 'employees':
  //     return <EmployeesApp />
  //     break;
  //   case 'departments':
  //     return <DepartmentsApp />
  //     break;
  //   case 'roles':
  //     return <RolesApp />
  //     break;
  //   case 'branches':
  //     return <BranchesApp />
  //     break;
  //   case 'recruitment':
  //     return <RecruitmentApp />
  //     break;
  //   case 'announcement':
  //     return <AnnouncementApp />
  //     break;
  //   default:
  //     return <DashboardApp />
  // }
}

HumanResourcePage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(HumanResourcePage);
