/**
 *
 * ItemPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as Actions from '../../actions';
import TransferOrderDetails from './TransferOrderDetails/TransferOrderDetails';
import TransferOrderDialog from './TransferOrderDialog';
import TransferOrdersList from './TransferOrdersList';
import ModuleLayout from '../../../components/ModuleLayout';

function TransferOrderApp(props) {
  const { match, getAllItems, getAllWarehouse, getAllTransferOrder, } = props;
  const { path } = match
  console.log(match, "match TransferOrderApp")

  useEffect(() => {
    getAllItems();
    getAllWarehouse();
    getAllTransferOrder();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Transfer Order</title>
        <meta name="description" content="Description of Transfer Order" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={TransferOrdersList} />
        <Route exact path={`${path}/create/new`} component={TransferOrderDialog} />
        <Route exact path={`/inventory/transfer/:transferId`} component={TransferOrderDetails} />
        <Route exact path={`/inventory/transfer/:transferId/edit`} component={TransferOrderDialog} />
      </ModuleLayout>
    </div>
  );
}

TransferOrderApp.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    getAllTransferOrder: () => dispatch(Actions.getAllTransferOrder()),
    getAllWarehouse: () => dispatch(Actions.getAllWarehouse()),
    getAllItems: () => dispatch(Actions.getAllItems()),
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
)(TransferOrderApp);
