import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from './actions';
import * as Selectors from './selectors';
import LoadingIndicator from './../../../components/LoadingIndicator';
import ModuleLayout from '../components/ModuleLayout';
import AccountChart from '../Chart/components/AccountChart';


const Chart = props => {
  useInjectReducer({ key: 'chart', reducer });
  useInjectSaga({ key: 'chart', saga });

  console.log('Chart index.js loaded');

  const {
    loading,
    dispatchGetAllChartOfAccountTypeAction,
    dispatchGetAllAccountTypeAction,
  } = props;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatchGetAllChartOfAccountTypeAction();
    dispatchGetAllAccountTypeAction();
  }, []);


  if (loading) {
    return <LoadingIndicator />;
  }

  return (
      <ModuleLayout>
        <AccountChart />
      </ModuleLayout>
  );
};

Chart.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetAllChartOfAccountTypeAction: () => dispatch(Actions.getAllChartOfAccountTypeAction()),
    dispatchGetAllAccountTypeAction: () => dispatch(Actions.getAllAccountTypeAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Chart);
