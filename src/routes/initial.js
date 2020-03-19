import {
  LogIn,
  Register,
  Home,
  PaypalPaying,
  Fees,
  ShopProductDetail
} from 'screens'

const initialRoutes = [
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn.screen
  },
  {
    path: '/register',
    name: 'Register',
    component: Register.screen
  },

  {
    path: '/fees',
    component: Fees.screen,
    name: 'Fees'
  },
  {
    path: '/',
    component: Home.screen,
    name: 'Home'
  },
]

export default initialRoutes