pragma solidity ^0.4.18;

contract Ownable {
    address manager;

    function Ownable() public {
        manager = msg.sender;
    }

    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }
}
