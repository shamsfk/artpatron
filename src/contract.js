import contract from '../ethereum/build/contracts/ArtPatronManagement.json'
import web3 from './web3'

export default address => {
  return new web3.eth.Contract(JSON.parse(contract.interface), address)
}
