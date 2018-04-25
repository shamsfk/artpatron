import Web3 from 'web3'

var web3

export default function getWeb3 () {
  if (web3) return web3

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // Use Mist/MetaMask's provider.
    web3 = new Web3(window.web3.currentProvider)
    console.log('Injected web3 detected.')
  } else {
    // Fallback to localhost if no web3 injection. We've configured this to
    // use the development console's port by default.
    // var provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545')
    // web3 = new Web3(provider)
    console.log('No web3 instance injected')
    web3 = null
  }

  return web3
}
