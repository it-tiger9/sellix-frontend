import { BANK_ACCOUNT } from 'constants/types'
import {
  api,
  authApi
} from 'utils'

export const getTransactionList = () => {
  return (dispatch) => {
    dispatch({
      type: BANK_ACCOUNT.BANK_TRANSACTION_LIST,
      payload: {
        data: [{
          transaction_type: 'Debit',
          amount: 3453246,
          status: 'Explained',
          reference_number: 'KDF3920342',
          description: 'This is description',
          transaction_date: 'Oct 28th, 2019'
        }, {
          transaction_type: 'Debit',
          amount: 3453246,
          status: 'Explained',
          reference_number: 'KDF3929865',
          description: 'This is description',
          transaction_date: 'Oct 28th, 2019'
        }, {
          transaction_type: 'Debit',
          amount: 3453246,
          status: 'Unexplained',
          reference_number: 'KDF39206574',
          description: 'This is description',
          transaction_date: 'Oct 28th, 2019'
        }, {
          transaction_type: 'Debit',
          amount: 3453246,
          status: 'Explained',
          reference_number: 'KDF392394',
          description: 'This is description',
          transaction_date: 'Oct 28th, 2019'
        }, {
          transaction_type: 'Debit',
          amount: 3453246,
          status: 'Unexplained',
          reference_number: 'KDF3920923',
          description: 'This is description',
          transaction_date: 'Oct 28th, 2019'
        }]
      }
    })
  }
}