import { min, max } from 'd3'
import { processData } from './processData.js'

// places that fit the user selected filter criteria:w

// filters: [{key: 'average high', }]
import { monthsShort } from '../monthLabels.js'

export function suitablePlacesAndMonths(data, comfortTempRange) {
  // handle case when comfortTempRange is either empty array or undefined: pass-through filter
  const allPlaces = Object.keys(data)
  // TODO handle case when only one value is provided in comfortTempRange
  const minComfort = min(comfortTempRange)
  const maxComfort = max(comfortTempRange)
  const matchingPlacesAndMonths = {}
  allPlaces.forEach(place => {
    let matchingMonthsForThisPlace = []
    monthsShort.forEach(month => {
      const avgHigh = Number.parseFloat(data[place].data['average high'][month])
      const avgLow = Number.parseFloat(data[place].data['average low'][month])
      if (
        avgHigh < maxComfort &&
        avgHigh > minComfort &&
        avgLow > minComfort &&
        avgLow < maxComfort
      ) {
        matchingMonthsForThisPlace.push(month)
      }
    })
    if (matchingMonthsForThisPlace.length) {
      matchingPlacesAndMonths[place] = matchingMonthsForThisPlace
    }
  })
  return matchingPlacesAndMonths
}

const { weatherData, errors } = processData()
console.log({ errors })

const matchingWeatherPlaces = suitablePlacesAndMonths(weatherData, [5, 33])

console.log(matchingWeatherPlaces)
