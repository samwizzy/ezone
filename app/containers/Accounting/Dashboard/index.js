import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ModuleLayout from './ModuleLayout'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import AccountDashboard from './components/AccountDashboard'

const DashBoard = props => {

  return (
    <ModuleLayout>
      <AccountDashboard />
    </ModuleLayout>
  );
};

DashBoard.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DashBoard);
