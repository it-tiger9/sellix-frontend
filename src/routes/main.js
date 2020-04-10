import {
  AuthLayout,
  UserLayout,
  ShopLayout,
  PaymentLayout,
  SettingsLayout,
  InvoiceLayout,
  ProductLayout,
  LandingLayout
} from 'layouts'

const user = window.localStorage.getItem('userId')

const mainRoutes = [
  // Settings
  { path: `/settings`,  name: 'SettingsLayout', component: SettingsLayout },

  // Shop
  { path: `/u/:username`, name: 'ShopLayout', component: ShopLayout },


  { path: '/payment', name: 'PaymentLayout', component: PaymentLayout },
  { path: '/invoice', name: 'InvoiceLayout', component: InvoiceLayout },
  { path: '/product', name: 'ProductLayout', component: ProductLayout },

  // User
  { path: `/dashboard/${user}`, name: 'UserLayout', component: UserLayout },

  // Auth 
  { path: '/auth', name: 'AuthLayout', component: AuthLayout },

  // Landing
  { path: '/', name: 'LandingLayout', component: LandingLayout },

]

export default mainRoutes
