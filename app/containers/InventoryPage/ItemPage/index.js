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

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectItemPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import TransferOrderDialog from './components/TransferOrder/TransferOrderDialog';
import ViewItemDialog from './components/Items/ViewItemDialog';
import ItemDialog from './components/Items/ItemDialog';
import ItemDetails from './components/Items/ItemDetails';
import ItemsList from './components/Items/ItemsList';
import ModuleLayout from '../components/ModuleLayout';

export function ItemPage(props) {
  useInjectReducer({ key: 'itemPage', reducer });
  useInjectSaga({ key: 'itemPage', saga });

  const { getAllItemsAction, getAllWarehousesAction, getAccounts, match } = props;
  const { params } = match;
  console.log(match.params, 'params');

  useEffect(() => {
    getAllItemsAction();
    getAllWarehousesAction();
    getAccounts();
  }, []);

  return (
    <div>
      <ModuleLayout>
        <Helmet>
          <title>ItemPage</title>
          <meta name="description" content="Description of ItemPage" />
        </Helmet>
        {params.statusId == 'new' ? (
          <ItemDialog />
        ) : params.statusId == 'edit' ? (
          <ItemDialog />
        ) : params.statusId ? (
          <ItemDetails />
        ) : (
                <ItemsList />
              )}
      </ModuleLayout>
    </div>
  );
}

ItemPage.propTypes = {
  getAllItemsAction: PropTypes.func,
  getAllWarehousesAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  itemPage: makeSelectItemPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllItemsAction: () => dispatch(Actions.getAllItems()),
    getAllWarehousesAction: () => dispatch(Actions.getAllWarehouse()),
    getAccounts: () => dispatch(Actions.getAccounts()),
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
)(ItemPage);
