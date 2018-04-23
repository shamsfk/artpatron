/* global artifacts contract it assert before */

var ArtPatron = artifacts.require('./ArtPatron.sol')

contract('ArtPatronDataManagement', (accounts) => {
  let instance

  before(async () => {
    instance = await ArtPatron.deployed()

    await instance.AddAuthor('Monet1', 71)
    await instance.AddAuthor('Monet2', 72)

    await instance.AddHolder('Museum1', 71)
    await instance.AddHolder('Museum2', 72)
    await instance.AddHolder('Museum3', 73)
  })

  it('should add Authors and Holders', async () => {
    let length = await instance.GetAuthorsLength.call()
    assert.equal(length, 2)

    length = await instance.GetHoldersLength.call()
    assert.equal(length, 3)
  })

  it('should read Author', async () => {
    let name = await instance.GetAuthorName(0)
    assert.equal(name, 'Monet1')

    let birthDate = await instance.GetAuthorBirthDate(0)
    assert.equal(birthDate, 71)
  })

  it('should read Holder', async () => {
    let name = await instance.GetHolderName.call(0)
    assert.equal(name, 'Museum1')

    let countryId = await instance.GetHolderCountryId.call(0)
    assert.equal(countryId, 71)
  })

  it('should add and read Item', async () => {
    await instance.AddItem('Item 1', 888, 1, 2)

    let length = await instance.GetItemsLength.call()
    assert.equal(length, 1)

    let title = await instance.GetItemTitle.call(0)
    assert.equal(title, 'Item 1')

    let creationDate = await instance.GetItemCreationDate.call(0)
    assert.equal(creationDate, 888)

    let authorId = await instance.GetItemAuthorId.call(0)
    assert.equal(authorId, 1)

    let holderId = await instance.GetItemHolderId.call(0)
    assert.equal(holderId, 2)
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
    let holderId = await instance.GetItemHolderId.call(1)
    assert.equal(holderId, 0)

    await instance.ChangeItemHolder(1, 2)
    holderId = await instance.GetItemHolderId.call(1)
    assert.equal(holderId, 2)
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
