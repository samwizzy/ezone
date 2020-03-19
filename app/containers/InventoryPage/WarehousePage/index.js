/**
 *
 * WarehousePage
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
import makeSelectWarehousePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import WarehouseList from './components/WarehouseList';
import WarehouseDialog from './components/WarehouseDialog';

export function WarehousePage() {
  useInjectReducer({ key: 'warehousePage', reducer });
  useInjectSaga({ key: 'warehousePage', saga });

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
};

const mapStateToProps = createStructuredSelector({
  warehousePage: makeSelectWarehousePage(),
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
)(WarehousePage);
