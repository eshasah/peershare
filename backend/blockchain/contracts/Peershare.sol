// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

// smart contract to add new user, new cars and any ride on the blockchain
contract Peershare {
    struct UserData {
        address ethAcc;
        bytes signature;
        bool isValue;
    }
    // state variables
    UserData[] public userData;
    mapping(uint256 => address) activeUsers;
    uint256 userCount = 0;

    constructor() {
        //if we need any state variables to be initialized
    }

    function getUsersInSystem() public view returns (int256) {
        return int256(userCount);
    }

    function getAllUsers() public view returns (address[] memory) {
        address[] memory ret = new address[](userCount);
        for (uint256 i = 0; i < userCount; i++) {
            ret[i] = activeUsers[i];
        }
        return ret;
    }

    function getUser(address ethereumAddress) public view returns (address) {
        // Verify if the user is unique in blockchain
        for (uint256 i = 0; i < userCount; i++) {
            if (activeUsers[i] == ethereumAddress) {
                return activeUsers[i];
            }
        }
        // if (activeUsers[ethereumAddress]) {
        //     //console.log(userSignature[userHash]);
        //     //user already exists
        //     return true;
        // }
        return address(0x0);
    }

    function addUser(address ethereumAddress) public returns (bool) {
        // Add user signature
        // activeUsers[ethereumAddress] = true;
        // userCount = userCount + 1;
        userCount = userCount + 1;
        activeUsers[userCount] = ethereumAddress;
        return true;
    }

    // TODO: add new car to blockchain
}
