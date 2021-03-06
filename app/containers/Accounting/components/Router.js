import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
//import LoadingIndicator from '../../../components/LoadingIndicator';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dashboard from '../Dashboard';
import AccountSetting from '../AccountSetup/components/AccountSetting';


const Router = props => {
  const {
    loading,
    accountingSetupData,
    getAccountingSetupAction
  } = props;

  useEffect(() => {
      getAccountingSetupAction();
  }, []);


  console.log('accountingSetupData Router -> ', accountingSetupData);

  if (loading) {
    return <div style={{textAlign:'center'}}><div style={{margin:'2px auto'}}><CircularProgress /></div></div>;
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
