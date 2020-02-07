import { combineReducers } from 'redux'

import {
  AuthReducer,
  CommonReducer
} from './global'

import {
  Dashboard,
  Journal,
  BankAccount,
  Employee,
  Contact,
  Expense,
  GeneralSettings,
  CustomerInvoice,
  Receipt,
  SupplierInvoice,
  Product,
  Project,
  Payment,
  TransactionCategory,
  User,
  VatCode,
  Currency,
  Help,
  Notification,
  Organization,
  UsersRoles,
  DataBackup
} from 'screens'


const reducer = combineReducers({
  common: CommonReducer,
  auth: AuthReducer,

  dashboard: Dashboard.reducer,
  journal: Journal.reducer,
  bank_account: BankAccount.reducer,
  employee: Employee.reducer,
  contact: Contact.reducer,
  expense: Expense.reducer,
  settings: GeneralSettings.reducer,
  customer_invoice: CustomerInvoice.reducer,
  receipt: Receipt.reducer,
  supplier_invoice: SupplierInvoice.reducer,
  product: Product.reducer,
  project: Project.reducer,
  payment: Payment.reducer,
  transaction: TransactionCategory.reducer,
  user: User.reducer,
  vat: VatCode.reducer,
  currency: Currency.reducer,
  help: Help.reducer,
  notification: Notification.reducer,
  organization: Organization.reducer,
  users_roles: UsersRoles.reducer,
  data_backup: DataBackup.reducer
})

export default reducer