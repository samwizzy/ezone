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
import * as Selectors from './../selectors';
import SalesOrders from './SalesOrders';

const key = 'inventoryPage';
export function SalesApp(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { path } = props.match;

  return (
    <div>
      <SalesOrders />
    </div>
  );
}

SalesApp.propTypes = {};

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
)(SalesApp);
