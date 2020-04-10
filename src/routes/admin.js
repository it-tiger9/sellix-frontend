import {
  Dashboard,
  ProductSort,
  CateogrySort,
  Product,
  EditProduct,
  Categories,
  CreateCategories,
  EditCategory,
  Order,
  Analytics,
  Reports,
  Coupons,
  CreateCoupon,
  Queries,
  Feedbacks,
  Webhooks,
  WebhookLogs,
  CreatePage,
  Pages,
  CreateProduct,
  OrderDetail,
  ReplyToQuerie,
  AdminDashboard
} from 'screens'
import { BlackList, CreateBlacklist, EditBlacklist, EditCoupon, ReplyToFeedback } from '../screens'


const user = window.localStorage.getItem('userId')

const adminRoutes = [

  {
    path: `/admin/dashboard`,
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path: `/dashboard/home`,
    name: 'Dashboard',
    component: Dashboard.screen
  },

  {
    path: `/dashboard/products/all/new`,
    name: 'New',
    component: CreateProduct.screen
  },
  {
    path: `/dashboard/products/all/edit/:id`,
    name: 'Edit',
    component: EditProduct.screen
  },

  {
    path: `/dashboard/products/sort-products`,
    name: 'Product Sort',
    component: ProductSort.screen
  },
  {
    path: `/dashboard/products/sort-categories`,
    name: 'Cateogry Sort',
    exact: true,
    component: CateogrySort.screen
  },


  {
    path: `/dashboard/products/categories/edit/:id`,
    name: 'Edit',
    component: EditCategory.screen
  },
  {
    path: `/dashboard/products/categories/new`,
    name: 'New',
    component: CreateCategories.screen
  },

  {
    path: `/dashboard/products/categories`,
    name: 'Categories',
    component: Categories.screen
  },

  {
    path: `/dashboard/products/all`,
    name: 'Products',
    exact: true,
    component: Product.screen
  },
 

  {
    path: `/dashboard/orders/detail/:id`,
    name: 'Detail',
    component: OrderDetail.screen
  },

  {
    path: `/dashboard/orders`,
    name: 'Orders',
    component: Order.screen
  },


  {
    path: `/dashboard/analytics/reports`,
    name: 'Reports',
    component: Reports.screen
  },
  {
    path: `/dashboard/analytics/all`,
    name: 'Analytics',
    component: Analytics.screen
  },


  {
    path: `/dashboard/coupons/new`,
    name: 'New',
    component: CreateCoupon.screen
  },
  {
    path: `/dashboard/coupons/edit/:id`,
    name: 'EditCoupon',
    component: EditCoupon.screen
  },
  {
    path: `/dashboard/coupons`,
    name: 'Coupons',
    component: Coupons.screen
  },

  {
    path: `/dashboard/blacklist/new`,
    name: 'New',
    component: CreateBlacklist.screen
  },
  {
    path: `/dashboard/blacklist/edit/:id`,
    name: 'EditBlacklist',
    component: EditBlacklist.screen
  },
  {
    path: `/dashboard/blacklist`,
    name: 'Blacklist',
    component: BlackList.screen
  },
  

  {
    path: `/dashboard/queries`,
    name: 'Queries',
    component: Queries.screen
  },
  {
    path: `/dashboard/querie/reply/:id`,
    name: 'Reply to Querie',
    component: ReplyToQuerie
  },
  

  {
    path: `/dashboard/feedback/reply/:id`,
    name: 'Reply to Feedback',
    component: ReplyToFeedback
  },

  {
    path: `/dashboard/feedback`,
    name: 'Feedback',
    component: Feedbacks.screen
  },

  {
    path: `/dashboard/pages/new`,
    name: 'New',
    component: CreatePage.screen
  },

  {
    path: `/dashboard/pages`,
    name: 'Pages',
    component: Pages.screen
  },

  {
    path: `/dashboard/developer/webhooks`,
    name: 'Weebhooks',
    component: Webhooks.screen
  },

  {
    path: `/dashboard/developer/webhook-logos`,
    name: 'Weebhook Logs',
    component: WebhookLogs.screen
  },

  {
    redirect: true,
    path: `/dashboard`,
    pathTo: `/dashboard/home`,
  },

  
]

export default adminRoutes