
export const renderOptions = (label_key, value_ley, data) => {
  let result = []
  data.map(item => {
    result.push({
      label: item[label_key],
      value: item[value_ley]
    })
  })
  return result
}