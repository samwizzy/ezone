import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouteMatch } from 'react-router-dom';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import { CircleLoader } from '../../../../components/LoadingIndicator';
import BankDetails from './BankDetails';
// import TransactionTransferDialog from './../components/TransactionTransferDialog';

export function BankDetailsPage(props) {
  const { params } = useRouteMatch();
  const { loading, getBankAccountById } = props;
  const { bankId } = params;

  useEffect(
    () => () => {
      if (bankId) {
        getBankAccountById(bankId);
      }
    },
    [],
  );

  return (
    <div>
      <Helmet>
        <title>Bank Details</title>
        <meta name="description" content="Description of Bank Details" />
      </Helmet>

      <BankDetails />

      {/* <TransactionTransferDialog /> */}
    </div>
  );
}

BankDetailsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getBankAccountById: data => dispatch(Actions.getBankAccountById(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BankDetailsPage);
