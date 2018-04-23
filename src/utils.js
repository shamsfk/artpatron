
module.exports = {
  getItemObject: function (tuple) {
    let [
      title,
      authorId,
      holderId,
      creationDate,
      currentBid,
      tabletDueDate,
      patronAddress
    ] = tuple

    return {
      title,
      authorId,
      holderId,
      creationDate,
      currentBid,
      tabletDueDate,
      patronAddress
    }
  }
}
