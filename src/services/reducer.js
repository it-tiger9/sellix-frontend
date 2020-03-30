import { combineReducers } from 'redux'

import {
  AuthReducer,
  CommonReducer
} from './global'

import {
  Dashboard,
  GeneralSettings,
  Receipt,
  SupplierInvoice,
  Product,
  Project,
  Help,
  Notification,
  Categories,
  BlackList,
  Coupons,
  Feedbacks,
  Reports
} from 'screens'


const reducer = combineReducers({
  common: CommonReducer,
  auth: AuthReducer,
  blacklist: BlackList.reducer,
  coupons: Coupons.reducer,
  dashboard: Dashboard.reducer,
  product: Product.reducer,
  category: Categories.reducer,
  feedbacks: Feedbacks.reducer,
  report: Reports.reducer
})

export default reducer