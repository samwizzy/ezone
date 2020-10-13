import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as Selectors from './../selectors';
import Dashboard from './Dashboard'
import ModuleLayout from './components/ModuleLayout'
import AgeProfileReport from './AgeProfileReport/AgeProfileReport'
import GenderProfileReport from './GenderProfileReport/GenderProfileReport'

export function DashboardPage({ match }) {
  const { path } = match

  return (
    <div>
      <Helmet>
        <title>HR - Dashboard</title>
        <meta name="description" content="Description of HR Dashboard" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={Dashboard} />
        <Route path={`${path}/age-report`} component={AgeProfileReport} />
        <Route path={`${path}/gender-report`} component={GenderProfileReport} />
      </ModuleLayout>
    </div>
  );
}

DashboardPage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
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
)(DashboardPage);
