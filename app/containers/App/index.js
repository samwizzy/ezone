/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, memo } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
//import HomePage from '../HomePage/Loadable';
import Home from '../Home/Loadable';
import Dashboard from '../Dashboard/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import Registration from '../AuthorizationPage/Register/Loadable';
import Login from '../AuthorizationPage/Login/Loadable';
import Logout from '../AuthorizationPage/Logout/Loadable';
import ForgotPassword from '../AuthorizationPage/ForgotPassword/Loadable';
import organizationPage from '../CompanyStructurePage/OrganizationInfo/Loadable';
import CompanyStructure from '../CompanyStructurePage/CompanyStructure/Loadable';
import CompanyStructureParty from '../CompanyStructurePage/CompanyStructure/components/PartyPage';
import CompanyStructurePosition from '../CompanyStructurePage/CompanyStructure/components/PositionPage';
import UsersPage from '../UsersPage/Loadable';
import Employees from '../UsersPage/EmployeePage/Loadable';
import UserProfilePage from '../UsersPage/UserProfilePage/Loadable';
import UtilityPage from '../UtilityPage/Loadable';
import ChatApp from '../UtilityPage/ChatApp/Loadable';
import TasksPage from '../UtilityPage/TasksApp/Loadable';
import FilesApp from '../UtilityPage/FilesApp/Loadable';
import HRPage from '../HRPage/Loadable';
import AttendancePage from '../HRPage/Attendance/Loadable';
import LeaveManagementPage from '../HRPage/LeaveManagement/Loadable';
import PerformancePage from '../HRPage/Performance/Loadable';
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
import * as Actions from './actions';
import PrivateRoute from '../AuthProvider/PrivateRoute';
import { AppContext } from '../context/AppContext';
import sideBarconfig from '../../components/Sidebar/components/SidebarConfig';
import AccountPage from '../Accounting/Loadable';
/*import ReportsPage from '../Accounting/Reports/index';
import ChartPage from '../Accounting/Chart/Loadable';
import BankingPage from '../Accounting/Banking/Loadable';
import BudgetPage from '../Accounting/Budget/Loadable';
import SettingsPage from '../Accounting/Settings/Loadable';*/
import SalesPage from '../SalesPage';
import Payroll from '../Payroll';
import PurchasePage from '../PurchasePage';
//import AccountSetup from '../Accounting/Settings/components/AccountSetup';
/*import PayrollPage from '../Accounting/Payroll/Loadable';
import FixedAssetsPage from '../Accounting/FixedAssets';
import AccountDetails from '../Accounting/Banking/components/AccountDetails';
import DetailsOfAccountChart from '../Accounting/Chart/components/DetailsOfAccountChart';
import JournalPage from '../Accounting/Journal/Loadable';
import AddNewJournal from '../Accounting/Journal/components/AddNewJournal';
import JournalDetails from '../Accounting/Journal/components/JournalDetails';*/
import CrmDashboard from '../Crm/Dashboard/Loadable';
import CrmContacts from '../Crm/Contacts/Loadable';
import CrmCompanies from '../Crm/Companies/Loadable';
import CrmCampaigns from '../Crm/Campaigns/Loadable';
import CrmContactGroups from '../Crm/ContactGroups/Loadable';
import CrmSchedules from '../Crm/Schedules/Loadable';
import CrmActivities from '../Crm/Activities/Loadable';
import CrmReports from '../Crm/Reports/Loadable';
import CrmSocialMedia from '../Crm/SocialMedia/Loadable';

import CrmLeads from '../Crm/Leads/Loadable';

