// Read all files from ../data/tsv/

import { getAllFilesInDir } from '../getAllFiles.js'
import { readFileSync, writeFileSync } from 'fs'
import { lookFor } from '../metricLabelLookup.js'
import { intersection } from './intersection.js'
import { tsvParse } from 'd3'

export function processData() {
  const requiredMetrics = ['average high', 'average low']

  const allFilepaths = getAllFilesInDir('data/tsv')

  const placesWeatherData = {}
  const errors = []

  const allMetricLabels = []
  const eachPlacesMetrics = []

  // Read data from all weather data files and store in a variable
  allFilepaths.forEach(({ fullpath, filename }) => {
    const fileData = readFileSync(fullpath).toString().toLowerCase()
    const placeMetricLabels = []
    let cleanedFileData = fileData

    lookFor.forEach(sr => {
      cleanedFileData = cleanedFileData.replaceAll(sr.replace, sr.with)
    })

    const placename = filename.split('.')[0]
    const parsedData = tsvParse(cleanedFileData)
    if (parsedData.columns.indexOf('metric') === -1) {
      errors.push(`metric column not present in ${filename}`)
    }
    const parsedDataObj = { data: {}, columns: parsedData.columns }

    parsedData.forEach(metricData => {
      const { metric } = metricData
      placeMetricLabels.push(metric)
      allMetricLabels.push(metric)
      parsedDataObj.data[metric] = metricData
    })
    parsedData.metrics = placeMetricLabels
    eachPlacesMetrics.push(placeMetricLabels)
    requiredMetrics.forEach(m => {
      if (placeMetricLabels.indexOf(m) === -1) {
        errors.push(`${m} data not present in ${filename}`)
      }
    })
    placesWeatherData[placename] = parsedDataObj
  })

  console.log(placesWeatherData.goa)

  const commonMetrics = intersection(eachPlacesMetrics)
  return {
    weatherData: placesWeatherData,
    commonMetrics,
    allMetricLabels,
    errors,
  }
}

const processedData = JSON.stringify(processData())

writeFileSync('data.json', processedData)
