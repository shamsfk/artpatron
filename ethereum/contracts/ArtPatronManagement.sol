pragma solidity ^0.4.21;

import "./ArtPatronData.sol";
import "../../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";

contract ArtPatronManagement is ArtPatronData, Ownable {
    address public collectorAddress; // address that collects fees and museum rewards

    event ItemAdded(uint itemId);
    event AuthorAdded(uint authorId);
    event MuseumAdded(uint museumId);
    event ItemMuseumChanged(uint itemId);

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
    * @param _museumId Index of a museum in museums array
    */
    function AddItem(
        string _name,
        uint _creationDate,
        uint _marketDate,
        uint _authorId,
        uint _museumId
    )
        public onlyOwner
    {
        require(authors.length > _authorId);
        require(museums.length > _museumId);

        require(bytes(_name).length > 0);

        items.push(Item(
            _name,
            items.length,
            _authorId,
            _museumId,
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
    * @dev Add new Museum (onlyOwner)
    * @param _name Hoder's name
    * @param _countryId Numerical index of a country museum resides in
    */
    function AddMuseum(string _name, uint16 _countryId)
        public onlyOwner
    {
        require(bytes(_name).length > 0);
        museums.push(Museum(_name, museums.length, _countryId));

        emit MuseumAdded(museums.length - 1);
    }

    /**
    * @dev Change Item's Museum (onlyOwner)
    * @param _itemId Index of an item in items array
    * @param _newMuseumId Index of a new museum in museums array
    */
    function ChangeItemMuseum(uint _itemId, uint _newMuseumId)
        external onlyOwner
    {
        items[_itemId].museumId = _newMuseumId;

        emit ItemMuseumChanged(_itemId);
    }
}
