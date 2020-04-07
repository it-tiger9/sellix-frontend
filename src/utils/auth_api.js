import axios from 'axios'
import config from 'constants/config'

const authApi = axios.create({
  baseURL: config.API_ROOT_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

authApi.interceptors.request.use(
  config => {
    if (!config.withoutAuth) {
      config.headers.Authorization = `Bearer ${window.localStorage.getItem('accessToken')}`
    }
   
    return config
  },
  error => {
    return Promise.reject(error.response)
  },
)

authApi.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error.response)
  },
)

export default authApi
