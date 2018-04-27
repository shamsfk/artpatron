var HDWalletProvider = require('truffle-hdwallet-provider')
var mnemonic = require('./mnemonic').mnemonic
var token = require('./mnemonic').token

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      // host: '127.0.0.1',
      // port: 8545,
      // gas: 4700000,
      // from: 'bb2486ff735b8fd42226d262733551d6204b3254',
      network_id: '4',
      provider: new HDWalletProvider(mnemonic, token)
    }
  }
}
