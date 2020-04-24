// 1. Accounting Management
// 2. Warehouse/Store Management
// 3. Inventory Management
// 4. Financial Management
// 5. Manufacturing
// 6. Budgeting and Expense Monitoring
// 7. Purchasing
// 8. Sales Management
// 9. HR Management
// 10. CRM
// 11. Dashboard
// 12. Distribution Management
// 13. Enterprise Asset Management
// 14. Project Management
// 15. Workorder
// 16. Task Manager
// 17. Files and Document Managent
// 18. Chats (text, Voice, videos)
// 19. Issues and Escalation management

import AppIcon1 from '../../../../images/app-2.svg';
import AcctIcon from '../../../../images/acctIcon.svg';
import StoreIcon from '../../../../images/storeIcon.svg';
import CRMIcon from '../../../../images/crmIcon.svg';
import FileIcon from '../../../../images/FileIcon.svg';
import BudgetingIcon from '../../../../images/BudgetingIcon.svg';
import TaskIcon from '../../../../images/TaskIcon.svg';
import ProjectsIcon from '../../../../images/ProjectsIcon.svg';

const apps = [
  { id: 1, name: 'Home', url: '/home', icon: ProjectsIcon },
  { id: 2, name: 'Accounting', url: '/account', icon: AcctIcon },
  { id: 3, name: 'Budgeting', url: '/account/budgeting', icon: BudgetingIcon },
  { id: 4, name: 'CRM', url: '/crm', icon: CRMIcon },
  { id: 5, name: 'File Management', url: '/dashboard/folders', icon: FileIcon },
  { id: 6, name: 'Human Resources', url: '/hr', icon: AppIcon1 },
  { id: 7, name: 'Process Workflow', url: '/workflow', icon: ProjectsIcon },
  { id: 8, name: 'Store Management', url: '/inventory/items', icon: StoreIcon},
  { id: 9, name: 'Task management', url: '/dashboard/tasks', icon: TaskIcon },
  { id: 10, name: 'Work Order', url: '/workorder', icon: ProjectsIcon },
];

export default apps;
