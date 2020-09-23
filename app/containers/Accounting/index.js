import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  withRouter,
  useParams,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import makeSelectAccounting, * as Selectors from './selectors';
import { CircleLoader } from '../../components/LoadingIndicator';
import Charts from './Chart/Loadable';
import Reports from './Reports/index';
import Dashboard from './Dashboard';
import Journal from './Journal';
import AddNewJournal from './Journal/components/AddNewJournal';
import JournalDetails from './Journal/components/JournalDetails';
import Budget from './Budget';
import BudgetingDetails from './Budget/components/BudgetingDetails';
import NewBudgeting from './Budget/components/NewBudgeting';
import Banking from './Banking';
import AccountDetails from './Banking/components/AccountDetails';
import DetailsOfAccountChat from './Chart/components/DetailsOfAccountChart';
import FixedAssets from './FixedAssets/index';
import ViewReport from './Reports/ViewReport/ViewReport';
import Settings from './Settings';

const key = "accounting"

export function Accounting(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { loading, accSetUpData, getAccountingSetup, accounting } = props;

  useEffect(() => {
    getAccountingSetup()
  }, [])

  useEffect(() => {
  }, [accSetUpData])

  const { path } = useRouteMatch();

  console.log(path, "path accounts")

  if (loading) {
    return <CircleLoader />
  }

  if (!accSetUpData && !loading) {
    return <Settings />
  }

  return (
    <div>
      <Helmet>
        <title>Accounting</title>
        <meta name="description" content="Description of Accounting" />
      </Helmet>

      <Fragment>
        <Route exact path={path} component={Dashboard} />
        <Route path={`${path}/dashboard`} component={Dashboard} />
        <Route path={`${path}/charts`} component={Charts} />
        <Route path={`${path}/banking`} component={Banking} />
        <Route path={`${path}/journal`} component={Journal} />
        <Route path={`${path}/budgeting`} component={Budget} />
        <Route path={`${path}/fixedassets`} component={FixedAssets} />
        <Route path={`${path}/reports/:reportId?`} component={Reports} />
        <Route path={`${path}/settings`} component={Settings} />

        {/* <Route path={`/account/reports/${name}`} component={ViewReport} />
      {id === undefined ? (
        <Route exact path="/account" component={Home} />
      ) : name === undefined ? (
        <Route
          exact
          path={`/account/${id}`}
          component={
            id === 'reports'
              ? Reports
              : id === 'charts'
                ? Charts
                : id === 'journal'
                  ? Journal
                  : id === 'fixedassets'
                    ? FixedAssets
                    : id === 'banking'
                      ? Banking
                      : id === 'budgeting'
                        ? Budget
                        : id === 'settings'
                          ? Home
                          : id === 'fixedassets'
                            ? FixedAssets
                            : Home
          }
        />
      ) : (
            <Route
              exact
              path={`/account/${id}/${name}`}
              component={
                name === 'add'
                  ? id === 'budgeting'
                    ? NewBudgeting
                    : AddNewJournal
                  : id === 'journal'
                    ? JournalDetails
                    : id === 'charts'
                      ? DetailsOfAccountChat
                      : id === 'budgeting'
                        ? BudgetingDetails
                        : id === 'settings'
                          ? Home
                          : AccountDetails
              }
            />
          )} */}
      </Fragment>
    </div>
  );
}

Accounting.propTypes = {};

const mapStateToProps = createStructuredSelector({
  accounting: makeSelectAccounting(),
  loading: Selectors.makeSelectLoading(),
  accSetUpData: Selectors.makeSelectGetAccountingSetupData(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAccountingSetup: () => dispatch(Actions.getAccountingSetupAction()),
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withRouter,
  withConnect,
  memo,
)(Accounting);
