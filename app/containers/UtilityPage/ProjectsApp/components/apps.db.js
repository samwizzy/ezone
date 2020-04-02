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
  { id: 4, name: 'CRM', url: '/cms', icon: CRMIcon },
  { id: 5, name: 'Budgeting', url: '/budgeting', icon: BudgetingIcon },
  { id: 6, name: 'Task management', url: '/dashboard/tasks', icon: TaskIcon },
  {
    id: 7,
    name: 'Fiie and Document sharing',
    url: '/dashboard/folders',
    icon: FileIcon,
  },
  { id: 8, name: 'Projects', url: '/dashboard', icon: ProjectsIcon },
];

export default apps;
