import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
// import HomePage from '../HomePage/Loadable';
import Home from '../Home/Loadable';
import Dashboard from '../Dashboard/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import Registration from '../AuthorizationPage/Register/Loadable';
import Login from '../AuthorizationPage/Login/Loadable';
import Logout from '../AuthorizationPage/Logout/Loadable';
import ForgotPassword from '../AuthorizationPage/ForgotPassword/Loadable';
import organizationPage from '../CompanyStructurePage/OrganizationInfo/Loadable';
import CompanyStructure from '../CompanyStructurePage/CompanyStructure/Loadable';
import UsersPage from '../UsersPage/Loadable';
import RoleRightsApp from '../Roles/Loadable';
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
import EmailTemplates from '../EmailConfig/EmailTemplates/Loadable';
import EmailPasswordTemplate from '../EmailConfig/components/EmailPasswordTemplate';
import WorkOrderPage from '../WorkOrder/Loadable';
import InventoryPage from '../InventoryPage/Loadable';
import WarehousePage from '../InventoryPage/WarehousePage/Loadable';
import ItemPage from '../InventoryPage/ItemPage/Loadable';
import TransferOrdersApp from '../InventoryPage/ItemPage/components/TransferOrder';
import InventoryAdjustmentApp from '../InventoryPage/ItemPage/components/InventoryAdjustment';
import Layout1 from '../../components/layouts/layout1/Layout1';
import Layout2 from '../../components/layouts/layout2/Layout2';
import Layout3 from '../../components/layouts/layout3/Layout3';
import PrivateRoute from '../AuthProvider/PrivateRoute';
import { AppContext } from '../context/AppContext';
import sideBarconfig from '../../components/Sidebar/components/SidebarConfig';
import AccountPage from '../Accounting/Loadable';
import Payroll from '../Payroll';
import CrmApp from '../Crm/Loadable';
import CalendarPage from '../CalendarPage/Loadable';
import LMSApp from '../LMS/Loadable';
import ProjectManagementModule from '../ProjectManagement/Loadable';
import WorkflowModule from '../Workflow/Loadable';

// import { messaging } from '../../utils/firebase-notification';

import Auth from './Auth';

const App = props => (
  <div>
    <AppContext.Provider value={{ sideBarconfig }}>
      <div>
        <Helmet titleTemplate="%s - Ezone" defaultTitle="Ezone">
          <meta name="description" content="An ERP Solutions" />
        </Helmet>

        <Auth>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/register" component={Registration} />

            <Layout3>
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/calendar" component={CalendarPage} />
              <PrivateRoute
                exact
                path="/organization"
                component={organizationPage}
              />
              <PrivateRoute exact path="/users" component={Employees} />
              <PrivateRoute path="/roles" component={RoleRightsApp} />
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
              <PrivateRoute path="/task-manager/task" component={TasksPage} />
              <PrivateRoute
                exact
                path="/file-manager/folders"
                component={FilesApp}
              />
              <PrivateRoute path="/file-manager/folder" component={FilesApp} />
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
              <PrivateRoute
                path="/settings/email/password/template"
                component={EmailPasswordTemplate}
              />

              <PrivateRoute
                path="/project-manager"
                component={ProjectManagementModule}
              />

              <PrivateRoute path="/lms" component={LMSApp} />

              <PrivateRoute path="/workflow" component={WorkflowModule} />

              <PrivateRoute
                exact
                path="/work-order"
                component={WorkOrderPage}
              />

              <PrivateRoute
                exact
                path="/human-resource/leave-management/:page?/:pageId?"
                component={LeaveManagementPage}
              />
              <PrivateRoute
                path="/human-resource/performance"
                component={PerformancePage}
              />

              <PrivateRoute path="/human-resource/attendance" component={AttendancePage} />
              <PrivateRoute path="/hr" component={HRPage} />

              <PrivateRoute
                exact
                path="/hr/:section?/:status?/applicant/:applicantId?"
                component={HRPage}
              />

              <PrivateRoute path="/account" component={AccountPage} />

              <PrivateRoute path="/payroll" component={Payroll} />

              <PrivateRoute path="/inventory" component={InventoryPage} />

              <PrivateRoute path="/crm" component={CrmApp} />
            </Layout3>
            <Route path="" component={NotFoundPage} />
          </Switch>
        </Auth>
      </div>
    </AppContext.Provider>
  </div>
);

export default compose(memo)(App);
