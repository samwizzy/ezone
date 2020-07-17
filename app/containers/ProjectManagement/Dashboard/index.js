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
import makeSelectProjectMgt from '../selectors';
import reducer from '../reducer';
import saga from '../saga';
import messages from '../messages';
import Dashboard from './Dashboard'
import ModuleLayout from './../components/ModuleLayout'

const key = 'projectMgt'

export function ProjectMgtDashboard() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <div>
      <Helmet>
        <title>Project Manager - Dashboard</title>
        <meta name="description" content="Description of Project Manager Dashboard" />
      </Helmet>

      <ModuleLayout>
        <Dashboard />
      </ModuleLayout>
    </div>
  );
}

ProjectMgtDashboard.propTypes = {};

const mapStateToProps = createStructuredSelector({
  projectMgt: makeSelectProjectMgt(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProjectMgtDashboard);
