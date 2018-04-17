pragma solidity ^0.4.18;

import "./ArtPatronData.sol";

contract ArtPatronDataAccess is ArtPatronData {
    // Items

    function GetItemsLength() external view returns (uint) {
        return items.length;
    }

    function GetItemTitle(uint _id) external view returns(string) {
        return items[_id].title;
    }

    function GetItemAuthorId(uint _id) external view returns(uint) {
        return items[_id].authorId;
    }

    function GetItemHolderId(uint _id) external view returns(uint) {
        return items[_id].holderId;
    }

    function GetItemCreationDate(uint _id) external view returns(uint) {
        return items[_id].creationDate;
    }

    function GetItemCurrentBid(uint _id) external view returns(uint) {
        return items[_id].currentBid;
    }

    function GetItemTabletDueDate(uint _id) external view returns(uint) {
        return items[_id].tabletDueDate;
    }

    function GetItemPatronAddress(uint _id) external view returns(address) {
        return items[_id].patronAddress;
    }

    // Authors

    function GetAuthorsLength() external view returns(uint) {
        return authors.length;
    }

    function GetAuthorName(uint _id) external view returns(string) {
        return authors[_id].name;
    }

    function GetAuthorBirthDate(uint _id) external view returns(uint) {
        return authors[_id].birthDate;
    }

    // Holders

    function GetHoldersLength() external view returns(uint) {
        return holders.length;
    }

    function GetHolderName(uint _id) external view returns(string) {
        return holders[_id].name;
    }

    function GetHolderCountryId(uint _id) external view returns(uint16) {
        return holders[_id].countryId;
    }
}
