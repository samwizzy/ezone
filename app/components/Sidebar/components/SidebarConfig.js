const SidebarConfig = [
  {
    module: ['home'],
    menus: [
      { id: 1, name: 'Home', url: '/', icon: 'home' },
      { id: 2, name: 'Dashboard', url: '/dashboard', icon: 'build' },
    ],
  },
  {
    module: ['dashboard', 'folders', 'tasks'],
    menus: [
      { id: 1, name: 'Home', url: '/', icon: 'home' },
      { id: 2, name: 'Dashboard', url: '/dashboard', icon: 'build' },
      { id: 3, name: 'Organization', url: '/organization', icon: 'business_center' },
    ],
  },
  {
    module: ['employees', 'users', 'user', 'organization', 'work-order', 'email', 'profile', 'settings', 'user-profile'],
    menus: [
      { id: 1, name: 'Dashboard', url: '/dashboard', icon: 'dashboard' },
      { id: 2, name: 'Organization', url: '/organization', icon: 'business_center' },
      { id: 3, name: 'Applications', url: '/home', icon: 'apps' },
      { id: 4, name: 'Employees', url: '/users/employees', icon: 'group' },
      { id: 5, name: 'User Profile', url: '/user-profile', icon: 'person' },
      { id: 6, name: 'Work Order', url: '/work-order', icon: 'list_alt' },
      { id: 7, name: 'Security', url: '/security', icon: 'security' },
      { id: 8, name: 'Settings', url: '/settings/email', icon: 'settings' },
    ],
  },
  {
    module: ['hr'],
    menus: [
      { id: 1, name: 'Dashboard', url: '/hr/employee', icon: 'dashboard' },
      { id: 2, name: 'Organization', url: '/hr/employee', icon: 'business_center' },
      { id: 3, name: 'Recruitment',  url: '/hr/recruitment', icon: 'find_in_page' },
      { id: 4, name: 'Attendance', url: '/hr/attendance', icon: 'person' },
      { id: 5, name: 'Payroll', url: '/hr/payroll', icon: 'payment' },
      { id: 6, name: 'Announcements', url: '/hr/announcement', icon: 'announcement' },
      { id: 7, name: 'Performance', url: '/hr/performance', icon: 'local_activity' },
    ],
  },
  {
    module: ['account', 'budgeting'],
    menus: [
      { id: 1, name: 'Dashboard', url: '/account', icon: 'dashboard' },
      { id: 2, name: 'Chart of Account', url: '/account/chart', icon: 'account_tree' },
      { id: 3, name: 'Journal', url: '/account/journal', icon: 'menu_book' },
      { id: 4, name: 'Banking', url: '/account/banking', icon: 'group' },
      { id: 4, name: 'Budgeting', url: '/account/budgeting', icon: 'account_balance_wallet' },
      { id: 5, name: 'Settings', url: '/account/settings', icon: 'settings' },
    ],
  },
  {
    module: ['crm'],
    menus: [
      { id: 1, name: 'Dashboard', url: '/crm/dashboard', icon: 'dashboard' },
      { id: 2, name: 'Contacts', url: '/crm/contacts', icon: 'business_center' },
      { id: 3, name: 'Companies', url: '/crm/companies', icon: 'find_in_page' },
      { id: 4, name: 'Activities', url: '/crm/activities', icon: 'person' },
      { id: 5, name: 'Schedules', url: '/crm/schedules', icon: 'payment' },
      { id: 6, name: 'Contact Groups', url: '/crm/contact-groups', icon: 'announcement' },
      { id: 7, name: 'Reports', url: '/crm/reports', icon: 'local_activity' },
      { id: 8, name: 'Campaign', url: '/crm/campaign', icon: 'local_activity' },
      { id: 9, name: 'Social Media', url: '/crm/social-media', icon: 'local_activity' },
    ],
  },
  {
    module: ['inventory'],
    menus: [
      { id: 1, name: 'Dashboard', url: '/inventory/dashboard', icon: 'dashboard' },
      { id: 2, name: 'Warehouses', url: '/inventory/warehouses', icon: 'dashboard' },
      { id: 3, name: 'Items', url: '/inventory/items', icon: 'business_center' },
      { id: 4, name: 'Transfer Orders', url: '/inventory/transfer/orders', icon: 'find_in_page' },
      { id: 5, name: 'Investment Adjustment', url: '/inventory/adjustments', icon: 'person' },
    ],
  },
];

export default SidebarConfig;
