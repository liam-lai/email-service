const getResult = (res) => {
  if (res.status >= 200 && res.status < 400) {
    return 'ok'
  }
  return 'fail'
}

const setStatus = (serviceStatus, status, { page, okDescription }) => {
  serviceStatus.website.lastUpdate = new Date() + " UTC"
  serviceStatus.website.page = page
  serviceStatus.website.description = status.description
  serviceStatus.website.indicator = status.indicator
  if (serviceStatus.website.description == okDescription) {
    serviceStatus.website.status = 'ok'
    serviceStatus.status = 'ok'
  } else {
    serviceStatus.website.status = 'error'
  }
}

const setSendingStatus = (serviceStatus, status) => {
  serviceStatus.status = status
  serviceStatus.lastSend = {
    time: new Date() + " UTC",
    status
  }
}

module.exports = {
  getResult,
  setStatus,
  setSendingStatus
}