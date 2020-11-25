import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Route, useRouteMatch, withRouter } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBanking from './selectors';
import * as Actions from './actions';
import * as Selectors from './selectors';
import * as AccSelectors from './../selectors';
import reducer from './reducer';
import saga from './saga';
import ModuleLayout from '../components/ModuleLayout';
import BankList from './components/BankList';
import BankDetails from './bankDetails';
import BankAccountDialog from './components/BankAccountDialog';
import ConfirmDeleteBankAccountDialog from './components/ConfirmDeleteBankAccountDialog';
import TransactionTransferDialog from './components/TransactionTransferDialog';

export function Banking(props) {
  useInjectReducer({ key: 'banking', reducer });
  useInjectSaga({ key: 'banking', saga });
  const { path } = useRouteMatch();

  const {
    loading,
    history,
    accSetUpData,
    getBankAccounts,
    getCurrencies,
    getAccountingPeriods,
    getAccountTypes,
    getTransfersByOrgId,
  } = props;

  useEffect(() => {
    getBankAccounts();
    getAccountingPeriods();
    getCurrencies();
    getAccountTypes();
    getTransfersByOrgId();
  }, []);

  if(!accSetUpData){
    history.push('/account/settings');
  }

  return (
    <div>
      <Helmet>
        <title>Banking</title>
        <meta name="description" content="Description of Banking" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={BankList} />
        <Route path={`${path}/:bankId`} component={BankDetails} />
      </ModuleLayout>

      <BankAccountDialog />
      <ConfirmDeleteBankAccountDialog />
      <TransactionTransferDialog />
    </div>
  );
}

Banking.propTypes = {};

const mapStateToProps = createStructuredSelector({
  banking: makeSelectBanking(),
  loading: Selectors.makeSelectLoading(),
  accSetUpData: AccSelectors.makeSelectGetAccountingSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getBankAccounts: () => dispatch(Actions.getBankAccounts()),
    getAccountTypes: () => dispatch(Actions.getAccountTypes()),
    getTransfersByOrgId: () => dispatch(Actions.getTransfersByOrgId()),
    getCurrencies: () => dispatch(Actions.getCurrencies()),
    getAccountingPeriods: () => dispatch(Actions.getAccountingPeriods()),
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
)(Banking);
