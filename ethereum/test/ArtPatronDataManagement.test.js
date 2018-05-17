/* global artifacts contract it assert before web3 */

require('truffle-test-utils').init()

var utils = require('../contractUtils')
var ArtPatron = artifacts.require('./ArtPatron.sol')

contract('ArtPatronData & ArtPatronManagement', (accounts) => {
  let instance
  let addAuthorResult
  let addHolderResult
  let addItemResult
  let changeItemHolderResult

  before(async () => {
    instance = await ArtPatron.deployed()

    addAuthorResult = await instance.AddAuthor('Monet1', 71)
    await instance.AddAuthor('Monet2', 72)

    addHolderResult = await instance.AddHolder('Museum1', 71)
    await instance.AddHolder('Museum2', 72)
    await instance.AddHolder('Museum3', 73)
  })

  it('should allow owner to change collectorAddress', async () => {
    let res = await instance.collectorAddress()
    assert.equal(res, 0)

    await instance.SetCollectorAddress(accounts[1])

    res = await instance.collectorAddress()
    assert.equal(res, accounts[1])
  })

  it('should not allow not an owner to change collectorAddress', async () => {
    let error
    try {
      await instance.SetCollectorAddress(accounts[2], { from: accounts[1] })
    } catch (err) {
      error = err
    }

    assert.ok(error)
  })

  it('should add Authors and Holders', async () => {
    let length = await instance.GetAuthorsLength()
    assert.equal(length, 2)

    length = await instance.GetHoldersLength()
    assert.equal(length, 3)
  })

  it('should emit event on adding Author', () => {
    assert.web3Event(
      addAuthorResult,
      {
        event: 'AuthorAdded'
      },
      'The AuthorAdded event is emitted')
  })

  it('should emit event on adding Holder', () => {
    assert.web3Event(
      addHolderResult,
      {
        event: 'HolderAdded'
      },
      'The HolderAdded event is emitted')
  })

  it('should not add Author with empty name', async () => {
    let error
    try {
      await instance.AddAuthor('', 71)
    } catch (err) {
      error = err
    }

    assert.ok(error)
  })

  it('should not add Holder with empty name', async () => {
    let error
    try {
      await instance.AddHolder('', 71)
    } catch (err) {
      error = err
    }

    assert.ok(error)
  })

  it('should correctly read Authors', async () => {
    let author = utils.getAuhtorObject(await instance.GetAuthorData(0))
    assert.equal(author.name, 'Monet1')
    assert.equal(author.id, 0)
    assert.equal(author.birthDate, 71)
  })

  it('should correctly read Holder', async () => {
    let [name, id, countryId] = await instance.GetHolderData(0)
    assert.equal(name, 'Museum1')
    assert.equal(id, 0)
    assert.equal(countryId, 71)
  })

  it('should add and correctly read Item', async () => {
    addItemResult = await instance.AddItem('Item 1', 888, 777, 1, 2)

    let length = await instance.GetItemsLength()
    assert.equal(length, 1)

    let item = utils.getItemObject(await instance.GetItemData(0))

    assert.equal(item.name, 'Item 1')
    assert.equal(item.id, 0)
    assert.equal(item.creationDate, 888)
    assert.equal(item.marketDate, 777)
    assert.equal(item.authorId, 1)
    assert.equal(item.holderId, 2)
    assert.equal(item.currentBid, web3.toWei(1, 'ether'))
    assert.equal(item.patronAddress, 0)
  })

  it('should emit event on adding Item', () => {
    assert.web3Event(
      addItemResult,
      {
        event: 'ItemAdded'
      },
      'The ItemAdded event is emitted')
  })

  it('should not add Item with empty name', async () => {
    let error
    try {
      await instance.AddItem('', 888, 0, 0)
    } catch (err) {
      error = err
    }

    assert.ok(error)
  })

  it('should not add Item with invalid authorId', async () => {
    let error
    try {
      await instance.AddItem('Item', 888, 5, 0)
    } catch (err) {
      error = err
    }

    assert.ok(error)
  })

  it('should not add Item with invalid holderId', async () => {
    let error
    try {
      await instance.AddItem('Item', 888, 0, 5)
    } catch (err) {
      error = err
    }

    assert.ok(error)
  })

  it('should allow owner to change holderId', async () => {
    await instance.AddItem('Item 2', 888, 777, 0, 0)
    let item = utils.getItemObject(await instance.GetItemData(1))
    assert.equal(item.holderId, 0)

    changeItemHolderResult = await instance.ChangeItemHolder(1, 2)
    item = utils.getItemObject(await instance.GetItemData(1))
    assert.equal(item.holderId, 2)
  })

  it('should emit event on changing holder', () => {
    assert.web3Event(
      changeItemHolderResult,
      {
        event: 'ItemHolderChanged'
      },
      'The ItemHolderChanged event is emitted'
    )
  })

  it('should not allow not an owner to change holderId', async () => {
    let error
    try {
      await instance.ChangeItemHolder(1, 1, { from: accounts[1] })
    } catch (err) {
      error = err
    }

    assert.ok(error)
  })
})
