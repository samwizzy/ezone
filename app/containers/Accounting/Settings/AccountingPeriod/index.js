import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as Selectors from '../selectors';
import AccountingPeriods from './AccountingPeriods';
import AccountingPeriodDialog from './components/AccountingPeriodDialog';

export function AccountingPeriodSettings(props) {
  const { path } = useRouteMatch();

  return (
    <div>
      <Helmet>
        <title>Accounting Period</title>
        <meta
          name="description"
          content="Description of Accounting Period Settings"
        />
      </Helmet>

      <AccountingPeriods />

      <AccountingPeriodDialog />
    </div>
  );
}

AccountingPeriodSettings.propTypes = {};

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
)(AccountingPeriodSettings);
