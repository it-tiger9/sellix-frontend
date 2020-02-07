import { PROJECT } from 'constants/types'

const initState = {
  project_list: [],
  project_currency_list: [],
  project_country_list: [],
  project_title_list: []
}

const ProjectReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {
    
    case PROJECT.PROJECT_LIST:
      return {
        ...state,
        project_list: Object.assign([], payload.data)
      }

    case PROJECT.PROJECT_CURRENCY_LIST:
      const currency_list = payload.data.map(currency => {
        return {label: currency.currencyName, value: currency.currencyCode}
      })

      return {
        ...state,
        project_currency_list: Object.assign([], currency_list)
      }
    
    case PROJECT.PROJECT_COUNTRY_LIST:
      const country_list = payload.data.map(country => {
        return {label: country.countryName, value: country.countryCode}
      })

      return {
        ...state,
        project_country_list: Object.assign([], country_list)
      }

    case PROJECT.PROJECT_TITLE_LIST:
      return {
        ...state,
        project_title_list: Object.assign([], payload.data)
      }

    default:
      return state
  }
}

export default ProjectReducer