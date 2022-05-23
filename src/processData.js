// Read all files from ../data/tsv/

import { getAllFilesInDir } from '../getAllFiles.js'
import { readFileSync, writeFileSync } from 'fs'
import * as d3 from 'd3'

const allFilepaths = getAllFilesInDir('data/tsv')

const placesWeatherData = {}
const errors = []

const allMetricLabels = []

// Read data from all weather data files and store in a variable
allFilepaths.forEach(({ fullpath, filename }) => {
  const fileData = readFileSync(fullpath)
    .toString()
    .toLowerCase()
    .replaceAll(',', '')

  const placename = filename.split('.')[0]
  const parsedData = d3.tsvParse(fileData)
  // console.log(parsedData.columns)
  if (parsedData.columns.indexOf('metric') === -1) {
    errors.push(`metric column not present in ${filename}`)
  }

  parsedData.forEach(({ metric }) => allMetricLabels.push(metric))

  placesWeatherData[placename] = {
    parsed: parsedData,
    raw: fileData,
  }
})

// console.log(errors)
console.log(allMetricLabels)

// console.log(placesWeatherData.manali)
// const allMetricLabels = []

// 1. clean up/format metric labels
// 2. add a list of metrics available for each location
// 3. list of common metric labels across all locations
// 4. at least average high and average low metric should be available
