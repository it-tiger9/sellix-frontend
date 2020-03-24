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
} from 'screens'
import { BlackList, CreateBlacklist, EditBlacklist, EditCoupon } from '../screens'


const user = window.localStorage.getItem('userId')

const adminRoutes = [
  {
    path: `/${user}/dashboard`,
    name: 'Dashboard',
    component: Dashboard.screen
  },

  {
    path: `/${user}/products/all/new`,
    name: 'New',
    component: CreateProduct.screen
  },
  {
    path: `/${user}/products/all/edit`,
    name: 'Edit',
    component: EditProduct.screen
  },

  {
    path: `/${user}/products/sort-products`,
    name: 'Product Sort',
    component: ProductSort.screen
  },



  {
    path: `/${user}/products/sort-categories`,
    name: 'Cateogry Sort',
    exact: true,
    component: CateogrySort.screen
  },


  {
    path: `/${user}/products/categories/edit`,
    name: 'Edit',
    component: EditCategory.screen
  },
  {
    path: `/${user}/products/categories/new`,
    name: 'New',
    component: CreateCategories.screen
  },

  {
    path: `/${user}/products/categories`,
    name: 'Categories',
    component: Categories.screen
  },

  {
    path: `/${user}/products/all`,
    name: 'Products',
    exact: true,
    component: Product.screen
  },
 

  {
    path: `/${user}/orders/detail`,
    name: 'Detail',
    component: OrderDetail.screen
  },

  {
    path: `/${user}/orders`,
    name: 'Orders',
    component: Order.screen
  },


  {
    path: `/${user}/analytics/reports`,
    name: 'Reports',
    component: Reports.screen
  },
  {
    path: `/${user}/analytics/all`,
    name: 'Analytics',
    component: Analytics.screen
  },


  {
    path: `/${user}/coupons/new`,
    name: 'New',
    component: CreateCoupon.screen
  },
  {
    path: `/${user}/coupons/edit/:id`,
    name: 'EditCoupon',
    component: EditCoupon.screen
  },
  {
    path: `/${user}/coupons`,
    name: 'Coupons',
    component: Coupons.screen
  },

  {
    path: `/${user}/blacklist/new`,
    name: 'New',
    component: CreateBlacklist.screen
  },
  {
    path: `/${user}/blacklist/edit/:id`,
    name: 'EditBlacklist',
    component: EditBlacklist.screen
  },
  {
    path: `/${user}/blacklist`,
    name: 'Blacklist',
    component: BlackList.screen
  },
  

  {
    path: `/${user}/queries`,
    name: 'Queries',
    component: Queries.screen
  },
  {
    path: `/${user}/feedback`,
    name: 'Feedback',
    component: Feedbacks.screen
  },

  {
    path: `/${user}/pages/new`,
    name: 'New',
    component: CreatePage.screen
  },

  {
    path: `/${user}/pages`,
    name: 'Pages',
    component: Pages.screen
  },

  {
    path: `/${user}/developer/webhooks`,
    name: 'Weebhooks',
    component: Webhooks.screen
  },

  {
    path: `/${user}/developer/webhook-logos`,
    name: 'Weebhook Logs',
    component: WebhookLogs.screen
  },

  {
    redirect: true,
    path: `/${user}`,
    pathTo: `/${user}/dashboard`,
  },
]

export default adminRoutes