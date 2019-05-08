const assert = require('assert')
const sinon = require('sinon')
const axios = require('../../src/axios-client')
const mailgun = require('../../src/services/mailgun')

describe('mailgun services', () => {
  mockReq = {
    body: {
      recipients: ['test@test.com'],
      subject: 'test',
      text: 'test'
    }
  }

  beforeEach(() => {
    sinon.stub(axios, 'client').returns(
      {
        status: 200,
        data: { status: 'test' }
      })
  });

  afterEach(() => {
    axios.client.restore()
  })

  describe('sendEmail()', () => {
    it('should have right format of email details', async () => {
      await mailgun.sendEmail(mockReq)
      sinon.assert.calledWithMatch(axios.client, {
        method: 'POST',
        auth: {
          username: 'api',
          password: 'password'
        },
        url: 'https://test.ci'
      })
    });
  });

  describe('getVender()', () => {
    it('should return mailgun', () => {
      assert.equal(mailgun.getVender(), 'mailgun')
    });
  });
  describe('status()', () => {

    it('should get lastSend status after sending email', async () => {
      await mailgun.sendEmail(mockReq)
      assert.equal(mailgun.getStatus().lastSend.status, 'ok')
    });

    it('should get status after checkStatus', async () => {
      await mailgun.checkStatus()
      assert(mailgun.getStatus().status)
    });
  });
});
