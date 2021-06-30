/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it } = require('mocha')
const { getAllNetworks, getNetwork, saveNewSeries } = require('../../controller/series')
const { response, request } = require('express')
const models = require('../../models')
const { seriesList, singleSeries } = require('./mocks/series')


chai.use(sinonChai)
const { expect } = chai


describe('Series Controller', () => {
  let stubbedFindOne

  before(() => {
    stubbedFindOne = sinon.stub(models.series, 'findOne')
  })

  afterEach(() => {
    stubbedFindOne.resetBehavior()
  })

  describe('Gets All Networks', () => {
    it('gets list of networks from DB and calls response.send() with that list', async () => {
      const stubbedFindAll = sinon.stub(models.series, 'findAll').returns(seriesList)
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getAllNetowrks({}, response)
      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(seriesList)
    })
  })

  describe('Get One Network', () => {
    // eslint-disable-next-line max-len
    it('get a single network from the DB and calls  response.send() with that list', async () => {
      // const stubbedFindOne = sinon.stub(models.series, 'findOne').returns(singleSeries)
      stubbedFindOne.returns(singleseries)
      const request = { params: { id: '1' } }
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getNetwork(request, response)
      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedSend).to.have.been.calledWith(singleSeries)
    })

    it('return a 404 when no series is found', async () => {
      stubbedFindOne.returns(null)
      const request = { params: { slug: 'not-found' } }
      const stubbedSendStatus = sinon.stub()
      const response = { sendStatus: stubbedSendStatus }

      await getNetwork(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'not-found' } })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 error with a message', async () => {
      stubbedFindOne.throws('ERROR!')
      const request = { params: { slug: 'error-slug' } }

      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }

      await getNetwork(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'error-slug' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedSend).to.have.been.calledWith('Unable to retrieve series, please try again')
    })
  })

  describe('Save New Series', () => {
    // eslint-disable-next-line max-len
    it('accepts new series details and saves them as a new series, returning the saved record with a 201 status', async () => {
      const request = { body: singleSeries }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }
      const stubbedCreate = sinon.stub(models.series, 'create').returns(singleSeries)

      await saveNewSeries(request, response)

      expect(stubbedCreate).to.have.been.calledWith(singleSeries)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(singleSeries)
    })
  })
})
