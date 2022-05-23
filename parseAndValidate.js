/* global console */

const { parse } = require('papaparse')
const fs = require('fs')

const kodaiData = fs.readFileSync('./data/kodaikanal.tsv').toString()

// console.log(kodaiData)

const parsedKodaiResults = parse(kodaiData, {
  dynamicTyping: true,
  // header: true,
})
// console.log(parsedKodaiResults)

const comfortTempRange = [11, 20]

// TODO temp range

// Find months in comfort temp range

const averageHighKey = 'Average high °C'
const averageLowKey = 'Average low °C'

const monthsShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const monthsLong = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const data = parsedKodaiResults.data

const onlyNumbers = data.slice(1)

const structuredData = {}

onlyNumbers.forEach(row => {
  structuredData[row[0]] = row.slice(1, 13)
})

const validMaxMonths = []

console.log(structuredData[averageHighKey])

structuredData[averageHighKey].forEach((val, i) => {
  if (
    val >= Math.min(...comfortTempRange) &&
    val <= Math.max(...comfortTempRange)
  ) {
    validMaxMonths.push(monthsShort[i])
  }
})

const validMinMonths = []

console.log(structuredData[averageLowKey])
structuredData[averageLowKey].forEach((val, i) => {
  if (
    val >= Math.min(...comfortTempRange) &&
    val <= Math.max(...comfortTempRange)
  ) {
    validMinMonths.push(monthsShort[i])
  }
})

console.log(validMaxMonths)
console.log(validMinMonths)

console.log(intersection(validMaxMonths, validMinMonths))

// accepts two arrays and finds intersection
function intersection(arr1, arr2) {
  const set1 = new Set(arr1)
  const common = []
  arr2.forEach(item => {
    if (set1.has(item)) {
      common.push(item)
    }
  })
  return common
}
