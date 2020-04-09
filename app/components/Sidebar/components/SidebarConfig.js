const SidebarConfig = [
  {
    module: 'main',
    menus: [
      { id: 1, name: 'Home', url: '/', icon: 'home' },
      { id: 2, name: 'Dashboard', url: '/dashboard', icon: 'build' },
    ],
  },
  {
    module: 'home',
    menus: [
      { id: 1, name: 'Home', url: '/', icon: 'home' },
      { id: 2, name: 'Dashboard', url: '/dashboard', icon: 'build' },
    ],
  },
  {
    module: 'company',
    menus: [
      { id: 1, name: 'Dashboard', url: '/dashboard', icon: 'dashboard' },
      { id: 2, name: 'Organization', url: '/organization', icon: 'business_center' },
      { id: 3, name: 'Applications', url: '/utility', icon: 'apps' },
      { id: 4, name: 'Employees', url: '/users/employees', icon: 'group' },
      { id: 5, name: 'User Profile', url: '/users/profile', icon: 'person' },
      { id: 6, name: 'WorkOrder', url: '/workorder', icon: 'list_alt' },
      { id: 7, name: 'Security', url: '/email', icon: 'security' },
      { id: 8, name: 'Settings', url: '/dashboard', icon: 'settings' },
    ],
  },
  {
    module: 'utility',
    menus: [
      { id: 1, name: 'Dashboard', url: '/dashboard', icon: 'dashboard' },
      { id: 2, name: 'Organization',
        url: '/organization',
        icon: 'business_center',
      },
      { id: 3, name: 'Applications', url: '/utility', icon: 'apps' },
      { id: 4, name: 'Employees', url: '/users/employees', icon: 'group' },
      { id: 5, name: 'User Profile', url: '/users/profile', icon: 'person' },
      { id: 6, name: 'WorkOrder', url: '/workorder', icon: 'list_alt' },
      { id: 7, name: 'Security', url: '/email', icon: 'security' },
      { id: 8, name: 'Settings', url: '/dashboard', icon: 'settings' },
    ],
  },
  {
    module: 'hr',
    menus: [
      { id: 1, name: 'Dashboard', url: '/hr/employee', icon: 'dashboard' },
      { id: 2, name: 'Organization', url: '/hr/employee', icon: 'business_center'},
      { id: 3, name: 'Recruitment', url: '/hr/recruitment', icon: 'find_in_page' },
      { id: 4, name: 'Attendance', url: '/hr/attendance', icon: 'person' },
      { id: 5, name: 'Payroll', url: '/hr/payroll', icon: 'payment' },
      { id: 6, name: 'Announcements', url: '/hr/announcement', icon: 'announcement' },
      { id: 7, name: 'Performance', url: '/hr/performance', icon: 'local_activity' },
    ],
  },
  {
    module: 'accounting',
    menus: [
      { id: 1, name: 'Dashboard', url: '/account', icon: 'dashboard' },
      {
        id: 2,
        name: 'Chart of Account',
        url: '/account',
        icon: 'account_tree',
      },
      { id: 3, name: 'Journal', url: '/account', icon: 'menu_book' },
      { id: 4, name: 'Groups', url: '/account', icon: 'group' },
    ],
  },
  {
    module: 'profile',
    menus: [
      { id: 1, name: 'Dashboard', url: '/crm/employee', icon: 'dashboard' },
      { id: 2, name: 'Organisation', url: '/crm/employee', icon: 'business_center'},
      { id: 3, name: 'Applications', url: '/crm/recruitment', icon: 'find_in_page' },
      { id: 4, name: 'Employees', url: '/crm/attendance', icon: 'person' },
      { id: 5, name: 'Groups', url: '/crm/payroll', icon: 'group' },
    ],
  },
  {
    module: 'crm',
    menus: [
      { id: 1, name: 'Dashboard', url: '/crm/employee', icon: 'dashboard' },
      { id: 2, name: 'Contacts', url: '/crm/employee', icon: 'business_center'},
      { id: 3, name: 'Companies', url: '/crm/recruitment', icon: 'find_in_page' },
      { id: 4, name: 'Activities', url: '/crm/attendance', icon: 'person' },
      { id: 5, name: 'Schedules', url: '/crm/payroll', icon: 'payment' },
      { id: 6, name: 'Contact Groups', url: '/crm/announcement', icon: 'announcement' },
      { id: 7, name: 'Reports', url: '/crm/performance', icon: 'local_activity' },
    ],
  },
];

export default SidebarConfig;
