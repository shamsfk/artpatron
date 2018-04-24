/* eslint-disable */
var ArtPatron = artifacts.require("./ArtPatron.sol");
/* eslint-enable */

module.exports = function (deployer) {
  deployer.deploy(ArtPatron).then(function () {
    console.log('address is', ArtPatron.address)
  })
}
