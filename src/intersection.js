export function intersection(arrs) {
  const length = arrs.length

  const obj = {}
  arrs.forEach(arr => {
    arr.forEach(item => {
      if (obj[item]) {
        obj[item] = obj[item] + 1
      } else {
        obj[item] = 1
      }
    })
  })
  const out = []
  Object.keys(obj).forEach(k => {
    if (obj[k] === length) {
      out.push(k)
    }
  })
  return out
}
