
module.exports = {
  getItemObject: function (tuple) {
    let [
      name,
      authorId,
      holderId,
      creationDate,
      currentBid,
      tabletDueDate,
      patronAddress
    ] = tuple

    return {
      name,
      authorId,
      holderId,
      creationDate,
      currentBid,
      tabletDueDate,
      patronAddress
    }
  },

  getAuhtorObject: function (tuple) {
    let [
      name,
      birthDate
    ] = tuple

    return {
      name,
      birthDate
    }
  },

  getHolderObject: function (tuple) {
    let [
      name,
      countryId
    ] = tuple

    return {
      name,
      countryId
    }
  }
}
