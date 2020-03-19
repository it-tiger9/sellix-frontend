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
    path: `/sellix/${user}/dashboard`,
    name: 'Dashboard',
    component: Dashboard.screen
  },

  {
    path: `/sellix/${user}/products/all/new`,
    name: 'New',
    component: CreateProduct.screen
  },
  {
    path: `/sellix/${user}/products/all/edit`,
    name: 'Edit',
    component: EditProduct.screen
  },

  {
    path: `/sellix/${user}/products/sort-products`,
    name: 'Product Sort',
    component: ProductSort.screen
  },



  {
    path: `/sellix/${user}/products/sort-categories`,
    name: 'Cateogry Sort',
    exact: true,
    component: CateogrySort.screen
  },


  {
    path: `/sellix/${user}/products/categories/edit`,
    name: 'Edit',
    component: EditCategory.screen
  },
  {
    path: `/sellix/${user}/products/categories/new`,
    name: 'New',
    component: CreateCategories.screen
  },

  {
    path: `/sellix/${user}/products/categories`,
    name: 'Categories',
    component: Categories.screen
  },

  {
    path: `/sellix/${user}/products/all`,
    name: 'Products',
    exact: true,
    component: Product.screen
  },
 

  {
    path: `/sellix/${user}/orders/detail`,
    name: 'Detail',
    component: OrderDetail.screen
  },

  {
    path: `/sellix/${user}/orders`,
    name: 'Orders',
    component: Order.screen
  },


  {
    path: `/sellix/${user}/analytics/reports`,
    name: 'Reports',
    component: Reports.screen
  },
  {
    path: `/sellix/${user}/analytics/all`,
    name: 'Analytics',
    component: Analytics.screen
  },


  {
    path: `/sellix/${user}/coupons/new`,
    name: 'New',
    component: CreateCoupon.screen
  },
  {
    path: `/sellix/${user}/coupons/edit/:id`,
    name: 'EditCoupon',
    component: EditCoupon.screen
  },
  {
    path: `/sellix/${user}/coupons`,
    name: 'Coupons',
    component: Coupons.screen
  },

  {
    path: `/sellix/${user}/blacklist/new`,
    name: 'New',
    component: CreateBlacklist.screen
  },
  {
    path: `/sellix/${user}/blacklist/edit/:id`,
    name: 'EditBlacklist',
    component: EditBlacklist.screen
  },
  {
    path: `/sellix/${user}/blacklist`,
    name: 'Blacklist',
    component: BlackList.screen
  },
  

  {
    path: `/sellix/${user}/queries`,
    name: 'Queries',
    component: Queries.screen
  },
  {
    path: `/sellix/${user}/feedback`,
    name: 'Feedback',
    component: Feedbacks.screen
  },

  {
    path: `/sellix/${user}/pages/new`,
    name: 'New',
    component: CreatePage.screen
  },

  {
    path: `/sellix/${user}/pages`,
    name: 'Pages',
    component: Pages.screen
  },

  {
    path: `/sellix/${user}/developer/webhooks`,
    name: 'Weebhooks',
    component: Webhooks.screen
  },

  {
    path: `/sellix/${user}/developer/webhook-logos`,
    name: 'Weebhook Logs',
    component: WebhookLogs.screen
  },

  {
    redirect: true,
    path: `/sellix/${user}`,
    pathTo: `/sellix/${user}/dashboard`,
  },
]

export default adminRoutes