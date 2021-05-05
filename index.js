const express = require('express')
const series = require('./series')
const {getAllNetworks, getNetwork, getSeriesDetails} = require('./controller/series')


const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', getAllNetworks)

app.get('/network/:networkName', getNetwork)

app.get('/title/:id', getSeriesDetails)

app.all('*', (request, response) => {
  return response.sendStatus(404)
})

app.listen(1342, () => {
  console.log('Listening on 1342...')
})
