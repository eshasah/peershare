// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./ECDSA.sol";

// smart contract to add new user, new cars and any ride on the blockchain
contract Peershare {
    mapping(bytes32 => bytes) userSignature;

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

        return true;
    }

    // TODO: add new car to blockchain
}
