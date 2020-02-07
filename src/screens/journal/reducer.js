import { JOURNAL } from 'constants/types'

const initState = {
  journal_list: []
}

const JournalReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {

    case JOURNAL.JOURNAL_LIST:
      return {
        ...state,
        journal_list: Object.assign([], payload.data)
      }

    default:
      return state
  }
}

export default JournalReducer