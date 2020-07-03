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
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as Actions from './actions';
import makeSelectAccounting, * as Selectors from './selectors';
import AccountSetup from './Settings/components/AccountSetup';
import Dashboard from './Dashboard';
import Reports from './Reports/index';
import Home from './home';
import CircularProgress from '@material-ui/core/CircularProgress';
//import LoadingIndicator from './../../components/LoadingIndicator';
import ModuleLayout from './components/ModuleLayout';

export function Accounting(props) {
  useInjectReducer({ key: 'accounting', reducer });
  useInjectSaga({ key: 'accounting', saga });

  console.log('Accounting index.js loaded');

  const {
    loading
  } = props;

  // Similar to componentDidMount and componentDidUpdate:

  // Routing based on api response
  if (loading) {
    return <div style={{textAlign:'center'}}><CircularProgress disableShrink /></div>;
  }


 /* if (accountingSetupData === null) {
    return (
      <ModuleLayout>
        <AccountSetup />
      </ModuleLayout>
    )
  }
  else {
    //return <Dashboard />
    <Reports/>
  }*/

  return(
    <div>
       <Switch>
         <Route exact path="/account" component={Home} />
        </Switch>
    {/*<Switch>
      {accountingSetupData === null ?
    (<Route exact path="/account">
       <ModuleLayout>
        <AccountSetup />
      </ModuleLayout>
    </Route>):
    (
    <Route exact path="/account" >
      <ModuleLayout>
        <Reports/>
      </ModuleLayout>
    </Route>
   )
      }
      (
    <Route exact path="/account/reports" component={Reports}>
    <ModuleLayout>
        <Reports/>
      </ModuleLayout>
    </Route>
    )
      </Switch>*/}
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
