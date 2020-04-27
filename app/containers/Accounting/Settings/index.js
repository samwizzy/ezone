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
import * as Actions from './actions';
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

  const { 
    loading,
    dispatchGetAccountingSetupAction,
    dispatchGetAllAccountingPeriodAction 
  } = props;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatchGetAccountingSetupAction();
    dispatchGetAllAccountingPeriodAction();
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
  // loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetAccountingSetupAction: () => dispatch(Actions.getAccountingSetupAction()),
    dispatchGetAllAccountingPeriodAction: () => dispatch(Actions.getAllAccountingPeriodAction()),
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