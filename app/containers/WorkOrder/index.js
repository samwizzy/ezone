/**
 *
 * WorkOrderPage
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
import makeSelectWorkOrderPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import WorkOrderList from './components/WorkOrderList';
import WorkOrderDialog from './components/WorkOrderDialog';
import AddItemDialog from './components/AddItemDialog';
import AddVendorDialog from './components/AddVendorDialog';
import Actions from './actions';

export function WorkOrderPage(props) {
  useInjectReducer({ key: 'workOrderPage', reducer });
  useInjectSaga({ key: 'workOrderPage', saga });

  const {
    // getListOfVendorsAction
  } = props;

  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    // console.log('useEffect');
    // getListOfVendorsAction();
  }, []);

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
    // getListOfVendorsAction: () => dispatch(Actions.getAllVendorsAction()),
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
