import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectInventoryPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import WarehousePage from './WarehousePage';
import ItemPage from './ItemPage';
import TransferOrdersApp from './ItemPage/components/TransferOrder';
import InventoryAdjustmentApp from './ItemPage/components/InventoryAdjustment';
import Dashboard from './Dashboard'
import SalesPage from './SalesPage'
import PurchasePage from './PurchasePage'

const key = "inventoryPage";
export function InventoryPage(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { path } = props.match

  return (
    <div>
      <Helmet>
        <title>Inventory Page</title>
        <meta name="description" content="Description of Inventory Page" />
      </Helmet>

      <Fragment>
        <Route exact path={path} component={Dashboard} />
        <Route exact path={`${path}/dashboard`} component={Dashboard} />
        <Route path={`${path}/purchase`} component={PurchasePage} />
        <Route path={`${path}/sales`} component={SalesPage} />

        <Route path={`${path}/warehouses`} component={WarehousePage} />
        <Route path={`${path}/items`} component={ItemPage} />
        <Route path={`${path}/item`} component={ItemPage} />
        <Route path={`${path}/transfers`} component={TransferOrdersApp} />
        <Route path={`${path}/transfer`} component={TransferOrdersApp} />
        <Route exact path={`${path}/adjustments/:statusId?`} component={InventoryAdjustmentApp} />
      </Fragment>
    </div>
  );
}

InventoryPage.propTypes = {}

const mapStateToProps = createStructuredSelector({
  inventoryPage: makeSelectInventoryPage(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(InventoryPage);
