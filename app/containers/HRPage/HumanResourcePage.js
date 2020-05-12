/*
 * HumanResourcePage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom'
import DashboardApp from './Dashboard'
import EmployeesApp from './Employees'
import RolesApp from './Roles'
import DepartmentsApp from './Departments'
import BranchesApp from './Branches'
import RecruitmentApp from './Recruitment'
import PayrollApp from './Payroll'
import AnnouncementApp from './Announcement'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
}));

const HumanResourcePage = props => {
    const { match } = props
    const { params } = match

    console.log(params, "params tired")

    switch(params.section){
        case 'dashboard':
            return <DashboardApp />
            break;
        case 'employees':
            return <EmployeesApp />
            break;
        case 'departments':
            return <DepartmentsApp />
            break;
        case 'roles':
            return <RolesApp /> 
            break;
        case 'branches':
            return <BranchesApp /> 
            break;
        case 'recruitment':
            return <RecruitmentApp /> 
            break;
        case 'payroll':
            return <PayrollApp /> 
            break;
        case 'announcement':
            return <AnnouncementApp /> 
            break;
        default:
            return <EmployeesApp />
    }
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

export default withRouter(
compose(
  withConnect,
  memo,
)(HumanResourcePage));
