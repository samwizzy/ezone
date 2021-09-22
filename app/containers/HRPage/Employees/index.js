import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import ModuleLayout from './ModuleLayout';
import EmployeeList from './EmployeeList';
import EmployeeDetails from './employee';
import AddEmployeeDialog from './components/AddEmployeeDialog';
import UpdateEmployeeDialog from './EmployeeDialog';
import WorkExperienceDialog from './components/WorkExperienceDialog';
import EducationBackgroundDialog from './components/EducationBackgroundDialog';

export function EmployeePage(props) {
  const { match } = props;
  const { path } = match;

  return (
    <React.Fragment>
      <Helmet>
        <title>Human Resource — Employee</title>
        <meta name="description" content="ezone application employee" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={EmployeeList} />
        <Route path={`${path}/:empId`} component={EmployeeDetails} />
      </ModuleLayout>

      <AddEmployeeDialog />
      <UpdateEmployeeDialog />
      <WorkExperienceDialog />
      <EducationBackgroundDialog />
    </React.Fragment>
  );
}

EmployeePage.propTypes = {};

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
)(EmployeePage);
