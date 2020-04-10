import {
  InitialLayout,
  AdminLayout,
  ShopLayout,
  DefaultLayout,
  SettingsLayout
} from 'layouts'


const mainRoutes = [
  { path: `/settings`,  name: 'SettingsLayout', component: SettingsLayout },
  { path: `/shop/:username`, name: 'ShopLayout', component: ShopLayout },
  { path: '/payment', name: 'PaymentLayout', component: DefaultLayout },
  { path: `/dashboard`, name: 'AdminLayout', component: AdminLayout },
  { path: `/admin`, name: 'ReallyAdminLayout', component: AdminLayout },
  { path: '/', name: 'InitialLayout', component: InitialLayout },
]

export default mainRoutes
