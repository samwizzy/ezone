/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, memo } from 'react';
import { Helmet } from 'react-helmet';
// import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import HomePage from '../HomePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import Registration from '../AuthorizationPage/Register/Loadable';
import Login from '../AuthorizationPage/Login/Loadable';
import ForgotPassword from '../AuthorizationPage/Login/components/ForgotPasswordForm';
import organizationPage from '../CompanyStructurePage/OrganizationInfo/Loadable';
import CompanyStructure from '../CompanyStructurePage/CompanyStructure/Loadable';
// import PartyPage from '../CompanyStructurePage/CompanyStructure/components/PartyPage';
import CompanyStructureParty from '../CompanyStructurePage/CompanyStructure/components/PartyPage';
import CompanyStructurePosition from '../CompanyStructurePage/CompanyStructure/components/PositionPage';
import UsersPage from '../UsersPage/Loadable';
import Employees from '../UsersPage/EmployeePage/Loadable';
import UserProfilePage from '../UsersPage/UserProfilePage/Loadable';
import UtilityPage from '../UtilityPage/Loadable';
import ChatApp from '../UtilityPage/ChatApp/ChatTab';
import TasksPage from '../UtilityPage/TasksApp/Loadable';
import FilesApp from '../UtilityPage/FilesApp/Loadable';
import HRPage from '../HRPage/Loadable';
import EmailConfig from '../EmailConfig/Loadable';
import EmailConfigs from '../EmailConfig/components/TabsPage';
import EmailTemplate from '../EmailConfig/components/EmailTemplate';
import EmailTemplates from '../EmailConfig/EmailTemplates/Loadable';
import EmailPasswordTemplate from '../EmailConfig/components/EmailPasswordTemplate';
import WorkOrderPage from '../WorkOrder/Loadable';
import InventoryPage from '../InventoryPage/Loadable';
import WarehousePage from '../InventoryPage/WarehousePage/Loadable';
import ItemPage from '../InventoryPage/ItemPage/Loadable';
import TransferOrdersApp from '../InventoryPage/ItemPage/components/TransferOrder';
import NewTransferOrder from '../InventoryPage/ItemPage/components/TransferOrder/NewTransferOrder';
import InventoryAdjustmentApp from '../InventoryPage/ItemPage/components/InventoryAdjustment';
import Layout1 from '../../components/layouts/layout1/Layout1';
import Layout2 from '../../components/layouts/layout2/Layout2';
import Layout3 from '../../components/layouts/layout3/Layout3';
import * as Selectors from './selectors';
import PrivateRoute from '../AuthProvider/PrivateRoute';
import Snackbar from './components/Snackbar';
import { AppContext } from '../context/AppContext';
import sideBarconfig from '../../components/Sidebar/components/SidebarConfig';
import AccountPage from '../Accounting/Loadable';
import ChartPage from '../Accounting/Chart/Loadable';
// import AccountChart from '../OldAccounting/Chart/components/AccountChart';
// import AddNewJournal from '../OldAccounting/Journal/AddNewJournal';
// import AccountSetting from '../OldAccounting/components/AccountSetting';
import CrmDashboard from '../Crm/Dashboard/Loadable';
import CrmContacts from '../Crm/Contacts/Loadable';
import CrmCompanies from '../Crm/Companies/Loadable';
import CrmActivities from '../Crm/Activities/Loadable';

// import { messaging } from '../../utils/firebase-notification';

import { Auth } from '../../auth';

