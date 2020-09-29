import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectInventoryPage from './../selectors';
import reducer from './../reducer';
import saga from './../saga';
import Sales from './sales/SalesOrders';
import Invoices from './invoices';
import ModuleLayout from './../components/ModuleLayout';

const key = "inventorySales";
const SalesPage = (props) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { path } = props.match

  return (
    <div>
      <Helmet>
        <title>Sales Page</title>
        <meta name="description" content="Description of Sales Page" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={Sales} />
        <Route exact path={`${path}/:saleId`} component={Invoices} />
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
)(SalesPage);