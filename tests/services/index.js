const assert = require('assert');
const mailServices = require('../../src/services')
const sinon = require('sinon')
const axios = require('../../src/axios-client')
const mailgun = require('../../src/services/mailgun')
const sendgrid = require('../../src/services/sendgrid')

describe('mail services', function() {



  describe('getList()', function() {
    beforeEach(() => {
      sinon.stub(axios, 'client').returns(
        {
          data: {
            status: {
              description: 'All Systems Operational',
              indicator: 'none'
            }
          }
        })
    })
    afterEach(() => {
      axios.client.restore();
    })
    it('should mailgun then sendgrid after getting health status', async function() {
      await mailgun.checkStatus()
      mailServiceList = mailServices.getList()
      assert.equal(mailServiceList[0].getVender(), 'mailgun');
      assert.equal(mailServiceList[1].getVender(), 'sendgrid');
    });
  });
  describe('getList if mailgun status is wrong', function() {
    beforeEach(() => {
      sinon.stub(axios, 'client').returns(
        {
          data: {
            status: {
              description: 'Error',
              indicator: 'none'
            }
          }
        })
    })
    afterEach(() => {
      axios.client.restore();
    })
    it('should sendgrid then mailgun if status is wrong', async function() {
      await mailgun.checkStatus()
      mailServiceList = mailServices.getList()
      assert.equal(mailServiceList[0].getVender(), 'sendgrid');
      assert.equal(mailServiceList[1].getVender(), 'mailgun');
    });
  });
});
