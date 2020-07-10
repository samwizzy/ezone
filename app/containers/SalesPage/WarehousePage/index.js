/**
 *
 * WarehousePage
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
import makeSelectWarehousePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import ModuleLayout from '../components/ModuleLayout';
import WarehouseList from './components/WarehouseList';
import WarehouseDialog from './components/WarehouseDialog';

export function WarehousePage(props) {
  useInjectReducer({ key: 'warehousePage', reducer });
  useInjectSaga({ key: 'warehousePage', saga });

  const { getAllEmployeesAction, getAllWarehousesAction } = props;

  useEffect(() => {
    getAllEmployeesAction();
    getAllWarehousesAction();
  }, []);

  return (
    <div>
     
        <Helmet>
          <title>WarehousePage</title>
          <meta name="description" content="Description of WarehousePage" />
        </Helmet>
        <WarehouseList />
        <WarehouseDialog />
      
    </div>
  );
}

WarehousePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getAllEmployeesAction: PropTypes.func,
  getAllWarehousesAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  warehousePage: makeSelectWarehousePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllEmployeesAction: () => dispatch(Actions.getAllEmployees()),
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
)(WarehousePage);
