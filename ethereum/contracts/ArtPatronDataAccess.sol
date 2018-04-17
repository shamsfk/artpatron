pragma solidity ^0.4.18;

import "./ArtPatronData.sol";

contract ArtPatronDataAccess is ArtPatronData {
    function GetItemsLength() external view returns (uint) {
        return items.length;
    }

    function GetItemName(uint _id) external view returns(string) {
        return items[_id].name;
    }

    function GetItemCreationDate(uint _id) external view returns(uint) {
        return items[_id].creationDate;
    }

    function GetItemCurrentBid(uint _id) external view returns(uint) {
        return items[_id].currentBid;
    }

    function GetItemPatronshipDate(uint _id) external view returns(uint) {
        return items[_id].patronshipDate;
    }

    function GetItemPatronAddress(uint _id) external view returns(address) {
        return items[_id].patronAddress;
    }
}
