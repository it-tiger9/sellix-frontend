

export const compareString = (filter, value, option) => {
  if (filter === '') {
    return true
  } else {
    if (option === 'contain') {
      if (value.indexOf(filter) > -1) {
        return true
      } else {
        return false
      }
    } else if (option === 'match') {
      if (value === filter) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }
}


export const filterDataList = (filter, real_key, option, data) => {
  let temp_list = []
  data.map(item => {
    if (compareString(filter, item[real_key], option)) {
      let temp = Object.assign({}, item)
      temp_list.push(temp)
    }
  })
  return temp_list
}