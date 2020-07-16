const SidebarConfig = [
  {
    module: ['home'],
    menus: [
      { id: 1, name: 'Home', url: '/', icon: 'home' },
      { id: 2, name: 'Dashboard', url: '/dashboard', icon: 'build' },
    ],
  },
  {
    module: ['payroll'],
    menus: [
      { id: 1, name: 'Home', url: '/', icon: 'home' },
      { id: 2, name: 'Dashboard', url: '/dashboard', icon: 'build' },
    ],
  },
  {
    module: ['utility', 'folders', 'tasks'],
    menus: [
      { id: 1, name: 'Home', url: '/', icon: 'home' },
      { id: 2, name: 'Dashboard', url: '/dashboard', icon: 'build' },
    ],
  },
  {
    module: [
      'dashboard',
      'employees',
      'users',
      'user',
      'organization',
      'work-order',
      'email',
      'profile',
      'settings',
      'user-profile',
    ],
    menus: [
      { id: 1, name: 'Dashboard', url: '/dashboard', icon: 'dashboard' },
      {
        id: 2,
        name: 'Organization',
        url: '/organization',
        icon: 'business_center',
      },
      { id: 3, name: 'Applications', url: '/home', icon: 'apps' },
      { id: 4, name: 'Employees', url: '/users', icon: 'group' },
      { id: 5, name: 'User Profile', url: '/user-profile', icon: 'person' },
      { id: 6, name: 'Work Order', url: '/work-order', icon: 'list_alt' },
      { id: 7, name: 'Security', url: '/security', icon: 'security' },
      { id: 8, name: 'Settings', url: '/settings/email', icon: 'settings' },
    ],
  },
  {
    module: ['hr', 'human-resource'],
    menus: [
      { id: 1, name: 'Dashboard', url: '/hr/dashboard', icon: 'dashboard' },
      {
        id: 2,
        name: 'Organization',
        url: '/hr/employees',
        icon: 'business_center',
      },
      {
        id: 3,
        name: 'Recruitment',
        url: '/hr/recruitment',
        icon: 'find_in_page',
      },
      {
        id: 4,
        name: 'Attendance',
        url: '/human-resource/attendance',
        icon: 'person',
      },
      {
        id: 6,
        name: 'Announcements',
        url: '/hr/announcement',
        icon: 'announcement',
      },
      {
        id: 7,
        name: 'Performance',
        url: '/human-resource/performance/goals',
        icon: 'thumb_up',
      },
      {
        id: 7,
        name: 'Leave Management',
        url: '/human-resource/leave-management/leave-request',
        icon: 'single_bed',
      },
    ],
  },
  {
    module: [
      'account',
      'budgeting',
      'reports',
      'fixedassets',
      'charts',
    ],
    menus: [
      { id: 1, name: 'Dashboard', url: '/account', icon: 'dashboard' },
      {
        id: 2,
        name: 'Chart of Account',
        url: '/account/charts',
        icon: 'account_tree',
      },
      { id: 3, name: 'Journal', url: '/account/journal', icon: 'menu_book' },
      {
        id: 4,
        name: 'Fixed Assets',
        url: '/account/fixedassets',
        icon: 'label',
      },
      { id: 5, name: 'Banking', url: '/account/banking', icon: 'group' },
      { id: 6, name: 'Reports', url: '/account/reports', icon: 'label' },
       { id: 7, name: 'Budgeting', url: '/account/budgeting', icon: 'account_balance_wallet' },
      { id: 8, name: 'Settings', url: '/account/settings', icon: 'settings' },
    ],
  },
  {
    module: ['crm'],
    menus: [
      { id: 1, name: 'Dashboard', url: '/crm/dashboard', icon: 'dashboard' },
      {
        id: 2,
        name: 'Contacts',
        url: '/crm/contacts',
        icon: 'business_center',
      },
      { id: 3, name: 'Companies', url: '/crm/companies', icon: 'find_in_page' },
      { id: 4, name: 'Activities', url: '/crm/activities', icon: 'person' },
      { id: 5, name: 'Schedules', url: '/crm/schedules', icon: 'payment' },
      {
        id: 6,
        name: 'Contact Groups',
        url: '/crm/contact-groups',
        icon: 'announcement',
      },
      { id: 7, name: 'Reports', url: '/crm/reports', icon: 'local_activity' },
      {
        id: 8,
        name: 'Campaigns',
        url: '/crm/campaigns',
        icon: 'local_activity',
      },
      {
        id: 9,
        name: 'Social Media',
        url: '/crm/social-media',
        icon: 'local_activity',
      },
      {
        id: 10,
        name: 'Leads',
        url: '#',
        icon: 'local_activity',
        submenus: [
          { id: 1, name: 'Leads', url: '/crm/leads', icon: 'local_activity' },
          {
            id: 1,
            name: 'Lead Sources',
            url: '/crm/leads/sources',
            icon: 'local_activity',
          },
          {
            id: 2,
            name: 'Lead Tags',
            url: '/crm/leads/tags',
            icon: 'local_activity',
          },
          {
            id: 3,
            name: 'Lead Stages',
            url: '/crm/leads/stages',
            icon: 'local_activity',
          },
        ],
      },
    ],
  },
  {
    module: ['lms'],
    menus: [
      { id: 1, name: 'Dashboard', url: '/lms/dashboard', icon: 'dashboard' },
      {
        id: 2,
        name: 'Account & Settings',
        url: '/lms/account-settings',
        icon: 'settings',
      },
      {
        id: 3,
        name: 'Integration',
        url: '/lms/integration',
        icon: 'business_center',
      },
      { id: 4, name: 'Messages', url: '/lms/messages', icon: 'find_in_page' },
      {
        id: 5,
        name: 'File Library',
        url: '/lms/file-library',
        icon: 'library_books',
      },
      { id: 6, name: 'Users', url: '/lms/users', icon: 'person' },
      {
        id: 7,
        name: 'Manage Courses',
        url: '/lms/manage-courses',
        icon: 'library_books',
      },
      {
        id: 8,
        name: 'Virtual Classrooms',
        url: '/lms/virtual-classrooms',
        icon: 'person',
      },
      { id: 9, name: 'Quizzes', url: '/lms/quizzes', icon: 'person' },
      { id: 10, name: 'Attendance', url: '/lms/attendance', icon: 'person' },
    ],
  },
  {
    module: ['inventory','sales','purchase'],
    menus: [
      {
        id: 1,
        name: 'Inventory',
        url: '/inventory/dashboard',
        icon: 'label',
        submenus: [
          { id: 1, name: 'Dashboard', url: '/inventory/dashboard', icon: 'dashboard' },
          { id: 2, name: 'Warehouses', url: '/inventory/warehouses', icon: 'storage' },
          { id: 3, name: 'Items', url: '/inventory/items', icon: 'label' },
          //{ id: 4, name: 'Items Groups', url: '/inventory/items-groups', icon: 'group_work' },
          { id: 5, name: 'Transfer Orders', url: '/inventory/transfer/orders', icon: 'transfer_within_a_station' },
          { id: 6, name: 'Investment Adjustment', url: '/inventory/adjustments', icon: 'equalizer' },
         // { id: 7, name: 'Reports', url: '/inventory/reports', icon: 'assessment' }
        ],
      },

      {
        id: 2,
        name: 'Sales',
        url: '/sales',
        icon: 'label',
        submenus: [
          { id: 1, name: 'Sales Order', url: '/sales/salesorder', icon: 'label' },
          { id: 2, name: 'Invoice', url: '/sales/invoices', icon: 'label' },
        //  { id: 3, name: 'Receipts', url: '/sales/receipts', icon: 'label' },
        ],
      },
      {
        id: 3, name: 'Purchase', url: '/purchase', icon: 'label', submenus: [
          { id: 1, name: 'Purchase Order', url: '/purchase/purchaseorder', icon: 'label' },
         // { id: 2, name: 'Bills', url: '/purchase/bills', icon: 'label' },
         // { id: 3, name: 'Purchase made', url: '/purchase/purchasemade', icon: 'label' }
        ]
      },
      
    ],
  },
];

export default SidebarConfig;
