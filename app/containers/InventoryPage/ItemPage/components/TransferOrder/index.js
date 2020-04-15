/**
 *
 * ItemPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import TransferOrderDialog from './TransferOrderDialog';
import TransferOrdersList from './TransferOrdersList';
import ModuleLayout from '../../../components/ModuleLayout';

function TransferOrderApp(props) {
  const { match } = props;
  const { params } = match
  console.log(match.params, "params")

  useEffect(() => {}, []);

  return (
    <div>
        <Helmet>
          <title>Transfer Order</title>
          <meta name="description" content="Description of Transfer Order" />
        </Helmet>
        <ModuleLayout>
            {
            params.statusId == 'new'?
            <TransferOrderDialog />
            :
            <TransferOrdersList />
            }
        </ModuleLayout>
    </div>
  );
}

TransferOrderApp.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
