import { DASHBOARD } from 'constants/types'
import {
  api,
  authApi
} from 'utils'

export const initialData = (obj) => {
  return (dispatch) => {
    
  }
}


// Cash Flow Actions

export const getCashFlowGraphData = (daterange) => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/rest/vat/getvat'
    }

    return authApi(data).then(res => {
      dispatch({
        type: DASHBOARD.CASH_FLOW_GRAPH,
        payload: {
          labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].slice(0, daterange),
          inflow: {
            label: 'inflow',
            data: [3000, 5000, 7000, 2000, 5000, 5000, 2000, 1000, 5000, 2000, 6000, 3000, 1000, 2000],
            sum: 184000
          },
          outflow: {
            label: 'Outflow',
            data: [2500, 6000, 4000, 4000, 1000, 2500, 5300, 1100, 4530, 2000, 4000, 4000, 4000, 3000 ],
            sum: 3000
          }
        }
      })
    }).catch(err => {
      throw err
    })
  }
}


// Invoice Actions

export const getInvoiceGraphData = (daterange) => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/rest/vat/getvat'
    }

    return authApi(data).then(res => {
      dispatch({
        type: DASHBOARD.INVOICE_GRAPH,
        payload: {
          labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].slice(0, daterange),
          paid: {
            label: 'Paid',
            data: [3000, 5000, 7000, 2000, 5000, 5000, 2000, 1000, 5000, 2000, 6000, 3000, 1000, 2000],
          },
          due: {
            label: 'Due(30)',
            data: [2500, 6000, 4000, 4000, 1000, 2500, 5300, 1100, 4530, 2000, 4000, 4000, 4000, 3000 ],
          },
          overdue: {
            label: 'Overdue(10)',
            data: [3000, 5000, 7000, 1000, 5300, 2500, 6000, 4000, 500, 2500, 6000, 4000, 2000, 1000 ],
          }
        }
      })
    }).catch(err => {
      throw err
    })
  }
}


// Bank Account Actions

export const getBankAccountTypes = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/rest/vat/getvat'
    }

    return authApi(data).then(res => {
      dispatch({
        type: DASHBOARD.BANK_ACCOUNT_TYPE,
        payload: [
          {id: '1', name: 'Account1'},
          {id: '2', name: 'Account2'},
          {id: '3', name: 'Account3'},
        ]
      })
      return '1'
    }).catch(err => {
      throw err
    })
  }
}

export const getBankAccountGraphData = (account, daterange) => {
  return (dispatch) => {
    // let data = {
    //   method: 'GET',
    //   url: '/rest/vat/getvat'
    // }
    // return authApi(data).then(res => {
    //   dispatch({
    //     type: DASHBOARD.BANK_ACCOUNT_GRAPH,
    //     payload: res
    //   })
    // }).catch(err => {
    //   throw err
    // })

    dispatch({
      type: DASHBOARD.BANK_ACCOUNT_GRAPH,
      payload: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'].slice(0, daterange),
        data:[65, 23, 100, 2, 23,12, 40, 50, 60, 80, 90],
        balance: 2000,
        account_name: account,
        all_accounts: 3000,
        updated_date: '01/20/2019'
      }
    })
  }
}


// Profit and Loss

export const getProfitAndLossData = (startDate, endDate) => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/rest/vat/getvat'
    }

    return authApi(data).then(res => {
      dispatch({
        type: DASHBOARD.PROFIT_LOSS,
        payload: {
          'income': 180,
          'expenses': 80
        }
      })
      return '1'
    }).catch(err => {
      throw err
    })
  }
}


// Revenues and Expenses

export const getExpensesGraphData = (startDate, endDate) => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/rest/vat/getvat'
    }

    return authApi(data).then(res => {
      dispatch({
        type: DASHBOARD.EXPENSE_GRAPH,
        payload: {
          'labels': ['Meals', 'Meals', 'Meals', 'Meals', 'Meals', 'Meals', 'Meals', 'Meals', 'Meals'],
          'data': [300, 50, 100, 70, 40, 50, 50, 10, 60, 50]
        }
      })
      return '1'
    }).catch(err => {
      throw err
    })
  }
}

export const getRevenuesGraphData = (startDate, endDate) => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/rest/vat/getvat'
    }

    return authApi(data).then(res => {
      dispatch({
        type: DASHBOARD.REVENUE_GRAPH,
        payload: {
          'labels': ['Meals', 'Meals', 'Meals', 'Meals', 'Meals', 'Meals', 'Meals', 'Meals', 'Meals'],
          'data': [300, 50, 100, 70, 40, 50, 50, 10, 60, 50]
        }
      })
      return '1'
    }).catch(err => {
      throw err
    })
  }
}
