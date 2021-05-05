const { request } = require('express')
const series = require('../series')

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

module.exports= { getAllNetworks, getNetwork, getSeriesDetails }
