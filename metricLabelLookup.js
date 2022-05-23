// import { readFileSync } from 'fs'

export const lookFor = [
  { replace: /\brain(fall|y)\b/gi, with: 'precipitation' },
  { replace: /\s+°C/gi, with: '' },
  { replace: /\s+mm/gi, with: '' },
  { replace: ',', with: '' },
  { replace: '−', with: '-' },
]

// let uniqueMetricLabelsStr = readFileSync('./uniqueMetricLabels.json').toString()

// lookFor.forEach(sr => {
//   uniqueMetricLabelsStr = uniqueMetricLabelsStr.replaceAll(sr.replace, sr.with)
// })

// uniqueMetricLabelsStr = uniqueMetricLabelsStr.toLowerCase()

// console.log(uniqueMetricLabelsStr)

// const uniqueMetricLabels = Array.from(
//   new Set(JSON.parse(uniqueMetricLabelsStr)),
// )

// console.log(uniqueMetricLabels)
