import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectInventoryPage from './../selectors';
import reducer from './reducer';
import saga from './saga';
import Purchases from './purchase/PurchaseOrders';
import ModuleLayout from './../components/ModuleLayout';

const key = "inventoryPurchase";
const PurchasePage = (props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { path } = props.match

  return (
    <div>
      <Helmet>
        <title>Purchase Page</title>
        <meta name="description" content="Description of Purchase Page" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={Purchases} />
        <Route exact path={`${path}/:purchaseId`} component={Purchases} />
      </ModuleLayout>
    </div>
  );
}

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
)(PurchasePage);