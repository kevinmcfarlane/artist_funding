pragma solidity >=0.4.21 <0.6.0;

/// @author Kevin McFarlane
/// @title Represents funding of an artist.
contract Funding {
    address public owner;

    constructor() public {
        // A sender of the message inside the constructor is a deployer.
        owner = msg.sender;
    }
}
