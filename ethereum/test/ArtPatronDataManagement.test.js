/* global artifacts contract it assert before after web3 */

var utils = require('../contractUtils')
var ArtPatron = artifacts.require('./ArtPatron.sol')

contract('ArtPatronData & ArtPatronManagement', (accounts) => {
  let instance
  let addAuthorEvent
  let addAuthorEventResults = []
  let addHolderEvent
  let addHolderEventResults = []
  let addItemEvent
  let addItemEventResults = []

  before(async () => {
    instance = await ArtPatron.deployed()

    addAuthorEvent = instance.AuthorAdded()
    addAuthorEvent.watch(function (err, result) {
      if (err) {
        console.log('addAuthorEvent error:', err)
      } else {
        addAuthorEventResults.push(result)
      }
    })

    addHolderEvent = instance.HolderAdded()
    addHolderEvent.watch(function (err, result) {
      if (err) {
        console.log('addHolderEvent error:', err)
      } else {
        addHolderEventResults.push(result)
      }
    })

    addItemEvent = instance.ItemAdded()
    addItemEvent.watch(function (err, result) {
      if (err) {
        console.log('addItemEvent error:', err)
      } else {
        addItemEventResults.push(result)
      }
    })

    await instance.AddAuthor('Monet1', 71)
    await instance.AddAuthor('Monet2', 72)

    await instance.AddHolder('Museum1', 71)
    await instance.AddHolder('Museum2', 72)
    await instance.AddHolder('Museum3', 73)
  })

  after(() => {
    addAuthorEvent.stopWatching()
    addHolderEvent.stopWatching()
    addItemEvent.stopWatching()
  })

  it('should add Authors and Holders', async () => {
    let length = await instance.GetAuthorsLength()
    assert.equal(length, 2)

    length = await instance.GetHoldersLength()
    assert.equal(length, 3)
  })

  // it('should emit AddAuthor and AddHolder events', () => {
  //   assert(addAuthorEventResults.length, 2)
  //   assert(addHolderEventResults.length, 3)
  // })

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
    let [name, id, birthDate] = await instance.GetAuthorData(0)
    assert.equal(name, 'Monet1')
    assert.equal(id, 0)
    assert.equal(birthDate, 71)
  })

  it('should correctly read Holder', async () => {
    let [name, id, countryId] = await instance.GetHolderData(0)
    assert.equal(name, 'Museum1')
    assert.equal(id, 0)
    assert.equal(countryId, 71)
  })

  it('should add and correctly read Item', async () => {
    await instance.AddItem('Item 1', 888, 1, 2)

    let length = await instance.GetItemsLength()
    assert.equal(length, 1)

    let item = utils.getItemObject(await instance.GetItemData(0))

    assert.equal(item.name, 'Item 1')
    assert.equal(item.id, 0)
    assert.equal(item.creationDate, 888)
    assert.equal(item.authorId, 1)
    assert.equal(item.holderId, 2)
    assert.equal(item.currentBid, web3.toWei(1, 'ether'))
    assert.equal(item.tabletDueDate, 0)
    assert.equal(item.patronAddress, 0)
  })

  // it('should emit AddItem event', () => {
  //   assert(addItemEventResults.length, 1)
  // })

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
    await instance.AddItem('Item 2', 888, 0, 0)
    let item = utils.getItemObject(await instance.GetItemData(1))
    assert.equal(item.holderId, 0)

    await instance.ChangeItemHolder(1, 2)
    item = utils.getItemObject(await instance.GetItemData(1))
    assert.equal(item.holderId, 2)
  })

  it('should not allow not an owner to change holderId', async () => {
    let error
    try {
      await instance.ChangeItemHolder(1, 1, {from: accounts[1]})
    } catch (err) {
      error = err
    }

    assert.ok(error)
  })
})
