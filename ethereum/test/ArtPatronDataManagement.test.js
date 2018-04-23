/* global artifacts contract it assert */

var ArtPatron = artifacts.require('./ArtPatron.sol')

contract('ArtPatronDataManagement', (accounts) => {
  it('should add and read Author', async () => {
    let instance = await ArtPatron.deployed()

    await instance.AddAuthor('Monet', 777)

    let length = await instance.GetAuthorsLength.call()
    assert.equal(length, 1)

    let name = await instance.GetAuthorName(0)
    assert.equal(name, 'Monet')

    let birthDate = await instance.GetAuthorBirthDate(0)
    assert.equal(birthDate, 777)
  })

  it('should add and read Holder', async () => {
    let instance = await ArtPatron.deployed()

    await instance.AddHolder('Museum', 7)

    let length = await instance.GetHoldersLength.call()
    assert.equal(length, 1)

    let name = await instance.GetHolderName.call(0)
    assert.equal(name, 'Museum')

    let countryId = await instance.GetHolderCountryId.call(0)
    assert.equal(countryId, 7)
  })

  it('should add and read Item', async () => {
    let instance = await ArtPatron.deployed()

    // await instance.AddAuthor('Monet', 777)
    // await instance.AddHolder('Museum', 7)
    await instance.AddItem('Item 1', 888, 0, 0)

    let length = await instance.GetItemsLength.call()
    assert.equal(length, 1)

    let title = await instance.GetItemTitle.call(0)
    assert.equal(title, 'Item 1')
  })
})
