pragma solidity ^0.4.21;

import "./ArtPatronManagement.sol";
import "../../node_modules/zeppelin-solidity/contracts/payment/PullPayment.sol";

contract ArtPatronMarket is ArtPatronManagement, PullPayment {
    event PatronshipBought(uint itemId);

    /**
    * @dev Get a price to buy a patronship pf a given item (onlyOwner)
    * @param _itemId Index of an item to get patronship price of
    * @return Returns a price to buy a patronship (in Wei)
    */
    function GetPatronshipPrice(uint _itemId) external view returns(uint) {
        return items[_itemId].currentBid * 15000 / 10000; // 150%
    }

    /**
    * @dev Get an amount of reward to current patron if item is bougth (onlyOwner)
    * @param _itemId Index of an item to get reward amount of
    * @return Returns a reward amount (in Wei)
    */
    function GetPatronshipReward(uint _itemId) external view returns(uint) {
        return items[_itemId].currentBid * 14000 / 10000; // 140%
    }

    /**
    * @dev Get a fee amount that will be collected if item is bought (onlyOwner)
    * @param _itemId Index of an item to get a fee amount of
    * @return Returns a fee amount (in Wei)
    */
    function GetPatronshipFee(uint _itemId) external view returns(uint) {
        return this.GetPatronshipPrice(_itemId) - this.GetPatronshipReward(_itemId);
    }

    /**
    * @dev Attempts to buy an item
    * @dev value sent must be >= GetPatronshipPrice
    * @param _itemId Index of an item to buy patronship
    */
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
