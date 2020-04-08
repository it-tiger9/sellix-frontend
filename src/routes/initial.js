import {
  LogIn,
  Register,
  Home,
  Fees,
  ResetPassword,
  ForgotPassword,
  TwoFactorAuthentication,
  OTPLogin,
  ResetOTP
} from 'screens'

const initialRoutes = [
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn.screen
  },
  {
    path: '/email-2fa',
    name: '2FA',
    component: TwoFactorAuthentication.screen
  },
  {
    path: '/otp-2fa',
    name: '2FA',
    component: OTPLogin.screen
  },
  {
    path: '/reset-otp',
    name: '2FA',
    component: ResetOTP.screen
  },
  {
    path: '/register',
    name: 'Register',
    component: Register.screen
  },
  {
    path: '/password/new',
    name: 'Forgot Password',
    component: ForgotPassword.screen
  },
  {
    path: '/reset/:id',
    name: 'Reset Password',
    component: ResetPassword.screen
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