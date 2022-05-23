/* global console */

import { getAllFilesInDir } from './getAllFiles.js'
import { readFileSync, writeFileSync } from 'fs'
import * as d3 from 'd3'
// import { monthsShort } from './monthLabels.js'

const allFileFullPaths = getAllFilesInDir('data')
// console.log(allFileFullPaths)

const placesWeatherData = []

allFileFullPaths.forEach(filepath => {
  const fileData = readFileSync(filepath).toString()
  // console.log(fileData)

  placesWeatherData.push(d3.tsvParse(fileData))
})

// console.log(placesWeatherData)
const allMetricLabels = []

placesWeatherData.forEach(place => {
  place.forEach(metricRow => {
    allMetricLabels.push(metricRow.metric)
  })
})

// console.log(allMetricLabels)

const uniqueMetricLabels = Array.from(new Set(allMetricLabels))

console.log(uniqueMetricLabels)

writeFileSync('uniqueMetricLabels.json', JSON.stringify(allMetricLabels))
