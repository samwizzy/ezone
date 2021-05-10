import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import makeSelectDashboardPage from './selectors';
import * as Actions from './actions';
import Dashboard from './Dashboard';
import ModuleLayout from './components/ModuleLayout';

export function DashboardApp(props) {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });

  const { getDashboardStats } = props;

  useEffect(() => {
    getDashboardStats()
  }, [])

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
      </Helmet>

      <ModuleLayout>
        <Dashboard />
      </ModuleLayout>
    </div>
  );
}

DashboardApp.propTypes = {};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboardPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDashboardStats: () => dispatch(Actions.getDashboardStats()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DashboardApp);
