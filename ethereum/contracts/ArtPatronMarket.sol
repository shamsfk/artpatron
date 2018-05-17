pragma solidity ^0.4.21;

import "./ArtPatronManagement.sol";
import "../../node_modules/zeppelin-solidity/contracts/payment/PullPayment.sol";

contract ArtPatronMarket is ArtPatronManagement, PullPayment {
    event PatronshipBought(uint itemId);

    function GetPatronshipPrice(uint _itemId) external view returns(uint) {
        return items[_itemId].currentBid * 15000 / 10000; // 150%
    }

    function GetPatronshipReward(uint _itemId) external view returns(uint) {
        return items[_itemId].currentBid * 14000 / 10000; // 140%
        // 7% left goes to a holder, 3% left goes to the foundation
    }

    function BuyPatronship (uint _itemId) external payable {
        require(collectorAddress != 0);
        require(_itemId < items.length);

        Item storage item = items[_itemId];

        uint price = this.GetPatronshipPrice(_itemId);
        uint reward = this.GetPatronshipReward(_itemId);

        require(msg.value > price);
        require(msg.sender != item.patronAddress);

        if (item.patronAddress != 0) {
            asyncSend(item.patronAddress, reward);
            asyncSend(collectorAddress, price - reward);
        } else {
            asyncSend(collectorAddress, msg.value);
        }

        item.currentBid = msg.value;
        item.patronAddress = msg.sender;

        emit PatronshipBought(_itemId);
    }
}
