import { readFileSync } from 'fs'

const lookFor = [
  { replace: /average high( °C)?/gi, with: 'average high' },
  { replace: /average low( °C)?/gi, with: 'average low' },
  { replace: /rain(fall|y)/gi, with: 'precipitation' },
  { replace: /record high( °C)?/gi, with: 'record high' },
  { replace: /record low( °C)?/gi, with: 'record low' },
  { replace: /daily mean( °C)?/gi, with: 'daily mean' },
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
