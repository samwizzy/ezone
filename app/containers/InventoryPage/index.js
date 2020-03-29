/**
 *
 * InventoryPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectInventoryPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ModuleLayout from './components/ModuleLayout';
import WarehousePage from './WarehousePage/index';
import ItemPage from './ItemPage/index';

export function InventoryPage() {
  useInjectReducer({ key: 'inventoryPage', reducer });
  useInjectSaga({ key: 'inventoryPage', saga });

  return (
    <div>
      <ModuleLayout>
        <Helmet>
          <title>InventoryPage</title>
          <meta name="description" content="Description of InventoryPage" />
        </Helmet>
        <WarehousePage />
        <ItemPage />
      </ModuleLayout>
    </div>
  );
}

InventoryPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  inventoryPage: makeSelectInventoryPage(),
});

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
  withConnect,
  memo,
)(InventoryPage);
