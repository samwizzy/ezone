import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectItemPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import ItemDialog from './components/Items/ItemDialog';
import ItemDetails from './components/Items/itemDetails/ItemDetails';
import ItemsList from './components/Items/ItemsList';
import ItemApp from './components/Items';
import ItemsGroupsPage from './components/ItemsGroups';
import ModuleLayout from '../components/ModuleLayout';

export function ItemPage(props) {
  useInjectReducer({ key: 'itemPage', reducer });
  useInjectSaga({ key: 'itemPage', saga });

  const { getAllItems, getItemsGroups, getAllWarehouse, getAccounts, getVendors, match } = props;
  const { path } = match;

  useEffect(() => {
    getAllItems();
    getItemsGroups();
    getAllWarehouse();
    getAccounts();
    getVendors();
  }, []);

  return (
    <div>
      <ModuleLayout>
        <Helmet>
          <title>Item Page</title>
          <meta name="description" content="Description of Item Page" />
        </Helmet>

        <Fragment>
          <Route exact path={path} component={ItemsList} />
          <Route path={`/inventory/items/groups`} component={ItemsGroupsPage} />
          <Route exact path={`/inventory/items/create/:status?`} component={ItemDialog} />
          <Route path={`/inventory/item`} component={ItemApp} />
        </Fragment>
      </ModuleLayout>
    </div>
  );
}

ItemPage.propTypes = {
  getAllItems: PropTypes.func,
  getAllWarehouse: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  itemPage: makeSelectItemPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllItems: () => dispatch(Actions.getAllItems()),
    getItemsGroups: () => dispatch(Actions.getItemsGroups()),
    getAllWarehouse: () => dispatch(Actions.getAllWarehouse()),
    getAccounts: () => dispatch(Actions.getAccounts()),
    getVendors: () => dispatch(Actions.getVendors()),
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
)(ItemPage);
