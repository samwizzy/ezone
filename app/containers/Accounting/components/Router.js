import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import LoadingIndicator from '../../../components/LoadingIndicator';
import Dashboard from '../Dashboard';
import AccountSetting from '../components/AccountSetting';


const Router = props => {

useEffect(() => {
    getAccountingSetupAction();
}, []);

  const {
    loading,
    accountingSetupData,
    getAccountingSetupAction
  } = props;

  console.log('accountingSetupData Router -> ', accountingSetupData);


  if (loading) {
    return <LoadingIndicator />;
  }
  else if (accountingSetupData.id==undefined) {
    return <Dashboard />
  }
  else {
    return <AccountSetting />
  }
};

Router.propTypes = {
//   loading: PropTypes.bool,
//   openNewAccountDialogAction: PropTypes.func,
//   editOpenAccountDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  accountingSetupData: Selectors.makeSelectGetAccountingSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatchGetAllChartOfAccountTypeAction: () => dispatch(Actions.getAllChartOfAccountTypeAction()),
    // openNewAccountDialogAction: () => dispatch(Actions.openNewAccountDialog()),
    // editOpenAccountDialogAction: evt => dispatch(Actions.editOpenAccountDialog(evt)),
    // deleteChartOfAccountAction: evt => dispatch(Actions.deleteChartOfAccountAction(evt)),
    getAccountingSetupAction: () => dispatch(Actions.getAccountingSetupAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Router);
