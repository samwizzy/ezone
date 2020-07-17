/**
 *
 * Crm
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCrmDashboard from './selectors';
import * as Actions from './actions';
import reducer from './reducer';
import saga from './saga';
import Dashboard from './Dashboard'
import ModuleLayout from './../components/ModuleLayout'

const key = "crmDashboard"
export function CrmDashboard(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { getContacts, getCompanies, getSchedules, getTasks } = props

  useEffect(() => {
    getContacts();
    getCompanies();
    getSchedules();
    getTasks();
  }, [])

  return (
    <div>
      <Helmet>
        <title>Crm - Dashboard</title>
        <meta name="description" content="Description of Crm Dashboard" />
      </Helmet>

      <ModuleLayout>
        <Dashboard />
      </ModuleLayout>
    </div>
  );
}

CrmDashboard.propTypes = {};

const mapStateToProps = createStructuredSelector({
  crmDashboard: makeSelectCrmDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    getContacts: () => dispatch(Actions.getContacts()),
    getCompanies: () => dispatch(Actions.getCompanies()),
    getSchedules: () => dispatch(Actions.getSchedules()),
    getTasks: () => dispatch(Actions.getTasks()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CrmDashboard);
