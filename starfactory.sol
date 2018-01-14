pragma solidity ^0.4.19;

import "./ownable.sol";

contract StarFactory is Ownable {

    struct Star {
        string name;
        uint latitude;
        uint longitude;
    }

    event NewStar(id, _name, _latitude, _longitude);

    Star[] public stars;

    // mapping is like a dictionary, and address an eth address type
    mapping (uint => address) public starToOwner;
    mapping (address => uint) ownerStarCount;

    // note: external (not used here) can only be called outside the contract
    function createStar(string _name, uint _latitude, uint _longitude) onlyOwner {
        uint id = stars.push(Star(_name, _dna, _longitude);
        // msg.sender is the address of the caller
        starToOwner[id] = msg.sender;
        ownerStarCount[msg.sender]++;
        // call the event, so the listeners will get the notice of a new created star
        NewStar(id, _name, _latitude, _longitude);
    }

    // view functions can access but not change storage variables
    // note: pure (not used here) is all self contained and only uses the parameters

}