const App = props => {
  const { currentUser, accessToken } = props;

  // useEffect(() => {
  //   messaging.requestPermission()
  //   .then(async function() {
  // 		await messaging.getToken().then(token => {
  //       fetch('https://dev.ezoneapps.com/gateway/utilityserv/api/v1/fcm/update_client_fcm_token',{
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //         body: JSON.stringify({ sessionId: token, userUuid: currentUser.uuId }),
  //       })
  //       .then(response => response.json())
  //       // .then(data => console.log(data, 'dont bother for this response'));
  //     });
  //     })
  //   .catch(function(err) {
  //     console.log("Unable to get permission to notify.", err);
  //   });
  //   // navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
  // }, []);

  return (
    <div>
      {/* <AppContext.Provider value={{ authTokens, setAuthTokens: setTokens }}> */}
      <AppContext.Provider value={{ sideBarconfig }}>
        <CssBaseline />
        <main>
          <div>
            <Helmet titleTemplate="%s - Ezone" defaultTitle="Ezone">
              <meta
                name="description"
                content="A React.js Boilerplate application"
              />
            </Helmet>

            {/* <Auth> */}
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Login} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route exact path="/register" component={Registration} />
              <Layout3>
                <PrivateRoute
                  exact
                  path="/organization"
                  component={organizationPage}
                />
                <PrivateRoute exact path="/users" component={UsersPage} />
                <PrivateRoute
                  exact
                  path="/users/employees"
                  component={Employees}
                />
                <PrivateRoute
                  exact
                  path="/users/profile"
                  component={UserProfilePage}
                />
                <PrivateRoute
                  exact
                  path="/organization/company/structure"
                  component={CompanyStructure}
                />
                {/* <PrivateRoute
                  exact
                  path="/organization/company/structure/:partyGroupId"
                  component={PartyPage}
                /> */}
                <PrivateRoute
                  exact
                  path="/organization/company/structure/party/:partyGroupId/:partyId"
                  component={CompanyStructureParty}
                />
                <PrivateRoute
                  exact
                  path="/organization/company/structure/position/:partyGroupId/:partyId/:positionId"
                  component={CompanyStructurePosition}
                />
                {/* <PrivateRoute exact path="/dashboard" component={UtilityPage} /> */}
                <PrivateRoute exact path="/dashboard" component={UtilityPage} />
                <PrivateRoute
                  exact
                  path="/dashboard/tasks"
                  component={TasksPage}
                />
                <PrivateRoute
                  exact
                  path="/dashboard/task/:id"
                  component={TasksPage}
                />
                <PrivateRoute
                  exact
                  path="/dashboard/folders"
                  component={FilesApp}
                />
                <PrivateRoute
                  exact
                  path="/dashboard/folder/:folderId"
                  component={FilesApp}
                />
                <PrivateRoute
                  exact
                  path="/dashboard/chats"
                  component={ChatApp}
                />

                <PrivateRoute exact path="/email" component={EmailConfig} />
                <PrivateRoute
                  path="/email/configuration"
                  component={EmailConfigs}
                />
                <PrivateRoute
                  path="/email/template/:emailType?"
                  component={EmailTemplates}
                />
                {/* <PrivateRoute exact path="/email/template/:emailType" component={EmailTemplates} /> */}
                <PrivateRoute
                  path="/email/password/template"
                  component={EmailPasswordTemplate}
                />
                <PrivateRoute exact path="/home" component={HomePage} />
                <PrivateRoute path="/WorkOrder" component={WorkOrderPage} />
                <PrivateRoute
                  path="/hr/:sectionId?/:status?"
                  component={HRPage}
                />
                <PrivateRoute exact path="/account" component={AccountPage} />
                <PrivateRoute
                  exact
                  path="/account/chart"
                  component={ChartPage}
                />
                {/* <PrivateRoute exact path="/account/chart" component={AccountChart} />
                <PrivateRoute exact path="/account/journal/new" component={AddNewJournal} />
                <PrivateRoute exact path="/account/setting" component={AccountSetting} /> */}
                <PrivateRoute
                  exact
                  path="/inventory"
                  component={InventoryPage}
                />
                <PrivateRoute
                  path="/inventory/warehouses"
                  component={WarehousePage}
                />
                <PrivateRoute
                  exact
                  path="/inventory/items/:statusId?"
                  component={ItemPage}
                />
                <PrivateRoute
                  exact
                  path="/inventory/item/:statusId?/:sku?"
                  component={ItemPage}
                />
                {/* <PrivateRoute
                  exact
                  path="/inventory/item/:statusId?"
                  component={ItemPage}
                /> */}
                <PrivateRoute
                  exact
                  path="/inventory/transfer/orders/:statusId?"
                  component={TransferOrdersApp}
                />
                <PrivateRoute
                  exact
                  path="/inventory/transfer/new"
                  component={NewTransferOrder}
                />
                <PrivateRoute
                  exact
                  path="/inventory/adjustments/:statusId?"
                  component={InventoryAdjustmentApp}
                />
                <PrivateRoute exact path="/crm" component={CrmDashboard} />
                <PrivateRoute
                  exact
                  path="/crm/dashboard"
                  component={CrmDashboard}
                />
                <PrivateRoute
                  exact
                  path="/crm/contacts"
                  component={CrmContacts}
                />
                <PrivateRoute
                  exact
                  path="/crm/companies"
                  component={CrmCompanies}
                />
                <PrivateRoute
                  exact
                  path="/crm/activities"
                  component={CrmActivities}
                />
              </Layout3>
              <Route path="" component={NotFoundPage} />
            </Switch>
            <Snackbar />
            {/* </Auth> */}
          </div>
        </main>
      </AppContext.Provider>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: Selectors.makeSelectCurrentUser(),
  accessToken: Selectors.makeSelectAccessToken(),
});

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
  // withUtilitySaga,
  // withUtilityReducer,
  memo,
)(App);
