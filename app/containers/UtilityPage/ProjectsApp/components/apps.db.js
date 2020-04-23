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
  { id: 1, name: 'Accounting', url: '/account', icon: AcctIcon },
  { id: 2, name: 'Human Resources', url: '/hr', icon: AppIcon1 },
  {
    id: 3,
    name: 'Store & Inventory Mgt',
    url: '/inventory/items',
    icon: StoreIcon,
  },
  { id: 4, name: 'CRM', url: '/crm', icon: CRMIcon },
  { id: 5, name: 'Budgeting', url: '/account/budgeting', icon: BudgetingIcon },
  { id: 6, name: 'Task management', url: '/dashboard/tasks', icon: TaskIcon },
  {
    id: 7,
    name: 'Fiie and Document sharing',
    url: '/dashboard/folders',
    icon: FileIcon,
  },
  { id: 8, name: 'Dashboard', url: '/dashboard', icon: ProjectsIcon },
  { id: 9, name: 'Chat', url: '/dashboard/chats', icon: ProjectsIcon },
];

export default apps;
