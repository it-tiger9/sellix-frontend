import {
  InitialLayout,
  AdminLayout,
  ShopLayout,
  DefaultLayout,
  SettingsLayout
} from 'layouts'

const user = window.localStorage.getItem('userId')

const mainRoutes = [
  { path: `/${user}/settings`,  name: 'SettingsLayout', component: SettingsLayout },
  { path: `/${user}/shop`, name: 'ShopLayout', component: ShopLayout },
  { path: `/${user}`, name: 'AdminLayout', component: AdminLayout },
  { path: '/payment', name: 'PaymentLayout', component: DefaultLayout },
  { path: '/', name: 'InitialLayout', component: InitialLayout }
  
]

export default mainRoutes
