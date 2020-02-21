import {
  InitialLayout,
  AdminLayout,
  ShopLayout
} from 'layouts'

const mainRoutes = [
  { path: '/admin', name: 'AdminLayout', component: AdminLayout },
  { path: '/shop', name: 'ShopLayout', component: ShopLayout },
  { path: '/', name: 'InitialLayout', component: InitialLayout }
  
]

export default mainRoutes
