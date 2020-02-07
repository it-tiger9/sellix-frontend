import { SETTINGS } from 'constants/types'

const initState = {
}

const SettingsReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {

    default:
      return state
  }
}

export default SettingsReducer