pragma solidity ^0.4.21;

/// @title Art Patron Data constract
/// Holds data of all Items, Authors and Holders
/// @dev Data is stored in arrays
/// @dev There is no write access in this contract
/// @dev Read access
contract ArtPatronData {
    struct Item {
        string name;
        uint id;
        uint authorId;
        uint holderId;
        uint creationDate;
        uint currentBid;
        address patronAddress;
    }

    struct Author {
        string name;
        uint id;
        uint birthDate;
    }

    struct Holder {
        string name;
        uint id;
        uint16 countryId;
    }

    Item[] internal items;
    Author[] internal authors;
    Holder[] internal holders;

    mapping (uint => uint) internal itemToAuthor;
    mapping (uint => uint) internal itemToHolder;

    function GetItemsLength() external view returns (uint) {
        return items.length;
    }

    function GetAuthorsLength() external view returns(uint) {
        return authors.length;
    }

    function GetHoldersLength() external view returns(uint) {
        return holders.length;
    }

    function GetItemData(uint _itemId) external view
        returns (
            string name,
            uint id,
            uint authorId,
            uint holderId,
            uint creationDate,
            uint currentBid,
            address patronAddress
        )
    {
        require(items.length > _itemId);
        Item storage item = items[_itemId];

        name = item.name;
        id = item.id;
        authorId = item.authorId;
        holderId = item.holderId;
        creationDate = item.creationDate;
        currentBid = item.currentBid;
        patronAddress = item.patronAddress;
    }

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

    function GetHolderData(uint _holderId) external view
        returns (
            string name,
            uint id,
            uint countryId
        )
    {
        require(holders.length > _holderId);
        Holder storage holder = holders[_holderId];

        name = holder.name;
        id = holder.id;
        countryId = holder.countryId;
    }
}
