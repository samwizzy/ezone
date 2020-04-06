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
// import ChatApp from '../UtilityPage/ChatApp/Loadable';
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
import TransferOrdersList from '../InventoryPage/ItemPage/components/TransferOrder/TransferOrdersList';
import NewTransferOrder from '../InventoryPage/ItemPage/components/TransferOrder/NewTransferOrder';
import InventoryAdjustmentList from '../InventoryPage/ItemPage/components/InventoryAdjustment/InventoryAdjustmentList';
import Layout1 from '../../components/layouts/layout1/Layout1';
import Layout2 from '../../components/layouts/layout2/Layout2';
import Layout3 from '../../components/layouts/layout3/Layout3';
// import { makeSelectUserToken } from './selectors';
import PrivateRoute from '../AuthProvider/PrivateRoute';
import Snackbar from './components/Snackbar';
import { AppContext } from '../context/AppContext';
import sideBarconfig from '../../components/Sidebar/components/SidebarConfig';
import AccountPage from '../Accounting/Loadable';
import AccountChart from '../Accounting/components/AccountChart';
import AccountJournal from '../Accounting/components/AccountJournal';

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
                <PrivateRoute path="/email/configuration" component={EmailConfigs} />
                <PrivateRoute exact path="/email/template" component={EmailTemplates} />
                <PrivateRoute exact path="/email/template/:emailType" component={EmailTemplates} />
                <PrivateRoute
                  path="/email/password/template"
                  component={EmailPasswordTemplate}
                />
                <PrivateRoute exact path="/home" component={HomePage} />
                <PrivateRoute path="/WorkOrder" component={WorkOrderPage} />
                <PrivateRoute exact path="/hr" component={HRPage} />
                <PrivateRoute exact path="/hr/:sectionId" component={HRPage} />
                <PrivateRoute path="/account" component={AccountPage} />
                <PrivateRoute path="/accountChart" component={AccountChart} />
                <PrivateRoute path="/accountJournal" component={AccountJournal} />
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
                  path="/inventory/items"
                  component={ItemPage}
                />
                <PrivateRoute
                  exact
                  path="/inventory/transfer/orders"
                  component={TransferOrdersList}
                />
                <PrivateRoute
                  exact
                  path="/inventory/transfer/new"
                  component={NewTransferOrder}
                />
                <PrivateRoute
                  exact
                  path="/inventory/inventory/adjustments"
                  component={InventoryAdjustmentList}
                />
              </Layout3>
              <Route path="" component={NotFoundPage} />
            </Switch>
            <Snackbar />
          </div>
        </main>
      </AppContext.Provider>
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
