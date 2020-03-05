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
} from 'screens'


const reducer = combineReducers({
  common: CommonReducer,
  auth: AuthReducer,

  dashboard: Dashboard.reducer,
  product: Product.reducer,
  category: Categories.reducer
})

export default reducer