/**
 *
 * Crm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCrm from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import messages from '../messages';
import Dashboard from './Dashboard'

export function InventoryDashboard() {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });

  return (
    <div>
      <Helmet>
        <title>Inventory - Dashboard</title>
        <meta name="description" content="Description of Crm" />
      </Helmet>

      <Dashboard />
    </div>
  );
}

InventoryDashboard.propTypes = {};

const mapStateToProps = createStructuredSelector({
  crm: makeSelectCrm(),
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
)(InventoryDashboard);
