/* eslint-disable */
var Migrations = artifacts.require('./Migrations.sol')
/* eslint-enable */

module.exports = function (deployer) {
  deployer.deploy(Migrations)
}
