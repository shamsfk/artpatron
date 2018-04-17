pragma solidity ^0.4.18;

contract ArtPatronData {
    struct Item {
        string name;
        uint creationDate;
        uint currentBid;
        uint patronshipDate;
        uint patronshipDuration;
        address patronAddress;
    }

    struct Author {
        string name;
        uint birthDate;
    }

    struct Holder {
        string name;
        uint16 countryId;
    }

    Item[] internal items;
    Author[] internal authors;
    Holder[] internal holders;

    mapping (uint => uint) internal itemToAuthor;
    mapping (uint => uint) internal itemToHolder;
}
