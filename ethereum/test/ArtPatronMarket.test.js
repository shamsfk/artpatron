/* global artifacts contract it assert before web3 */

require('truffle-test-utils').init()

var utils = require('../contractUtils')
var ArtPatron = artifacts.require('./ArtPatron.sol')

contract('ArtPatronMarket', (accounts) => {
  let instance
  let buyPatronshipResult

  before(async () => {
    instance = await ArtPatron.deployed()

    await instance.AddAuthor('Monet', 73)
    await instance.AddHolder('Museum', 73)
    await instance.AddItem('Item 1', 888, 777, 0, 0)

    await instance.SetCollectorAddress(accounts[5])
  })

  it('should allow purchase of an Item', async () => {
    buyPatronshipResult = await instance.BuyPatronship(0, { from: accounts[2], value: web3.toWei('2', 'ether') })
    let item = utils.getItemObject(await instance.GetItemData(0))
    assert.equal(item.patronAddress, accounts[2])
  })

  it('should emit event on a purchase', async () => {
    assert.web3Event(
      buyPatronshipResult,
      {
        event: 'PatronshipBought'
      },
      'The PatronshipBought event is emitted')
  })

  it('should transfer msg.value to colletorAddress if patronAddress is 0', async () => {
    assert.ok(false)
  })

  it('should transfer reward to previous patron', async () => {
    assert.ok(false)
  })

  it('should transfer fee to colletorAddress', async () => {
    assert.ok(false)
  })

  it('should not allow purchase if collectorAddress is 0', async () => {
    assert.ok(false)
  })

  it('should not allow purchase of an unexistent item', async () => {
    assert.ok(false)
  })

  it('should not allow purchase with price lesser than 150% of the current bid', async () => {
    assert.ok(false)
  })

  it('should not allow purchase by the current patron of an item', async () => {
    assert.ok(false)
  })
})
