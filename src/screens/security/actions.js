import { CONTACT } from 'constants/types'
import {
  api,
  authApi
} from 'utils'

export const getContactList = (obj) => {
  return (dispatch) => {
    dispatch({
      type: CONTACT.CONTACT_LIST,
      payload: {
        data: [{
          transactionCategoryId: 2,
          transactionCategoryCode: 'admin@admin.com',
          transactionCategoryName: 'Mr.admin',
          transactionCategoryDescription: 'temp',
          parentTransactionCategory: 'Customer',
          transactionType: 'TEMP'
        }, {
          transactionCategoryId: 1,
          transactionCategoryCode: 4,
          transactionCategoryName: 'temp',
          transactionCategoryDescription: 'temp',
          parentTransactionCategory: 'Loream Ipsume',
          transactionType: 'TEMP'
        }, {
          transactionCategoryId: 1,
          transactionCategoryCode: 4,
          transactionCategoryName: 'temp',
          transactionCategoryDescription: 'temp',
          parentTransactionCategory: 'Loream Ipsume',
          transactionType: 'TEMP'
        }, {
          transactionCategoryId: 1,
          transactionCategoryCode: 4,
          transactionCategoryName: 'temp',
          transactionCategoryDescription: 'temp',
          parentTransactionCategory: 'Loream Ipsume',
          transactionType: 'TEMP'
        }, {
          transactionCategoryId: 1,
          transactionCategoryCode: 4,
          transactionCategoryName: 'temp',
          transactionCategoryDescription: 'temp',
          parentTransactionCategory: 'Loream Ipsume',
          transactionType: 'TEMP'
        },{
          transactionCategoryId: 1,
          transactionCategoryCode: 4,
          transactionCategoryName: 'temp',
          transactionCategoryDescription: 'temp',
          parentTransactionCategory: 'Loream Ipsume',
          transactionType: 'TEMP'
        },{
          transactionCategoryId: 1,
          transactionCategoryCode: 4,
          transactionCategoryName: 'temp',
          transactionCategoryDescription: 'temp',
          parentTransactionCategory: 'Loream Ipsume',
          transactionType: 'TEMP'
        }]
      }
    })
  }
}
