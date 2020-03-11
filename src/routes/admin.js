import {
  Dashboard,

  ProductSort,
  CateogrySort,

  Product,
  CreateProduct,
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
} from 'screens'
import { BlackList, CreateBlacklist, EditBlacklist } from '../screens'

const adminRoutes = [
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: Dashboard.screen
  },

  {
    path: '/admin/product/all/create',
    name: 'New',
    component: CreateProduct.screen
  },
  {
    path: '/admin/product/all/edit',
    name: 'Edit',
    component: EditProduct.screen
  },
  {
    path: '/admin/product/all',
    name: 'Products',
    component: Product.screen
  },
  {
    path: '/admin/product/categories/edit',
    name: 'Edit',
    component: EditCategory.screen
  },
  {
    path: '/admin/product/categories/create',
    name: 'New',
    component: CreateCategories.screen
  },
  {
    path: '/admin/product/categories',
    name: 'Categories',
    component: Categories.screen
  },

  {
    path: '/admin/product/product-sort',
    name: 'Product Sort',
    component: ProductSort.screen
  },

  {
    path: '/admin/product/category-sort',
    name: 'Cateogry Sort',
    component: CateogrySort.screen
  },

  {
    path: '/admin/orders/detail',
    name: 'Detail',
    component: OrderDetail.screen
  },

  {
    path: '/admin/orders',
    name: 'Orders',
    component: Order.screen
  },

  {
    path: '/admin/analytics/all',
    name: 'Analytics',
    component: Analytics.screen
  },
  {
    path: '/admin/analytics/reports',
    name: 'Reports',
    component: Reports.screen
  },

  {
    path: '/admin/coupons/create',
    name: 'New',
    component: CreateCoupon.screen
  },

  {
    path: '/admin/coupons',
    name: 'Coupons',
    component: Coupons.screen
  },

  {
    path: '/admin/blacklist/create',
    name: 'New',
    component: CreateBlacklist.screen
  },
  {
    path: '/admin/blacklist/edit/:id',
    name: 'EditBlacklist',
    component: EditBlacklist.screen
  },
  {
    path: '/admin/blacklist',
    name: 'Blacklist',
    component: BlackList.screen
  },
  

  {
    path: '/admin/queries',
    name: 'Queries',
    component: Queries.screen
  },
  {
    path: '/admin/feedback',
    name: 'Feedback',
    component: Feedbacks.screen
  },

  {
    path: '/admin/pages/create',
    name: 'New',
    component: CreatePage.screen
  },

  {
    path: '/admin/pages',
    name: 'Pages',
    component: Pages.screen
  },

  {
    path: '/admin/developer/webhooks',
    name: 'Weebhooks',
    component: Webhooks.screen
  },

  {
    path: '/admin/developer/webhook-logs',
    name: 'Weebhook Logs',
    component: WebhookLogs.screen
  },

  {
    redirect: true,
    path: '/admin',
    pathTo: '/admin/dashboard',
  },
  { path: '/', exact: true, name: 'Home' },
]

export default adminRoutes