import LMSDashboardModule from '../LMS/Dashboard/Loadable';
import LMSAccountSettingsModule from '../LMS/AccountSettings/Loadable';
import LMSIntegrationModule from '../LMS/Integration/Loadable';
import LMSManageCoursesModule from '../LMS/ManageCourses/Loadable';
import LMSMessagesModule from '../LMS/Messages/Loadable';
import LMSQuizzesModule from '../LMS/Quizzes/Loadable';
import LMSVirtualClassroomsModule from '../LMS/VirtualClassrooms/Loadable';
import LMSUsersModule from '../LMS/Users/Loadable';
import LMSFileLibraryModule from '../LMS/FileLibrary/Loadable';
import LMSAttendanceModule from '../LMS/Attendance/Loadable';
import LMSContactsModule from '../LMS/Contacts/Loadable';
import LMSActivitiesModule from '../LMS/Activities/Loadable';
import LMSSchedulesModule from '../LMS/Schedules/Loadable';

// import { messaging } from '../../utils/firebase-notification';

import Auth from './Auth';

const App = props => {
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

            <Auth>
              <Switch>
                {/* <PrivateRoute exact path="/home" component={HomePage} /> */}
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/" component={Login} />
                <Route exact path="/forgot-password" component={ForgotPassword} />
                <Route exact path="/register" component={Registration} />
                <Layout3>
                  <PrivateRoute exact path="/home" component={Home} />
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute
                    exact
                    path="/organization"
                    component={organizationPage}
                  />
                  {/* <PrivateRoute exact path="/users" component={UsersPage} /> */}
                  <PrivateRoute
                    exact
                    path="/users"
                    component={Employees}
                  />
                  <PrivateRoute
                    exact
                    path="/user-profile"
                    component={UserProfilePage}
                  />
                  <PrivateRoute
                    exact
                    path="/organization/company/structure/:groupId?"
                    component={CompanyStructure}
                  />
                  <PrivateRoute
                    exact
                    path="/organization/company/structure/:groupId?/party/:partyId?"
                    component={CompanyStructure}
                  />
                  <PrivateRoute
                    exact
                    path="/organization/company/structure/:groupId?/party/:partyId?/position/:positionId?"
                    component={CompanyStructure}
                  />

                  <PrivateRoute
                    exact
                    path="/utility/:tab?"
                    component={UtilityPage}
                  />
                  <PrivateRoute
                    exact
                    path="/task-manager/tasks"
                    component={TasksPage}
                  />
                  <PrivateRoute
                    exact
                    path="/task-manager/task/:id"
                    component={TasksPage}
                  />
                  <PrivateRoute
                    exact
                    path="/file-manager/folders"
                    component={FilesApp}
                  />
                  <PrivateRoute
                    exact
                    path="/file-manager/folder/:folderId"
                    component={FilesApp}
                  />
                  <PrivateRoute exact path="/chats" component={ChatApp} />

                  <PrivateRoute
                    exact
                    path="/settings/email"
                    component={EmailConfig}
                  />
                  <PrivateRoute
                    path="/settings/email/configuration"
                    component={EmailConfigs}
                  />
                  <PrivateRoute
                    path="/settings/email/template/:emailType?"
                    component={EmailTemplates}
                  />
                  {/* <PrivateRoute exact path="settings/email/template/:emailType" component={EmailTemplates} /> */}
                  <PrivateRoute
                    path="/settings/email/password/template"
                    component={EmailPasswordTemplate}
                  />
                  <PrivateRoute exact path="/lms/dashboard" component={LMSDashboardModule} />
                  <PrivateRoute exact path="/lms/account-settings" component={LMSAccountSettingsModule} />
                  <PrivateRoute exact path="/lms/integration" component={LMSIntegrationModule} />
                  <PrivateRoute exact path="/lms/messages" component={LMSMessagesModule} />
                  <PrivateRoute exact path="/lms/file-library" component={LMSFileLibraryModule} />
                  <PrivateRoute exact path="/lms/users" component={LMSUsersModule} />
                  <PrivateRoute exact path="/lms/manage-courses" component={LMSManageCoursesModule} />
                  <PrivateRoute exact path="/lms/virtual-classrooms" component={LMSVirtualClassroomsModule} />
                  <PrivateRoute exact path="/lms/quizzes" component={LMSQuizzesModule} />
                  <PrivateRoute exact path="/lms/attendance" component={LMSAttendanceModule} />

                  <PrivateRoute exact path="/work-order" component={WorkOrderPage} />

                  <PrivateRoute exact path="/human-resource/leave-management/:page?/:pageId?" component={LeaveManagementPage} />
                  <PrivateRoute exact path="/human-resource/performance/:page/:pageId?" component={PerformancePage} />

                  <PrivateRoute exact path="/human-resource/attendance" component={AttendancePage} />
                  {/*<PrivateRoute exact path="/hr/attendance" component={AttendancePage} />*/}
                  <PrivateRoute exact path="/hr/:section?/:status?" component={HRPage} />

                  <PrivateRoute exact path="/hr/:section?/:status?/applicant/:applicantId?" component={HRPage} />

                  <PrivateRoute exact path="/account" component={AccountPage} />
                  <PrivateRoute exact path="/account/:id" component={AccountPage} />
                  <PrivateRoute exact path="/account/:id/:name" component={AccountPage} />
    
                  <PrivateRoute exact path="/payroll" component={Payroll} />
                  {/*<PrivateRoute exact path="/account/reports" component={ReportsPage} />*/}

                  {/*<PrivateRoute exact path="/account/chart" component={ChartPage} />*/}
                  {/*<PrivateRoute exact path="/account/chart/details" component={DetailsOfAccountChart} />*/}
                  {/*<PrivateRoute exact path="/account/banking" component={BankingPage} />*/}
                  {/*<PrivateRoute exact path="/account/budgeting/:status?" component={BudgetPage} />
                  <PrivateRoute exact path="/account/settings/:status?" component={SettingsPage} />
                  {/*<PrivateRoute exact path="/account/settings/setup" component={AccountSetup} />}
                  <PrivateRoute exact path="/account/banking/details" component={AccountDetails} />
                  <PrivateRoute exact path="/account/journal" component={JournalPage} />
                  {/*<PrivateRoute exact path="/account/payroll" component={PayrollPage} />}
                  <PrivateRoute exact path="/account/fixedassets" component={FixedAssetsPage} />
                  <PrivateRoute exact path="/account/journal/add" component={AddNewJournal} />
                  <PrivateRoute exact path="/account/journal/details" component={JournalDetails} />*/}


                  {/*<PrivateRoute exact path="/inventory" />*/}

                  <PrivateRoute
                    exact
                    path="/inventory/dashboard"
                    component={InventoryPage}
                  />

                  <PrivateRoute
                    exact
                    path="/sales"
                    component={SalesPage}
                  />

               <PrivateRoute
                    exact
                    path="/sales/:id"
                    component={SalesPage}
                  />

                <PrivateRoute
                    exact
                    path="/purchase"
                    component={PurchasePage}
                  />

                   <PrivateRoute
                    exact
                    path="/purchase/:id"
                    component={PurchasePage}
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
                    path="/crm/campaigns"
                    component={CrmCampaigns}
                  />
                  <PrivateRoute
                    exact
                    path="/crm/contact-groups/:contactId?"
                    component={CrmContactGroups}
                  />
                  <PrivateRoute
                    exact
                    path="/crm/schedules"
                    component={CrmSchedules}
                  />
                  <PrivateRoute
                    exact
                    path="/crm/activities"
                    component={CrmActivities}
                  />
                  <PrivateRoute
                    exact
                    path="/crm/reports"
                    component={CrmReports}
                  />
                  <PrivateRoute
                    exact
                    path="/crm/social-media/:socialId?"
                    component={CrmSocialMedia}
                  />
                  <PrivateRoute
                    path="/crm/leads"
                    component={CrmLeads}
                  />
                </Layout3>
                <Route path="" component={NotFoundPage} />
              </Switch>
            </Auth>
          </div>
        </main>
      </AppContext.Provider>
    </div>
  );
};


export default compose(
  // withUtilitySaga,
  // withUtilityReducer,
  memo,
)(App);
