/**
 *
 * Banking
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
import makeSelectBanking from './selectors';
import * as Actions from './actions';
import * as Selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ModuleLayout from '../components/ModuleLayout';
import LoadingIndicator from './../../../components/LoadingIndicator';
import SettingsLayout from './components/SettingsLayout';

export function Settings(props) {
  useInjectReducer({ key: 'banking', reducer });
  useInjectSaga({ key: 'banking', saga });

  console.log('Banking index.js loaded');

  const { loading } = props;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
  }, []);


  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Description of Settings" />
      </Helmet>
      <ModuleLayout>
        <SettingsLayout />
      </ModuleLayout>
    </div>
  );
}

Settings.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
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
)(Settings);
