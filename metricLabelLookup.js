import { readFileSync } from 'fs'

const lookFor = [
  { replace: /rain(fall|y)/gi, with: 'precipitation' },
  { replace: /\s+°C/gi, with: '' },
  { replace: /\s+mm/gi, with: '' },
]

let uniqueMetricLabelsStr = readFileSync('./uniqueMetricLabels.json').toString()

lookFor.forEach(sr => {
  uniqueMetricLabelsStr = uniqueMetricLabelsStr.replaceAll(sr.replace, sr.with)
})

uniqueMetricLabelsStr = uniqueMetricLabelsStr.toLowerCase()

console.log(uniqueMetricLabelsStr)

const uniqueMetricLabels = Array.from(
  new Set(JSON.parse(uniqueMetricLabelsStr)),
)

console.log(uniqueMetricLabels)
