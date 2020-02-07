import { PROJECT } from 'constants/types'
import {
  api,
  authApi
} from 'utils'

export const getProjectList = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: `rest/project/getprojectbycriteria`
    }

    return authApi(data).then(res => {

      dispatch({
        type: PROJECT.PROJECT_LIST,
        payload: res.data
      })
      return res
    }).catch(err => {
      throw err
    })
  }
}


// Get Project By ID
export const getProjectByID = (id) => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: `rest/project/editproject?id=${id}`
    }

    return authApi(data).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  }
}


// Create & Save Project
export const createAndSaveProject = (project) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `/rest/project/saveproject?id=1`,
      data: project
    }

    return authApi(data).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  }
}


// Create Project Contact
export const createProjectContact = (project) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `/rest/project/saveprojectcontact?id=1`,
      data: project
    }

    return authApi(data).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  }
}


// Get Project Currency
export const getProjectCurrencyList = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/rest/project/getcurrenncy?currencyStr=1'
    }

    return authApi(data).then(res => {
      dispatch({
        type: PROJECT.PROJECT_CURRENCY_LIST,
        payload: res
      })
      return res
    }).catch(err => {
      throw err
    })
  }
}


// Get Project Country
export const getProjectCountryList = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/rest/project/getcountry?countryStr=1'
    }

    return authApi(data).then(res => {
      dispatch({
        type: PROJECT.PROJECT_COUNTRY_LIST,
        payload: res
      })
      return res
    }).catch(err => {
      throw err
    })
  }
}


// Get Project title
export const getProjectTitleList = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/rest/project/gettitle?titleStr'
    }

    return authApi(data).then(res => {
      dispatch({
        type: PROJECT.PROJECT_TITLE_LIST,
        payload: res
      })
      return res
    }).catch(err => {
      throw err
    })
  }
}
