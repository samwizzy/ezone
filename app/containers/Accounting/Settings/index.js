/**
 *
 * Settings
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
import makeSelectSettings from './selectors';
import * as Actions from './actions';
import * as Selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ModuleLayout from '../components/ModuleLayout';
import LoadingIndicator from './../../../components/LoadingIndicator';
import SettingsLayout from './components/SettingsLayout';
import AccountingPeriod from './components/AccountingPeriod';

export function Settings(props) {
  useInjectReducer({ key: 'settings', reducer });
  useInjectSaga({ key: 'settings', saga });

  console.log('Settings index.js loaded');

  const { loading, getAccountingSetupAction } = props;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // getAccountingSetupAction()
  }, []);


  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Description of Settings." />
      </Helmet>
      <ModuleLayout>
        <SettingsLayout>
          <AccountingPeriod />
        </SettingsLayout>
      </ModuleLayout>
    </div>
  );
}

Settings.propTypes = {

};

const mapStateToProps = createStructuredSelector({
  settings: makeSelectSettings()
});

function mapDispatchToProps(dispatch) {
  return {
    getAccountingSetupAction: () => dispatch(Actions.getAccountingSetupAction()),
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
)(Settings);
