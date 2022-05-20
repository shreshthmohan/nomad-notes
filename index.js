/* global d3, console */

const placeFilenames = ['tiruvannamalai.tsv', 'manali.tsv']

Promise.all(placeFilenames.map(filename => d3.tsv(filename))).then(
  placesData => {
    console.log(placesData)

    const invalidValues = []
    const allMetricNames = []
    placesData.forEach((place, placeId) => {
      const columns = place.columns
      place.forEach(metric => {
        allMetricNames.push(metric.metric)
        columns.forEach((col, colId) => {
          if (colId > 1) {
            if (Number.isNaN(Number.parseFloat(metric[col]))) {
              invalidValues.push(
                `${placeFilenames[placeId]}, ${metric.metric}: ${col}, ${metric[col]}`,
              )
            }
          }
        })
      })
    })

    console.log(
      invalidValues.length
        ? `Invalid values found: ${invalidValues}`
        : 'All values look good!',
    )

    console.log(
      Array.from(
        new Set(
          Array.from(new Set(allMetricNames)).map(d =>
            d
              .replace('rainfall', 'precipitation')
              .replace('rainy', 'precipitation')
              .replace(' °C', '')
              .replace(' mm', '')
              .toLowerCase()
              .replaceAll(' ', '_'),
          ),
        ),
      ),
    )

    // const comfortTempRange = [15, 33]
    // // find place-month combination whose average min and max lie in comfortable temeperature range
    // const valueLabels = []
  },
)
