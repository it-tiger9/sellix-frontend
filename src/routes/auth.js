import {
  LogIn,
  Register,
  ResetPassword,
  ForgotPassword,
  TwoFactorAuthentication,
  OTPLogin,
  ResetOTP
} from 'screens'

const initialRoutes = [
  {
    path: '/auth/login',
    name: 'LogIn',
    component: LogIn.screen
  },
  {
    path: '/auth/email',
    name: '2FA',
    component: TwoFactorAuthentication.screen
  },
  {
    path: '/auth/otp',
    name: '2FA',
    component: OTPLogin.screen
  },
  {
    path: '/auth/otp/reset',
    name: '2FA',
    component: ResetOTP.screen
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: Register.screen
  },
  {
    path: '/auth/password/new',
    name: 'Forgot Password',
    component: ForgotPassword.screen
  },
  {
    path: '/auth/reset/:id',
    name: 'Reset Password',
    component: ResetPassword.screen
  }
]

export default initialRoutes