pragma solidity ^0.4.18;

import "./ArtPatronManagement.sol";

contract ArtPatron is ArtPatronManagement {
    function ArtPatron() public {
        authors.push(Author("Monet", 0));
        holders.push(Holder("Tretykovskaya Gallery", 7));

        items.push(Item("Item 1", 0, 0, 0, 1 ether, 0, 0, 0));
    }
}
