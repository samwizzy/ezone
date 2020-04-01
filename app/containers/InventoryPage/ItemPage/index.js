/**
 *
 * ItemPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectItemPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import TransferOrderDialog from './components/TransferOrderDialog';
import ViewItemDialog from './components/ViewItemDialog';
import ItemDialog from './components/ItemDialog';
import ItemsList from './components/ItemsList';
import ModuleLayout from '../components/ModuleLayout';

export function ItemPage(props) {
  useInjectReducer({ key: 'itemPage', reducer });
  useInjectSaga({ key: 'itemPage', saga });

  const { getAllItemsAction, getAllWarehousesAction } = props;

  useEffect(() => {
    getAllItemsAction();
    getAllWarehousesAction();
  }, []);

  return (
    <div>
      <ModuleLayout>
        <Helmet>
          <title>ItemPage</title>
          <meta name="description" content="Description of ItemPage" />
        </Helmet>
        <ItemsList />
        <ItemDialog />
        <ViewItemDialog />
        <TransferOrderDialog />
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
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ItemPage);
