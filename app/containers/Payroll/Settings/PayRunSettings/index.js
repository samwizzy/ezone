import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as Selectors from '../selectors';
import { CircleLoader } from '../../../../components/LoadingIndicator';
import PayrunSettings from './PayrunSettings';

export function PayRunSettingsPage(props) {
  const { path } = useRouteMatch();

  return (
    <div>
      <Helmet>
        <title>Payroll — Payrun Settings</title>
        <meta name="description" content="Description of Payrun Settings" />
      </Helmet>

      <PayrunSettings />
    </div>
  );
}

PayRunSettingsPage.propTypes = {};

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
)(PayRunSettingsPage);
