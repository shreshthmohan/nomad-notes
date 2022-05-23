// places that fit the user selected filter criteria:w

// filters: [{key: 'average high', }]
import { monthsShort } from '../monthLabels.js'

function suitablePlacesAndMonths(data, comfortTempRange) {
  // handle case when comfortTempRange is either empty array or undefined: pass-through filter
  const allPlaces = Object.keys(data)
  const matchingPlacesAndMonths = {}
  allPlaces.forEach(place => {
    matchingPlacesAndMonths[place] = []
    monthsShort.forEach(month => {})
    // data[place]['average high']
  })
}
