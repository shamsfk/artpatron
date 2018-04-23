pragma solidity ^0.4.18;

contract ArtPatronData {
    struct Item {
        string title;
        uint authorId;
        uint holderId;
        uint creationDate;
        uint currentBid;
        uint tabletDueDate;
        address patronAddress;
    }

    struct Author {
        string name;
        uint birthDate;
    }

    struct Holder {
        string name;
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

    function GetItemData(uint _itemId) external view returns(
        string title,
        uint authorId,
        uint holderId,
        uint creationDate,
        uint currentBid,
        uint tabletDueDate,
        address patronAddress
    ) {
        require(items.length > _itemId);
        Item storage item = items[_itemId];

        title = item.title;
        authorId = item.authorId;
        holderId = item.holderId;
        creationDate = item.creationDate;
        currentBid = item.currentBid;
        tabletDueDate = item.tabletDueDate;
        patronAddress = item.patronAddress;
    }

    function GetAuthorData(uint _authorId) external view returns(
        string name,
        uint birthDate
    ) {
        require(authors.length > _authorId);
        Author storage author = authors[_authorId];

        name = author.name;
        birthDate = author.birthDate;
    }

    function GetHolderData(uint _holderId) external view returns(
        string name,
        uint countryId
    ) {
        require(holders.length > _holderId);
        Holder storage holder = holders[_holderId];

        name = holder.name;
        countryId = holder.countryId;
    }
}
