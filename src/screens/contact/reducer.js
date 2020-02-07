import { CONTACT } from 'constants/types'

const initState = {
  contact_list: []
}

const ContactReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {
    
    case CONTACT.CONTACT_LIST:
      return {
        ...state,
        contact_list: Object.assign([], payload.data)
      }

    default:
      return state
  }
}

export default ContactReducer