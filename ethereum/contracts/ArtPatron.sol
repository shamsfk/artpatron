pragma solidity ^0.4.18;

import "./ArtPatronManagement.sol";

contract ArtPatron is ArtPatronManagement {
    function constructor() public {

        // TODO: remove this code as it is intended for test only
        authors.push(Author("Monet", 0));
        holders.push(Holder("Tretykovskaya Gallery", 7));
        items.push(Item("Item 1", 0, 0, 0, 1 ether, 0, 0, 0));
        items.push(Item("Item 2", 0, 0, 0, 1 ether, 0, 0, 0));
        items.push(Item("Item 3", 0, 0, 0, 1 ether, 0, 0, 0));
    }
}
