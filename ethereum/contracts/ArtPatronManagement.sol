pragma solidity ^0.4.18;

import "./ArtPatronData.sol";
import "../../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";

contract ArtPatronManagement is ArtPatronData, Ownable {
    function AddItem(
        string _name,
        uint _creationDate,
        uint _authorId,
        uint _holderId
    )
        external onlyOwner
    {
        require(authors.length > _authorId);
        require(holders.length > _holderId);

        require(bytes(_name).length > 0);

        items.push(Item(
            _name,
            _authorId,
            _holderId,
            _creationDate,
            1 ether,
            0,
            0
        ));
    }

    function AddAuthor(string _name, uint _birthDate)
        external onlyOwner
    {
        require(bytes(_name).length > 0);
        authors.push(Author(_name, _birthDate));
    }

    function AddHolder(string _name, uint16 _countryId)
        external onlyOwner
    {
        require(bytes(_name).length > 0);
        holders.push(Holder(_name, _countryId));
    }

    function ChangeItemHolder(uint _itemId, uint _newHolderId)
        external onlyOwner
    {
        items[_itemId].holderId = _newHolderId;
    }
}
