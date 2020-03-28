const SidebarConfig = [
  {
    module: 'main',
    menus: [
      { id: 1, name: 'Home', url: '/', icon: 'home' },
      { id: 2, name: 'Dashboard', url: '/dashboard', icon: 'build' },
    ],
  },
  {
    module: 'utility',
    menus: [
      { id: 1, name: 'Dashboard', url: '/dashboard', icon: 'dashboard' },
      {
        id: 2,
        name: 'Organization',
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
      { id: 1, name: 'Dashboard', url: '/dashboard', icon: 'dashboard' },
      {
        id: 2,
        name: 'Organization',
        url: '/dashboard',
        icon: 'business_center',
      },
      { id: 3, name: 'Recruitment', url: '/utility', icon: 'find_in_page' },
      { id: 4, name: 'Attendance', url: '/users/employees', icon: 'person' },
      { id: 5, name: 'Payroll', url: '/users/profile', icon: 'payment' },
      { id: 6, name: 'Announcements', url: '/workorder', icon: 'announcement' },
      { id: 7, name: 'Performance', url: '/email', icon: 'local_activity' },
    ],
  },
  {
    module: 'accounting',
    menus: [
      { id: 1, name: 'Dashboard', url: '/dashboard', icon: 'dashboard' },
      {
        id: 2,
        name: 'Chart of Account',
        url: '/dashboard',
        icon: 'account_tree',
      },
      { id: 3, name: 'Journal', url: '/utility', icon: 'menu_book' },
    ],
  },
];

export default SidebarConfig;
