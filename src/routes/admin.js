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
    path: `/dashboard/${user}/home`,
    name: 'Dashboard',
    component: Dashboard.screen
  },

  {
    path: `/dashboard/${user}/products/all/new`,
    name: 'New',
    component: CreateProduct.screen
  },
  {
    path: `/dashboard/${user}/products/all/edit/:id`,
    name: 'Edit',
    component: EditProduct.screen
  },

  {
    path: `/dashboard/${user}/products/sort-products`,
    name: 'Product Sort',
    component: ProductSort.screen
  },
  {
    path: `/dashboard/${user}/products/sort-categories`,
    name: 'Cateogry Sort',
    exact: true,
    component: CateogrySort.screen
  },


  {
    path: `/dashboard/${user}/products/categories/edit/:id`,
    name: 'Edit',
    component: EditCategory.screen
  },
  {
    path: `/dashboard/${user}/products/categories/new`,
    name: 'New',
    component: CreateCategories.screen
  },

  {
    path: `/dashboard/${user}/products/categories`,
    name: 'Categories',
    component: Categories.screen
  },

  {
    path: `/dashboard/${user}/products`,
    name: 'Products',
    exact: true,
    component: Product.screen
  },
 

  {
    path: `/dashboard/${user}/orders/view/:id`,
    name: 'Detail',
    component: OrderDetail.screen
  },

  {
    path: `/dashboard/${user}/orders`,
    name: 'Orders',
    component: Order.screen
  },


  {
    path: `/dashboard/${user}/analytics/reports`,
    name: 'Reports',
    component: Reports.screen
  },
  {
    path: `/dashboard/${user}/analytics/stats`,
    name: 'Analytics',
    component: Analytics.screen
  },


  {
    path: `/dashboard/${user}/coupons/new`,
    name: 'New',
    component: CreateCoupon.screen
  },
  {
    path: `/dashboard/${user}/coupons/edit/:id`,
    name: 'EditCoupon',
    component: EditCoupon.screen
  },
  {
    path: `/dashboard/${user}/coupons`,
    name: 'Coupons',
    component: Coupons.screen
  },

  {
    path: `/dashboard/${user}/blacklist/new`,
    name: 'New',
    component: CreateBlacklist.screen
  },
  {
    path: `/dashboard/${user}/blacklist/edit/:id`,
    name: 'EditBlacklist',
    component: EditBlacklist.screen
  },
  {
    path: `/dashboard/${user}/blacklist`,
    name: 'Blacklist',
    component: BlackList.screen
  },
  

  {
    path: `/dashboard/${user}/queries`,
    name: 'Queries',
    component: Queries.screen
  },
  {
    path: `/dashboard/${user}/querie/view/:id`,
    name: 'Reply to Querie',
    component: ReplyToQuerie
  },
  

  {
    path: `/dashboard/${user}/feedback/reply/:id`,
    name: 'Reply to Feedback',
    component: ReplyToFeedback
  },

  {
    path: `/dashboard/${user}/feedback`,
    name: 'Feedback',
    component: Feedbacks.screen
  },

  {
    path: `/dashboard/${user}/pages/new`,
    name: 'New',
    component: CreatePage.screen
  },

  {
    path: `/dashboard/${user}/pages`,
    name: 'Pages',
    component: Pages.screen
  },

  {
    path: `/dashboard/${user}/developer/webhooks`,
    name: 'Weebhooks',
    component: Webhooks.screen
  },

  {
    path: `/dashboard/${user}/developer/webhook-logos`,
    name: 'Weebhook Logs',
    component: WebhookLogs.screen
  },

  {
    redirect: true,
    path: `/dashboard/${user}`,
    pathTo: `/dashboard/${user}/home`,
  },

  
]

export default adminRoutes