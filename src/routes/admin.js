import {
  Dashboard,


  Journal,
  CreateJournal,
  DetailJournal,
  BeginingBalance,



  BankAccount,
  CreateBankAccount,
  DetailBankAccount,
  BankTransactions,
  CreateBankTransaction,
  DetailBankTransaction,
  ImportBankStatement,




  CustomerInvoice,
  CreateCustomerInvoice,
  DetailCustomerInvoice,
  Receipt,
  CreateReceipt,
  DetailReceipt,



  SupplierInvoice,
  CreateSupplierInvoice,
  DetailSupplierInvoice,
  Expense,
  CreateExpense,
  DetailExpense,
  Payment,
  CreatePayment,
  DetailPayment,



  VatTransactions,
  ReportsFiling,



  TransactionsReport,
  FinancialReport,



  ChartAccount,
  CreateChartAccount,
  DetailChartAccount,
  Contact,
  CreateContact,
  DetailContact,
  Employee,
  CreateEmployee,
  DetailEmployee,



  Product,
  Categories,
  CreateCategories,
  Order,
  Analytics,
  Reports,
  Coupons,
  Queries,
  Feedbacks,
  Webhooks,
  WebhookLogs,


  CreateProduct,
  DetailProduct,
  Project,
  CreateProject,
  DetailProject,
  VatCode,
  CreateVatCode,
  DetailVatCode,
  Currency,
  CreateCurrency,
  DetailCurrency,



  User,
  CreateUser,
  DetailUser,
  Organization,


  Profile,
  GeneralSettings,
  TransactionCategory,
  CreateTransactionCategory,
  DetailTransactionCategory,
  UsersRoles,
  Notification,
  DataBackup,
  Help,
  Faq
  
} from 'screens'

const adminRoutes = [
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: Dashboard.screen
  },

  {
    path: '/admin/product/all/create',
    name: 'Product',
    component: CreateProduct.screen
  },
  {
    path: '/admin/product/all',
    name: 'Product',
    component: Product.screen
  },
  {
    path: '/admin/product/categories/create',
    name: 'Categories',
    component: CreateCategories.screen
  },
  {
    path: '/admin/product/categories',
    name: 'Categories',
    component: Categories.screen
  },

  {
    path: '/admin/orders',
    name: 'Order',
    component: Order.screen
  },

  {
    path: '/admin/analytics/all',
    name: 'Product',
    component: Analytics.screen
  },
  {
    path: '/admin/analytics/reports',
    name: 'Categories',
    component: Reports.screen
  },

  {
    path: '/admin/coupons',
    name: 'Coupons',
    component: Coupons.screen
  },


  {
    path: '/admin/queries',
    name: 'Queries',
    component: Queries.screen
  },
  {
    path: '/admin/feedback',
    name: 'Feedbacks',
    component: Feedbacks.screen
  },

  {
    path: '/admin/developer/webhooks',
    name: 'Weebhooks',
    component: Webhooks.screen
  },


  {
    path: '/admin/developer/webhook-logs',
    name: 'WeebhookLogs',
    component: WebhookLogs.screen
  },


  {
    path: '/admin/developer/user',
    name: 'User',
    component: User.screen
  },


  {
    path: '/admin/settings/user/create',
    name: 'Create',
    component: CreateUser.screen
  },
  {
    path: '/admin/settings/user/detail',
    name: 'Detail',
    component: DetailUser.screen
  },
  {
    path: '/admin/settings/user',
    name: 'User',
    component: User.screen
  },
  {
    path: '/admin/settings/organization',
    name: 'Organization',
    component: Organization.screen
  },




  {
    path: '/admin/settings/general',
    name: 'General Settings',
    component: GeneralSettings.screen
  },
  {
    path: '/admin/settings/transaction-category/create',
    name: 'Create',
    component: CreateTransactionCategory.screen
  },
  {
    path: '/admin/settings/transaction-category/detail',
    name: 'Detail',
    component: DetailTransactionCategory.screen
  },
  {
    path: '/admin/settings/transaction-category',
    name: 'Transaction Category',
    component: TransactionCategory.screen
  },
  {
    path: '/admin/settings/user-role',
    name: 'Users & Roles',
    component: UsersRoles.screen
  },
  {
    path: '/admin/settings/notification',
    name: 'Notifications',
    component: Notification.screen
  },
  {
    path: '/admin/settings/data-backup',
    name: 'Data Backup',
    component: DataBackup.screen
  },
  {
    path: '/admin/settings/help/Faq',
    name: 'Faq',
    component: Faq.screen
  },
  {
    path: '/admin/settings/help',
    name: 'Help',
    component: Help.screen
  },
  {
    redirect: true,
    path: '/admin/settings',
    pathTo: '/admin/settings/user',
    name: 'Settings'
  },





  


  {
    path: '/admin/profile',
    name: 'Profile',
    component: Profile.screen
  },



  {
    redirect: true,
    path: '/admin',
    pathTo: '/admin/dashboard',
    name: 'Admin'
  }
]

export default adminRoutes