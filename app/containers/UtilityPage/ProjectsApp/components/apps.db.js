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
    name: 'Fiie and Document sharing',
    url: '/dashboard/files',
    icon: FileIcon,
  },
  { id: 4, name: 'Projects', url: '/', icon: ProjectsIcon },
  {
    id: 5,
    name: 'Store & Inventory Management',
    url: '/items',
    icon: StoreIcon,
  },
  { id: 6, name: 'CRM', url: '', icon: CRMIcon },
  { id: 7, name: 'Budgeting', url: '', icon: BudgetingIcon },
  { id: 8, name: 'Task management', url: '/dashboard/tasks', icon: TaskIcon },
  { id: 9, name: 'Projects', url: '', icon: ProjectsIcon },
];

export default apps;
