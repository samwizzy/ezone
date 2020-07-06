/**
 *
 * Banking
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  BrowserRouter as Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBanking from './selectors';
import * as Actions from './actions';
import * as Selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ModuleLayout from '../components/ModuleLayout';
import LoadingIndicator from './../../../components/LoadingIndicator';
import BankList from './components/BankList';

export function Banking(props) {
  const {id} = useRouteMatch();
  useInjectReducer({ key: 'banking', reducer });
  useInjectSaga({ key: 'banking', saga });

  console.log(`Banking index.js loaded ${id}`);

  const {
    loading,
    dispatchGetAllBankAccountAction,
    dispatchGetAllAccountTypeAction,
    dispatchGetAllTransferByOrgIdAction,
  } = props;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatchGetAllBankAccountAction();
    dispatchGetAllAccountTypeAction();
    dispatchGetAllTransferByOrgIdAction();
  }, []);


  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Helmet>
        <title>Banking</title>
        <meta name="description" content="Description of Banking" />
      </Helmet>
      <ModuleLayout>
        <BankList />
      </ModuleLayout>
    </div>
  );
}

Banking.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  banking: makeSelectBanking(),
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetAllBankAccountAction: () => dispatch(Actions.getAllBankAccountAction()),
    dispatchGetAllAccountTypeAction: () => dispatch(Actions.getAllAccountTypeAction()),
    dispatchGetAllTransferByOrgIdAction: () => dispatch(Actions.getAllTransferByOrgIdAction()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Banking);
