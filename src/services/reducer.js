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

} from 'screens'


const reducer = combineReducers({
  common: CommonReducer,
  auth: AuthReducer,

  dashboard: Dashboard.reducer,
  product: Product.reducer,
})

export default reducer