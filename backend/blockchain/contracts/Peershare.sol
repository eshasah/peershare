// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

// smart contract to add new user, new cars and any ride on the blockchain
contract Peershare {
    // state variables
    mapping(bytes32 => bytes) userSignature;
    uint256 userCount = 0;

    constructor() {
        //if we need any state variables to be initialized
    }

    function getUsersInSystem() public view returns (uint256) {
        return uint256(userCount);
    }

    function addUser(bytes32 userHash, bytes memory signature)
        public
        returns (bool)
    {
        // Verify if the user is unique in blockchain
        if (bytes(userSignature[userHash]).length > 0) {
            //console.log(userSignature[userHash]);
            //user already exists
            return false;
        }

        // Add user signature
        userSignature[userHash] = signature;
        userCount = userCount + 1;

        return true;
    }

    // TODO: add new car to blockchain
}
