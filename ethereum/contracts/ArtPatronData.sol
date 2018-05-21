pragma solidity ^0.4.21;

/** @title Art Patron Data constract
* @dev Holds data of all Items, Authors and Museums
* @dev Data is stored in arrays
* @dev There is no write access in this contract
*/
contract ArtPatronData {
    struct Item {
        string name;            // Name of an item eg: "Mona Lisa"
        uint id;                // Index of an item in items array
        uint authorId;          // Index of an author in authors array
        uint museumId;          // Index of a museum in museums array
        uint creationDate;      // Date of item's creation
        uint currentBid;        // Price current patron payed
        uint marketDate;        // Date when item will be tradeable
        address patronAddress;  // Adress of current patron
    }

    struct Author {
        string name;        // Author's name
        uint id;            // Index of an author in authors array
        uint birthDate;     // Birth date of an author
    }

    struct Museum {
        string name;        // Museum's name
        uint id;            // Index of a museum in museums array
        uint16 countryId;   // Numerical index of a country museum resides in
    }

    Item[] internal items;
    Author[] internal authors;
    Museum[] internal museums;

    mapping (address => uint) public ownedItemsCount;

    /**
    * @dev Returns length of items array
    */
    function GetItemsLength() external view returns (uint) {
        return items.length;
    }

    /**
    * @dev Returns length of authors array
    */
    function GetAuthorsLength() external view returns(uint) {
        return authors.length;
    }

    /**
    * @dev Returns length of museums array
    */
    function GetMuseumsLength() external view returns(uint) {
        return museums.length;
    }

    /**
    * @dev Data of a single item
    * @param _itemId Index of an item in items array
    * @return Tuple with item's data (use contractUtils.js to convert to js object)
    */
    function GetItemData(uint _itemId) external view
        returns (
            string name,
            uint id,
            uint authorId,
            uint museumId,
            uint creationDate,
            uint currentBid,
            uint marketDate,
            address patronAddress
        )
    {
        require(items.length > _itemId);
        Item storage item = items[_itemId];

        name = item.name;
        id = item.id;
        authorId = item.authorId;
        museumId = item.museumId;
        creationDate = item.creationDate;
        currentBid = item.currentBid;
        marketDate = item.marketDate;
        patronAddress = item.patronAddress;
    }

    /**
    * @dev Data of a single author
    * @param _authorId Index of an author in authors array
    * @return Tuple with author's data (use contractUtils.js to convert to js object)
    */
    function GetAuthorData(uint _authorId) external view
        returns (
            string name,
            uint id,
            uint birthDate
        )
    {
        require(authors.length > _authorId);
        Author storage author = authors[_authorId];

        name = author.name;
        id = author.id;
        birthDate = author.birthDate;
    }

    /**
    * @dev Data of a single item
    * @param _museumId Index of an museum in museums array
    * @return Tuple with museum's data (use contractUtils.js to convert to js object)
    */
    function GetMuseumData(uint _museumId) external view
        returns (
            string name,
            uint id,
            uint countryId
        )
    {
        require(museums.length > _museumId);
        Museum storage museum = museums[_museumId];

        name = museum.name;
        id = museum.id;
        countryId = museum.countryId;
    }
}
