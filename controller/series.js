const { request } = require('express')
const series = require('../series')
const models = require('../models')
const Shows = models.Show

const getAllNetworks = (request, response) => {
    let networks = []
    series.forEach(show => {
        if (!networks.includes(show.network)) {
            networks.push(show.network)
        }
    })
    return response.render('index', {networks})
}

const getNetwork = (request, response) => {
    let eachSeries = series.filter(show => {
        return request.params.networkName === show.network
    })
    return response.render('series', {eachSeries})
}

const getSeriesDetails = (request, response) => {
    let eachSeriesDetails = series.find((show) => show.id === request.params.id)
    return response.render('seriesDetails', {eachSeriesDetails})
    }

const saveNewSeries = async (request, response) => {
    const { network, title, createdBy, synopsis, seasons } = request.body
      
    if (!network || !title || !createdBy || !synopsis || !seasons) {
        return response.status(400).send('The following fields are required: network, title, createdBy, synopsis, seasons')
        }
      
    const newSeries = { network, title, createdBy, synopsis, seasons }
      
    const series = await models.series.create(newSeries)
      
        return response.status(201).send(series)
      }

const apiGetSeries = async (request, response) => {
    const shows = await Shows.findAll()

    response.json(shows)
}    

const apiCreateSeries = async (request, response) => {
    const show = request.body
    const newShow = await Shows.create(
        show
    )
    response.json(newShow)
}

const apiGetOneSeries = async (request, response) => {
    const id = request.params.id
    const oneShow = await Shows.findOne({where: { id }}
    )
    response.send(oneShow)
}

module.exports= { getAllNetworks, getNetwork, getSeriesDetails, saveNewSeries, apiGetSeries, apiCreateSeries, apiGetOneSeries}
