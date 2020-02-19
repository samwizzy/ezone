/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
// import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import HomePage from '../HomePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import LoginPage from '../LoginPage/Loadable';
import ForgotPasswordForm from '../LoginPage/components/ForgotPasswordForm';
import RegistrationPage from '../RegistrationPage/Loadable';
import OrgPage from '../OrgPage/Loadable';
// import CompanyStructure from '../OrgPage/companyStructure';
import CompanyStructure from '../CompanyStructurePage/Loadable';
import EmployeePage from '../EmployeePage/Loadable';
import UtilityPage from '../UtilityPage/Loadable';
import EmailConfig from '../EmailConfig/Loadable';
import EmailConfigs from '../EmailConfig/components/TabsPage';
import EmailTemplate from '../EmailConfig/components/EmailTemplate';
import EmailPasswordTemplate from '../EmailConfig/components/EmailPasswordTemplate';
import Layout1 from '../../components/layouts/layout1/Layout1';
import Layout2 from '../../components/layouts/layout2/Layout2';
import Layout3 from '../../components/layouts/layout3/Layout3';
// import { makeSelectUserToken } from './selectors';
import PrivateRoute from '../AuthProvider/PrivateRoute';
import Snackbar from './components/Snackbar';
// import { AppContext } from '../context/AppContext';

// import { makeSelectGetSaveToken } from './selectors';

const App = () => {
  // const [authTokens, setAuthTokens] = useState();

  // const setTokens = data => {
  //   // localStorage.setItem('tokens', JSON.stringify(data));
  //   setAuthTokens(data);
  // };

  // console.log(makeSelectGetSaveToken(), 'makeSelectGetSaveToken');

  return (
    <div>
      {/* <AppContext.Provider value={{ authTokens, setAuthTokens: setTokens }}> */}
      <React.Fragment>
        <CssBaseline />
        <main>
          <div>
            <Helmet titleTemplate="%s - Ezone" defaultTitle="Ezone">
              <meta
                name="description"
                content="A React.js Boilerplate application"
              />
            </Helmet>

            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/" component={LoginPage} />
              <Route
                exact
                path="/forgot-password"
                component={ForgotPasswordForm}
              />
              <Route exact path="/register" component={RegistrationPage} />
              <Layout3>
                {/* <PrivateRoute path="/dashboard" component={HomePage} /> */}
                {/* <PrivateRoute path="/posts" component={AllPosts} /> */}
                <PrivateRoute exact path="/organization" component={OrgPage} />
                <PrivateRoute
                  exact
                  path="/organization/company/structure"
                  component={CompanyStructure}
                />
                <PrivateRoute path="/employee" component={EmployeePage} />
                <PrivateRoute path="/utility" component={UtilityPage} />
                <PrivateRoute exact path="/email" component={EmailConfig} />
                <PrivateRoute
                  path="/email/configuration"
                  component={EmailConfigs}
                />
                <PrivateRoute
                  path="/email/template"
                  component={EmailTemplate}
                />
                <PrivateRoute
                  path="/email/password/template"
                  component={EmailPasswordTemplate}
                />
                <PrivateRoute exact path="/dashboard" component={HomePage} />
              </Layout3>
              <Route path="" component={NotFoundPage} />
            </Switch>
            <Snackbar />
          </div>
        </main>
      </React.Fragment>
      {/* </AppContext.Provider> */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    // getUserStatusAction: () => dispatch(getUserStatus()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
