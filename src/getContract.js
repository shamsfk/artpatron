import ArtPatronContract from '../ethereum/build/contracts/ArtPatron.json'
import truffleContract from 'truffle-contract'
import getWeb3 from './getWeb3'

var instance

export default async function getContract () {
  if (instance) return instance

  let web3 = getWeb3()

  const artPatron = truffleContract(ArtPatronContract)
  artPatron.setProvider(web3.currentProvider)
  let coinbase = await web3.eth.getCoinbase()
  artPatron.defaults({from: coinbase})

  instance = await artPatron.deployed()
  return instance
}
