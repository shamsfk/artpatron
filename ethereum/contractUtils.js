// var BigNumber = require('bignumber.js')

module.exports = {
  getItemObject: function (tuple) {
    let [
      name,
      id,
      authorId,
      museumId,
      creationDate,
      currentBid,
      marketDate,
      patronAddress
    ] = tuple

    return {
      name,
      id: id.toNumber(),
      authorId: authorId.toNumber(),
      museumId: museumId.toNumber(),
      creationDate: creationDate.toNumber(),
      currentBid: currentBid.toNumber(),
      marketDate: marketDate.toNumber(),
      patronAddress
    }
  },

  getAuhtorObject: function (tuple) {
    let [
      name,
      id,
      birthDate
    ] = tuple

    return {
      name,
      id: id.toNumber(),
      birthDate: birthDate.toNumber()
    }
  },

  getMuseumObject: function (tuple) {
    let [
      name,
      id,
      countryId
    ] = tuple

    return {
      name,
      id: id.toNumber(),
      countryId: countryId.toNumber()
    }
  }
}
