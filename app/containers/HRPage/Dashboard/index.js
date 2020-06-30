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
import makeSelectHRPage from './../selectors';
import reducer from './../reducer';
import saga from './../saga';
import Dashboard from './Dashboard'
import ModuleLayout from './components/ModuleLayout'
import AgeProfileReport from './AgeProfileReport/AgeProfileReport'
import GenderProfileReport from './GenderProfileReport/GenderProfileReport'

const key = 'hrPage';
export function DashboardPage({ match }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { params } = match

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
  hrPage: makeSelectHRPage(),
});

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
