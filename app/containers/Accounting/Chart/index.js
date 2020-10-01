import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Route, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import saga from './saga';
import reducer from './reducer';
import * as Actions from './actions';
import makeSelectAccountChart, * as Selectors from './selectors';
import ModuleLayout from '../components/ModuleLayout';
import AccountsList from './components/AccountsList';
import ChartAccountDetails from './chartAccountDetails';
import AccountDialog from './components/AccountDialog';
import ConfirmDeleteAccountDialog from './components/ConfirmDeleteAccountDialog';
import { CircleLoader } from '../../../components/LoadingIndicator';

const key = 'chart';
const ChartOfAccounts = props => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { loading, getChartOfAccounts, getAccountTypes, match } = props;
  const { path } = match;

  useEffect(() => {
    getChartOfAccounts();
    getAccountTypes();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Chart of Accounts</title>
        <meta name="description" content="Description of Accounts" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={AccountsList} />
        <Route path={`${path}/:accountId`} component={ChartAccountDetails} />
      </ModuleLayout>

      <AccountDialog />
      <ConfirmDeleteAccountDialog />
    </div>
  );
};

ChartOfAccounts.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  chart: makeSelectAccountChart(),
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getChartOfAccounts: () => dispatch(Actions.getChartOfAccounts()),
    getAccountTypes: () => dispatch(Actions.getAccountTypes()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(ChartOfAccounts);
