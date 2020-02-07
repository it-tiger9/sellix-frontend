import { CUSTOMER_INVOICE } from 'constants/types'
import {
  api,
  authApi
} from 'utils'

export const getCustomerInoviceList = () => {
  return (dispatch) => {
    dispatch({
      type: CUSTOMER_INVOICE.CUSTOMER_INVOICE_LIST,
      payload: {
        data: [{
          status: 'paid',
          transactionCategoryId: 2,
          transactionCategoryCode: 2,
          transactionCategoryName: 'temp',
          transactionCategoryDescription: 'temp',
          parentTransactionCategory: 'Loream Ipsume',
          transactionType: 'TEMP'
        }, {
          status: 'paid',
          transactionCategoryId: 1,
          transactionCategoryCode: 3,
          transactionCategoryName: 'temp',
          transactionCategoryDescription: 'temp',
          parentTransactionCategory: 'Loream Ipsume',
          transactionType: 'TEMP'
        }, {
          status: 'Partially Paid',
          transactionCategoryId: 1,
          transactionCategoryCode: 4,
          transactionCategoryName: 'temp',
          transactionCategoryDescription: 'temp',
          parentTransactionCategory: 'Loream Ipsume',
          transactionType: 'TEMP'
        }, {
          status: 'unpaid',
          transactionCategoryId: 1,
          transactionCategoryCode: 5,
          transactionCategoryName: 'temp',
          transactionCategoryDescription: 'temp',
          parentTransactionCategory: 'Loream Ipsume',
          transactionType: 'TEMP'
        }, {
          status: 'unpaid',
          transactionCategoryId: 1,
          transactionCategoryCode: 6,
          transactionCategoryName: 'temp',
          transactionCategoryDescription: 'temp',
          parentTransactionCategory: 'Loream Ipsume',
          transactionType: 'TEMP'
        },{
          status: 'paid',
          transactionCategoryId: 1,
          transactionCategoryCode: 7,
          transactionCategoryName: 'temp',
          transactionCategoryDescription: 'temp',
          parentTransactionCategory: 'Loream Ipsume',
          transactionType: 'TEMP'
        },{
          status: 'unpaid',
          transactionCategoryId: 1,
          transactionCategoryCode: 8,
          transactionCategoryName: 'temp',
          transactionCategoryDescription: 'temp',
          parentTransactionCategory: 'Loream Ipsume',
          transactionType: 'TEMP'
        }]        
      }
    })
  }
}
