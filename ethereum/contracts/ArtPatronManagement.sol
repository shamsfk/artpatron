pragma solidity ^0.4.21;

import "./ArtPatronData.sol";
import "../../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";

contract ArtPatronManagement is ArtPatronData, Ownable {
    address public collectorAddress; // address that collects fees and museum rewards

    event ItemAdded(uint itemId);
    event AuthorAdded(uint authorId);
    event HolderAdded(uint holderId);
    event ItemHolderChanged(uint itemId);

    /**
    * @dev Sets collectorAddress (to transfr fee to) onlyOwner
    * @param ca new collector address
    */
    function SetCollectorAddress(address ca) public onlyOwner {
        collectorAddress = ca;
    }

    /**
    * @dev Add new Item (onlyOwner)
    * @param _name Name of an item eg: "Mona Lisa"
    * @param _creationDate Date of item's creation
    * @param _marketDate Date when item will be tradeable
    * @param _authorId Index of an author in authors array
    * @param _holderId Index of a holder in holders array
    */
    function AddItem(
        string _name,
        uint _creationDate,
        uint _marketDate,
        uint _authorId,
        uint _holderId
    )
        public onlyOwner
    {
        require(authors.length > _authorId);
        require(holders.length > _holderId);

        require(bytes(_name).length > 0);

        items.push(Item(
            _name,
            items.length,
            _authorId,
            _holderId,
            _creationDate,
            1 ether,
            _marketDate,
            0
        ));

        emit ItemAdded(items.length - 1);
    }

    /**
    * @dev Add new Author (onlyOwner)
    * @param _name Author's name
    * @param _birthDate Date of author's birth
    */
    function AddAuthor(string _name, uint _birthDate)
        public onlyOwner
    {
        require(bytes(_name).length > 0);
        authors.push(Author(_name, authors.length, _birthDate));

        emit AuthorAdded(authors.length - 1);
    }

    /**
    * @dev Add new Holder (onlyOwner)
    * @param _name Hoder's name
    * @param _countryId Numerical index of a country holder resides in
    */
    function AddHolder(string _name, uint16 _countryId)
        public onlyOwner
    {
        require(bytes(_name).length > 0);
        holders.push(Holder(_name, holders.length, _countryId));

        emit HolderAdded(holders.length - 1);
    }

    /**
    * @dev Change Item's Holder (onlyOwner)
    * @param _itemId Index of an item in items array
    * @param _newHolderId Index of a new holder in holders array
    */
    function ChangeItemHolder(uint _itemId, uint _newHolderId)
        external onlyOwner
    {
        items[_itemId].holderId = _newHolderId;

        emit ItemHolderChanged(_itemId);
    }
}
