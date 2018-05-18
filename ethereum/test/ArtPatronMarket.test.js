/* global artifacts contract it assert before */

require('truffle-test-utils').init()

var utils = require('../contractUtils')
var ArtPatron = artifacts.require('./ArtPatron.sol')

contract('ArtPatronMarket', (accounts) => {
  let instance
  let buyPatronshipResult
  let initialPrice

  before(async () => {
    instance = await ArtPatron.deployed()

    await instance.AddAuthor('Monet', 73)
    await instance.AddHolder('Museum', 73)
    await instance.AddItem('Item 1', 888, 777, 0, 0)

    await instance.SetCollectorAddress(accounts[5])
  })

  it('should allow purchase of an Item', async () => {
    initialPrice = await instance.GetPatronshipPrice(0)
    buyPatronshipResult = await instance.BuyPatronship(0, { from: accounts[2], value: initialPrice })
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

  it('should deposit msg.value to colletorAddress if patronAddress is 0', async () => {
    let deposit = await instance.payments(accounts[5])
    assert.equal(deposit.toNumber(), initialPrice.toNumber())
  })

  it('should deposit reward to previous patron and fee to colletorAddress', async () => {
    let price = await instance.GetPatronshipPrice(0)
    let reward = await instance.GetPatronshipReward(0)
    let fee = await instance.GetPatronshipFee(0)

    await instance.SetCollectorAddress(accounts[6]) // account with no prev deposits

    await instance.BuyPatronship(0, { from: accounts[1], value: price })

    let depositRewad = await instance.payments(accounts[2]) // 2 is prev patron
    let depositFee = await instance.payments(accounts[6])

    assert.equal(depositRewad.toNumber(), reward.toNumber())
    assert.equal(depositFee.toNumber(), fee.toNumber())
  })

  it('should not allow purchase if collectorAddress is 0', async () => {
    let error
    try {
      await instance.SetCollectorAddress(0)
      let price = await instance.GetPatronshipPrice(0)
      await instance.BuyPatronship(0, { from: accounts[1], value: price })
    } catch (err) {
      error = err
    }

    await instance.SetCollectorAddress(accounts[6])

    assert.ok(error)
  })

  it('should not allow purchase of an unexistent item', async () => {
    let error
    try {
      await instance.BuyPatronship(2, { from: accounts[3], value: 10 })
    } catch (err) {
      error = err
    }

    assert.ok(error)
  })

  it('should not allow purchase with price < GetPatronshipPrice', async () => {
    let error
    try {
      let price = await instance.GetPatronshipPrice(0)
      await instance.BuyPatronship(0, { from: accounts[3], value: price.minus(1) })
    } catch (err) {
      error = err
    }

    assert.ok(error)
  })

  it('should not allow purchase by the current patron of an item', async () => {
    let error
    try {
      let price = await instance.GetPatronshipPrice(0)
      await instance.BuyPatronship(2, { from: accounts[1], value: price })
    } catch (err) {
      error = err
    }

    assert.ok(error)
  })
})
