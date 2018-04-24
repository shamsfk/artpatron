
module.exports = {
  getItemObject: function (tuple) {
    let [
      name,
      id,
      authorId,
      holderId,
      creationDate,
      currentBid,
      tabletDueDate,
      patronAddress
    ] = tuple

    return {
      name,
      id,
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
      id,
      birthDate
    ] = tuple

    return {
      name,
      id,
      birthDate
    }
  },

  getHolderObject: function (tuple) {
    let [
      name,
      id,
      countryId
    ] = tuple

    return {
      name,
      id,
      countryId
    }
  }
}
