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
import InventoryAdjustmentDialog from './InventoryAdjustmentDialog';
import InventoryAdjustmentList from './InventoryAdjustmentList';
import ModuleLayout from '../../../components/ModuleLayout';

function InventoryAdjustmentApp(props) {
  const { match } = props;
  const { params } = match
  console.log(match.params, "params")

  useEffect(() => {}, []);

  return (
    <div>
        <Helmet>
          <title>Inventory Adjustment</title>
          <meta name="description" content="Description of Inventory Adjustment" />
        </Helmet>
        <ModuleLayout>
            {
            params.statusId == 'new'?
            <InventoryAdjustmentDialog />
            :
            <InventoryAdjustmentList />
            }
        </ModuleLayout>
    </div>
  );
}

InventoryAdjustmentApp.propTypes = {};

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
)(InventoryAdjustmentApp);
