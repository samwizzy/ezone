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
import LmsIcon from '../../../../images/lms.svg';
import ProjectsIcon from '../../../../images/ProjectsIcon.svg';
import ChatIcon from '../../../../images/chatIcon.svg';
import ChatIcon2 from '../../../../images/chatIcon2.svg';

const apps = [
  { id: 1, name: 'Home', url: '/home', icon: ProjectsIcon, img: 'home' },
  { id: 2, name: 'Accounting', url: '/account', icon: AcctIcon, img: 'account_tree' },
  { id: 3, name: 'Budgeting', url: '/account/budgeting', icon: BudgetingIcon, img: 'menu_book' },
  { id: 4, name: 'Chat', url: '/chats', icon: ChatIcon, img: 'chat' },
  { id: 5, name: 'CRM', url: '/crm', icon: CRMIcon, img: 'contacts' },
  { id: 6, name: 'LMS', url: '/home', icon: StoreIcon, img: 'store' },
  { id: 7, name: 'File Management', url: '/file-manager/folders', icon: FileIcon, img: 'folder_open' },
  { id: 8, name: 'Human Resources', url: '/hr/dashboard', icon: AppIcon1, img: 'person' },
  { id: 9, name: 'Process Workflow', url: '/workflow', icon: ProjectsIcon, img: 'all_inclusive' },
  { id: 10, name: 'Store Management', url: '/inventory/dashboard', icon: StoreIcon, img: 'store' },
  { id: 11, name: 'Task management', url: '/task-manager/tasks', icon: TaskIcon, img: 'list_alt' },
  { id: 12, name: 'Work Order', url: '/work-order', icon: ProjectsIcon, img: 'ballot' },
];

export default apps;
