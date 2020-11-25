import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouteMatch, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as Selectors from '../selectors';
import * as AccSelectors from '../../selectors';
import AccountingPeriods from './AccountingPeriods';
import AccountingPeriodDialog from './components/AccountingPeriodDialog';

export function AccountingPeriodSettings({ history, accSetupData }) {
  const { path } = useRouteMatch();

  if(!accSetupData){
    history.push('/account/settings');
  }

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
)(AccountingPeriodSettings);
