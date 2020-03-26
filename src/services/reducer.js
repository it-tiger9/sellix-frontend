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
  Feedbacks
} from 'screens'


const reducer = combineReducers({
  common: CommonReducer,
  auth: AuthReducer,
  blacklist: BlackList.reducer,
  coupons: Coupons.reducer,
  dashboard: Dashboard.reducer,
  product: Product.reducer,
  category: Categories.reducer,
  feedbacks: Feedbacks.reducer
})

export default reducer