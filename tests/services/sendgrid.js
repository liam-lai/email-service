const assert = require('assert')
const sinon = require('sinon')
const axios = require('../../src/axios-client')
const sendgrid = require('../../src/services/sendgrid')

describe('sendgrid services', () => {
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
      await sendgrid.sendEmail(mockReq)
      sinon.assert.calledWithMatch(axios.client, {
        method: 'POST',
        data: {
          content: [{ type: "text/plain", value: "test" }],
          from: { email: "Liam Lai <liam@coding.test.com>" },
          personalizations: [{ to: [{ email: "test@test.com" }] }],
          subject: "test"
        },
        url: 'https://test.ci',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer password`
        },
      })
    });
  });

  describe('getVender()', () => {
    it('should return sendgrid', () => {
      assert.equal(sendgrid.getVender(), 'sendgrid')
    });
  });
  describe('status()', () => {
    it('should get lastSend status after sending email', async () => {
      await sendgrid.sendEmail(mockReq)
      assert.equal(sendgrid.getStatus().lastSend.status, 'ok')
    });

    it('should get status after checkStatus', async () => {
      await sendgrid.checkStatus()
      assert(sendgrid.getStatus().status)
    });
  });
});
