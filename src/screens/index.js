import Home from './home'
import Fees from './fees'
import LogIn from './log_in'
import TwoFactorAuthentication from './2fa'
import OTPLogin from './otp_2fa'
import ResetOTP from './reset_otp'
import Register from './register'
import ForgotPassword from './forgot_password'
import ResetPassword from './reset_password'
import Dashboard from './dashboard'

import Product from './product'
import CreateProduct from './product/screens/create'
import EditProduct from './product/screens/detail'

import ProductSort from './product_sort'
import CateogrySort from './category_sort'

import Categories from './categories'
import CreateCategories from './categories/screens/create'
import EditCategory from './categories/screens/detail'

import Order from './order'
import OrderDetail from './order/screens/detail'
import Analytics from './analytics'
import Reports from './reports'
import Coupons from './coupons'
import CreateCoupon from './coupons/screens/create'
import Queries from './queries'
import Feedbacks from './feedbacks'
import ReplyToFeedback from './feedbacks/screens/reply'
import Webhooks from './webhooks'
import WebhookLogs from './webhook_logs'
import Pages from './pages'
import CreatePage from './pages/screens/create'
import Contact from './contact'
import ShopFeedback from './feedbacks_shop'
import LeaveFeedback from './feedbacks_shop/screens/create'
import ShopProducts from './product_shop'
import ShopProductDetail from './product_shop/screens/detail'
import BlackList from './blacklist'
import CreateBlacklist from './blacklist/screens/create'
import EditBlacklist from './blacklist/screens/create'
import EditCoupon from './coupons/screens/create'
import ReplyToQuerie from './queries/screens/reply'
import Contacts from './contacts/screens/reply/index.js'
import Terms from './terms/screen.js'

import PaypalPaying from './paypal_paying'
import Invoice from './invoice'
import SecurityPage from './security'
import Notification from './notification'
import Payments from './payments'
import MemberPage from './memebers'
import Billings from './billings'

import GeneralSettings from './general_settings'
import Customization from './customization'


import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-toastify/dist/ReactToastify.css"
import 'react-select/dist/react-select.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export {
  Home,
  Fees,
  LogIn,
  Register,
  OTPLogin,
  ResetOTP,
  Dashboard,
  ForgotPassword,
  ResetPassword,
  TwoFactorAuthentication,
  Invoice,
  Terms,


  EditCoupon,
  Product,
  CreateProduct,
  EditProduct,

  CateogrySort,
  ProductSort,

  Categories,
  CreateCategories,
  EditCategory,
  
  Contact,
  Contacts,
  Order,
  Analytics,
  Reports,
  Coupons,
  CreateCoupon,
  Queries,
  ReplyToQuerie,
  Feedbacks,
  ReplyToFeedback,
  Webhooks,
  Pages,

  CreatePage,
  WebhookLogs,
  ShopFeedback,
  LeaveFeedback,
  ShopProducts,
  ShopProductDetail,
  PaypalPaying,
  BlackList,
  CreateBlacklist,
  OrderDetail,
  SecurityPage,
  Payments,
  MemberPage,
  Billings,
  GeneralSettings,
  Notification,
  Customization,
  EditBlacklist
}
