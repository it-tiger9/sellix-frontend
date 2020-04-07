import { CONTACT } from 'constants/types'
import {
  api,
  authApi,
  formData
} from 'utils'

// Save Securitt Actions
export const saveSecurity = (security) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `/settings/security`,
      data: formData(security)
    }

    return authApi(data).then(res => {
      if (res.status === 200) {
        return res
      } else {
        throw res
      }
    }).catch(err => {
      throw err
    })
  }
}


// Generate new API key
export const newAPIkey = (security) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `/settings/security/apikey`
    }

    return authApi(data).then(res => {
      if (res.status === 200) {
        return res
      } else {
        throw res
      }
    }).catch(err => {
      throw err
    })
  }
}


// Get QR Code
export const setupOTP = (security) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `/self/otp/setup`
    }

    return authApi(data).then(res => {
      if (res.status === 200) { 
        return res
      } else {
        throw res
      }
    }).catch(err => {
      throw err
    })
  }
}


// Verify OTP Code
export const verifyOTP = (code) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `/self/otp/try`,
      data: formData(code)
    }

    return authApi(data).then(res => {
      if (res.status === 200) { 
        return res
      } else {
        throw res
      }
    }).catch(err => {
      throw err
    })
  }
}

