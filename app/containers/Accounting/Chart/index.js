import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Route, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from './actions';
import * as Selectors from './selectors';
import ModuleLayout from '../components/ModuleLayout';
import AccountChart from './components/AccountChart';
import DetailsOfAccountChart from './components/DetailsOfAccountChart';
import { CircleLoader } from '../../../components/LoadingIndicator';

const ChartOfAccounts = props => {
  useInjectReducer({ key: 'chart', reducer });
  useInjectSaga({ key: 'chart', saga });

  const { loading, getChartOfAccounts, getAccountTypes, match } = props;
  const { path } = match

  useEffect(() => {
    getChartOfAccounts();
    getAccountTypes();
  }, []);


  if (loading) {
    return <CircleLoader />;
  }

  return (
    <div>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Description of Settings" />
      </Helmet>

      <ModuleLayout>
        <Route path={path} component={AccountChart} />
        {/* <Route path={`${path}/:accountId`} component={DetailsOfAccountChart} /> */}
        {/* <AccountChart /> */}
      </ModuleLayout>
    </div>
  );
}

ChartOfAccounts.propTypes = {
  loading: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
})

function mapDispatchToProps(dispatch) {
  return {
    getChartOfAccounts: () => dispatch(Actions.getChartOfAccounts()),
    getAccountTypes: () => dispatch(Actions.getAccountTypes()),
  }
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
