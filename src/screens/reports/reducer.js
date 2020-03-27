import { ANALYTICS } from 'constants/types'

let initState = {
  report_list: []
}

const ReportReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {

    case ANALYTICS.ALL_REPORTS:
      return {
        ...state,
        report_list: Object.assign([], payload)
      }

    case ANALYTICS.NEW_REPORT:
      const data =  Object.assign([], state.report_list)
      data.push(payload)
      
      return {
        report_list: data
      }

    default:
      return state
  }
}

export default ReportReducer