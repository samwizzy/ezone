import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as Selectors from '../selectors';
import { CircleLoader } from '../../../../components/LoadingIndicator';
import CurrenciesList from './CurrenciesList';
import CurrencyDialog from './components/CurrencyDialog';

export function CurrenciesSettings(props) {
  const { path } = useRouteMatch();

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
)(CurrenciesSettings);
