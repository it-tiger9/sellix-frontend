import {
  Dashboard,
  Product,
  ProductSort,
  CateogrySort,
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
  OrderDetail
} from 'screens'
import { BlackList, CreateBlacklist } from '../screens'

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
    path: '/admin/product/categories/edit',
    name: 'Categories',
    component: EditCategory.screen
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
    path: '/admin/product/product-sort',
    name: 'ProductSort',
    component: ProductSort.screen
  },

  {
    path: '/admin/product/category-sort',
    name: 'CateogrySort',
    component: CateogrySort.screen
  },

  {
    path: '/admin/orders/detail',
    name: 'OrderDetail',
    component: OrderDetail.screen
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
    path: '/admin/coupons/create',
    name: 'Coupons',
    component: CreateCoupon.screen
  },

  {
    path: '/admin/coupons',
    name: 'Coupons',
    component: Coupons.screen
  },

  {
    path: '/admin/blacklist/create',
    name: 'CreateBlacklist',
    component: CreateBlacklist.screen
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
    name: 'Feedbacks',
    component: Feedbacks.screen
  },

  {
    path: '/admin/pages/create',
    name: 'Pages',
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
    name: 'WeebhookLogs',
    component: WebhookLogs.screen
  },

  {
    redirect: true,
    path: '/admin',
    pathTo: '/admin/dashboard',
    name: 'Admin'
  }
]

export default adminRoutes