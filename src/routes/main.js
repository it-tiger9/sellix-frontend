import {
  InitialLayout,
  AdminLayout,
  ShopLayout,
  DefaultLayout,
  SettingsLayout
} from 'layouts'

const mainRoutes = [
  { path: '/admin', name: 'AdminLayout', component: AdminLayout },
  { path: '/shop', name: 'ShopLayout', component: ShopLayout },
  { path: '/payment', name: 'PaymentLayout', component: DefaultLayout },
  { path: '/settings', name: 'SettingsLayout', component: SettingsLayout },
  { path: '/', name: 'InitialLayout', component: InitialLayout }
  
]

export default mainRoutes
