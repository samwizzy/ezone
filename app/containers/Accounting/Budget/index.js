import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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
import { CircleLoader } from './../../../components/LoadingIndicator';
import BudgetingList from './components/BudgetingList';
import BudgetingDetails from './components/BudgetingDetails';
import NewBudgeting from './components/NewBudgeting';

export function Budgeting(props) {
  useInjectReducer({ key: 'budgeting', reducer });
  useInjectSaga({ key: 'budgeting', saga });
  const { loading, match, getAccountingPeriods } = props;

  const { params, path } = match
  console.log(params, "params budgeting")

  useEffect(() => {
    getAccountingPeriods();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Budgeting</title>
        <meta name="description" content="Description of Banking" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={BudgetingList} />
        <Route path={`${path}/new`} component={NewBudgeting} />
        <Route path={`${path}/view/:budgetId`} component={BudgetingDetails} />
      </ModuleLayout>
    </div>
  );
}

Budgeting.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  budgeting: makeSelectBudgeting(),
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAccountingPeriods: () => dispatch(Actions.getAccountingPeriods()),
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
