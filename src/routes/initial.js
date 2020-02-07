import {
  LogIn,
  Register,
  Home
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
    path: '/',
    component: Home.screen,
    name: 'Home'
  }
]

export default initialRoutes