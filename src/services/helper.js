const getResult = (res) => {
  if (res.status >= 200 && res.status < 400) {
    return 'ok'
  }
  return 'error'
}

const setStatus = (serviceStatus, status, { page, okDescription }) => {
  serviceStatus.website = {
    lastUpdate: new Date() + " UTC",
    page: page,
    description: status.description,
    indicator: status.indicator
  }
  if (serviceStatus.website.description == okDescription) {
    serviceStatus.website.status = 'ok'
    serviceStatus.status = 'ok'
  } else {
    serviceStatus.website.status = 'error'
    serviceStatus.status = 'error'
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