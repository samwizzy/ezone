/**
 *
 * Budget
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBudgeting from './selectors';
import * as Actions from './actions';
import * as Selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ModuleLayout from '../components/ModuleLayout';
// LoadingIndicator from './../../../components/LoadingIndicator';
import CircularProgress from '@material-ui/core/CircularProgress';
import BudgetingList from './components/BudgetingList';
import BudgetingDetails from './components/BudgetingDetails';
import NewBudgeting from './components/NewBudgeting';

export function Budgeting(props) {
  useInjectReducer({ key: 'budgeting', reducer });
  useInjectSaga({ key: 'budgeting', saga });

  const { 
    loading, 
    match,
    dispatchGetAllAccountingPeriodAction 
  } = props;

  const { params } = match
  console.log(params, "params budgeting")

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatchGetAllAccountingPeriodAction();
  }, []);


  /*if (loading) {
    return <div style={{textAlign:'center'}}><div style={{margin:'2px auto'}}><CircularProgress /></div></div>;
  }*/

  return (
    <div>
      <Helmet>
        <title>Budgeting</title>
        <meta name="description" content="Description of Banking" />
      </Helmet>

      <ModuleLayout>
        { params.status == 'new'?
          <NewBudgeting /> : 
          params.status? <BudgetingDetails /> : <BudgetingList />
        }
      </ModuleLayout>
    </div>
  );
}

Budgeting.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  budgeting: makeSelectBudgeting(),
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetAllAccountingPeriodAction: () => dispatch(Actions.getAllAccountingPeriodAction()),
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
)(Budgeting);
