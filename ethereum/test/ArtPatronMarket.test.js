/* global artifacts contract it assert before web3 */

require('truffle-test-utils').init()

// var utils = require('../contractUtils')
var ArtPatron = artifacts.require('./ArtPatron.sol')

contract('ArtPatronMarket', (accounts) => {
  let instance

  before(async () => {
    instance = await ArtPatron.deployed()

    await instance.AddAuthor('Monet', 73)
    await instance.AddHolder('Museum', 73)
    await instance.AddItem('Item 1', 888, 0, 0)
  })

  it('should allow initial purchase of an Item', async () => {

  })

  it('should emit event on a purchase', async () => {

  })

  it('should not allow purchase of an unexistent item', async () => {

  })

  it('should not allow purchase with price lesser than 150% of the current bid', async () => {

  })

  it('should not allow purchase by the current patron of an item', async () => {

  })
})
