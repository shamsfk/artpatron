pragma solidity ^0.4.21;

import "./ArtPatronManagement.sol";

contract ArtPatronMarket is ArtPatronManagement {
    mapping(address => uint) public addressToWithdrawlAmount;

    function GetPatronshipPrice(uint _itemId) external view returns(uint) {
        return items[_itemId].currentBid * 15000 / 10000;
    }

    function BuyPatronship (uint _itemId) external payable {
        require(_itemId < items.length);

        Item storage item = items[_itemId];

        require(msg.value == this.GetPatronshipPrice(_itemId));
        require(msg.sender != item.patronAddress);
    }
}
