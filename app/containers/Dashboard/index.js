/**
 *
 * Home
 *
 */

import React, { memo } from 'react';
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
import qs from 'qs'

export function DashboardApp(props) {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });

  const { } = props;

  // React.useEffect(() => {
  //   const accessToken = '3476a10b-2094-4c98-989c-8ba4d601d9e3';
  //   const response = fetch('https://dev.ezoneapps.com/gateway/authserv/api/v1/users/get_by_orgid?orgId=ORG-1591706080165', {
  //     // const response = fetch('https://dev.ezoneapps.com/gateway/authserv/api/v1/users/profile', {
  //     // const response = fetch('https://dev.ezoneapps.com/gateway/crmserv/api/v1/get_all_contact_groups', {
  //     method: 'GET',
  //     headers: new Headers({
  //       Authorization: `Bearer ${accessToken}`,
  //       'Content-Type': 'application/json',
  //     }),
  //   })
  //     .then(response => console.log(response.json()))
  //   // .then(data => console.log(data))
  // }, []);

  // React.useEffect(() => {
  //   const newData = { username: 'firstmarine@ezone.com', password: 'Password@123', grant_type: 'password' };

  //   const decode = decodeURIComponent(qs.stringify(newData));
  //   const response = fetch('https://dev.ezoneapps.com/gateway/authserv/oauth/token', {
  //     method: 'POST',
  //     body: decode,
  //     headers: new Headers({
  //       Authorization: `Basic ${btoa('web-client:password')}`,
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  // }, []);

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

DashboardApp.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboardPage(),
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
  withConnect,
  memo,
)(DashboardApp);
