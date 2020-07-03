/**
 *
 * Accounting
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { BrowserRouter as Router, Switch,useParams, Route } from "react-router-dom";
import * as Actions from './actions';
import makeSelectAccounting, * as Selectors from './selectors';
import AccountSetup from './Settings/components/AccountSetup';
import Dashboard from './Dashboard';
import Charts from './Chart/Loadable';
import Reports from './Reports/index';
import Home from './home';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingIndicator from './../../components/LoadingIndicator';
import ModuleLayout from './components/ModuleLayout';
import Journal from './Journal';
import PayrollPage from './Payroll';
import Budget from './Budget';
import Banking from './Banking';
import FixedAssets from './FixedAssets';

export function Accounting(props) {
  const {id} = useParams();
  useInjectReducer({ key: 'accounting', reducer });
  useInjectSaga({ key: 'accounting', saga });
  console.log(`Accounting index.js loaded ${id}`);

  const {
    loading
  } = props;

  // Similar to componentDidMount and componentDidUpdate:

  // Routing based on api response
  if (loading) {
    return <LoadingIndicator/>;
  }

  return(
    <div>
       <Switch>
         {id === undefined?
         <Route exact path="/account" component={Home} />
         :
         (
          <Route exact path={`/account/${id}`} component={
            id === 'reports'?Reports:(
              id==='charts'?Charts:(id=== 'journal'?Journal:(
                id==='fixedassets'?FixedAssets:(
                  id==='banking'?Banking:(
                    id==='payroll'?PayrollPage:(
                      id==='budgeting'?Budget:(
                        id==='settings'?Home:Home
                      )
                    )
                  )
                )
              ))
              )
          } />
         )
         }
        </Switch>
    </div>
  )

}

Accounting.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading()
});

const withConnect = connect(
  mapStateToProps
);

export default compose(
  withConnect,
  memo,
)(Accounting);
