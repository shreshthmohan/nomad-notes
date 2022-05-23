import { getAllFilesInDir } from './getAllFiles.js'
import { readFileSync, writeFileSync } from 'fs'
import * as d3 from 'd3'
// import { monthsShort } from './monthLabels.js'

const allFilepaths = getAllFilesInDir('data/tsv')
// console.log(allFilepaths)

const placesWeatherData = []

allFilepaths.forEach(({ fullpath }) => {
  const fileData = readFileSync(fullpath).toString()
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
