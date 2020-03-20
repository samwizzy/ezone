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
import * as AppSelectors from '../App/selectors';
import * as AppActions from '../App/actions';
import * as Actions from './actions';
import * as Selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import EmployeesApp from './Employees'
import RolesApp from './Roles'
import DepartmentsApp from './Departments'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
}));

const HumanResourcePage = props => {
    const { match } = props
    const { params } = match

    console.log(params, "params sectionId")

    switch(params.sectionId){
        case 'employees':
            return <EmployeesApp />
            break;
        case 'departments':
            return <DepartmentsApp />
            break;
        case 'roles':
            return <RolesApp /> 
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
