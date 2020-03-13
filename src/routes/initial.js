import {
  LogIn,
  Register,
  Home,
  PaypalPaying,
  Fees
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
    path: '/paypal-pay',
    name: 'Register',
    component: PaypalPaying.screen
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