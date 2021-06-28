const express = require('express')
const series = require('./series')
const {getAllNetworks, getNetwork, getSeriesDetails, apiGetSeries, apiCreateSeries, apiGetOneSeries} = require('./controller/series')


const app = express()
app.use(express.json())

app.set('view engine', 'pug')
app.use(express.static('public'))
// pugroutes
app.get('/', getAllNetworks)
app.get('/network/:networkName', getNetwork)
app.get('/title/:id', getSeriesDetails)

// api routes
app.get('/api', apiGetSeries)
app.get('/api/:id', apiGetOneSeries)
app.post('/api', apiCreateSeries)

app.all('*', (request, response) => {
  return response.sendStatus(404)
})

app.listen(1342, () => {
  console.log('Listening on 1342...')
})
