/**
 *
 * WorkOrderPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectWorkOrderPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import WorkOrderList from './components/WorkOrderList';
import WorkOrderDialog from './components/WorkOrderDialog';
import AddItemDialog from './components/AddItemDialog';
import AddVendorDialog from './components/AddVendorDialog';

export function WorkOrderPage() {
  useInjectReducer({ key: 'workOrderPage', reducer });
  useInjectSaga({ key: 'workOrderPage', saga });

  return (
    <div>
      <Helmet>
        <title>WorkOrderPage</title>
        <meta name="description" content="Description of WorkOrderPage" />
      </Helmet>
      <WorkOrderList />
      <WorkOrderDialog />
      <AddVendorDialog />
      <AddItemDialog />
    </div>
  );
}

WorkOrderPage.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  workOrderPage: makeSelectWorkOrderPage(),
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
)(WorkOrderPage);
