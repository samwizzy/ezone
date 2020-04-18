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
// import * as Selectors from '../selectors';
import ModuleLayout from '../components/ModuleLayout'
import AccountDetails from './components/AccountDetails';
import AccountChart from '../Chart/components/AccountChart';


const Chart = props => {
  useInjectReducer({ key: 'chart', reducer });
  useInjectSaga({ key: 'chart', saga });

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatchGetAllAccountTypeAction();
  }, []);

  const {
    dispatchGetAllAccountTypeAction,
  } = props;

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
  // loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
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
