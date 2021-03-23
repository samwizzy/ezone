import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouteMatch, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as Selectors from '../selectors';
import * as AccSelectors from '../../selectors';
import CurrenciesList from './CurrenciesList';
import CurrencyDialog from './components/CurrencyDialog';

export function CurrenciesSettings({ history, accSetupData }) {
  const { path } = useRouteMatch();

  if (!accSetupData) {
    // history.push('/account/settings');
  }

  return (
    <div>
      <Helmet>
        <title>Currencies Settings</title>
        <meta name="description" content="Description of Currencies Settings" />
      </Helmet>

      <CurrenciesList />

      <CurrencyDialog />
    </div>
  );
}

CurrenciesSettings.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  accSetupData: AccSelectors.makeSelectGetAccountingSetupData(),
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
)(CurrenciesSettings);
