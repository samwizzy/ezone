/**
 *
 * HR Dashboard
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as Selectors from '../selectors';
import Dashboard from './Dashboard'
import ModuleLayout from './components/ModuleLayout'
import AgeProfileReport from './AgeProfileReport/AgeProfileReport'
import GenderProfileReport from './GenderProfileReport/GenderProfileReport'

export function DashboardPage({ match }) {
  const { params } = match
  console.log(params, "params dashboard")

  return (
    <div>
      <Helmet>
        <title>HR - Dashboard</title>
        <meta name="description" content="Description of HR Dashboard" />
      </Helmet>

      <ModuleLayout>
        {params.status === 'age-report' ?
          <AgeProfileReport /> :
          params.status === 'gender-report' ?
            <GenderProfileReport /> :
            <Dashboard />
        }
      </ModuleLayout>
    </div>
  );
}

DashboardPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
)(DashboardPage);
