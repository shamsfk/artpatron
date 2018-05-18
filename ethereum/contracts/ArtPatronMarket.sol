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
    }

    function GetPatronshipFee(uint _itemId) external view returns(uint) {
        return this.GetPatronshipPrice(_itemId) - this.GetPatronshipReward(_itemId);
    }

    function BuyPatronship (uint _itemId) external payable {
        require(collectorAddress != 0);
        require(_itemId < items.length);

        Item storage item = items[_itemId];

        uint price = this.GetPatronshipPrice(_itemId);
        uint reward = this.GetPatronshipReward(_itemId);
        uint fee = this.GetPatronshipFee(_itemId);

        require(msg.value >= price);
        require(msg.sender != item.patronAddress); // lets not buy from ourselves

        if (item.patronAddress != 0) {
            // if there is a patron send him reward and fee to collector
            asyncSend(item.patronAddress, reward);
            asyncSend(collectorAddress, fee);
        } else {
            // if there is no patron (first purchase) send all to collector
            asyncSend(collectorAddress, msg.value);
        }

        item.currentBid = msg.value;
        item.patronAddress = msg.sender;

        emit PatronshipBought(_itemId);
    }
}
