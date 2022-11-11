// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.11;
pragma solidity >=0.4.22 <0.9.0;

// smart contract to add new user, new cars and any ride on the blockchain
contract Peershare {
    // state variables
    int256[] public ownerSignature;
    mapping(int256 => int256) public borrowerSignature;
    mapping(bytes32 => bytes) userSignature;
    mapping(uint256 => address) activeUsers;
    uint256 userCount = 0;

    function getUser(address ethereumAddress) public view returns (address) {
        // Verify if the user is unique in blockchain
        for (uint256 i = 0; i < userCount; i++) {
            if (activeUsers[i] == ethereumAddress) {
                return activeUsers[i];
            }
        }
        return address(0x0);
    }

    function addUser(address ethereumAddress) public returns (bool) {
        // Add user address
        userCount = userCount + 1;
        activeUsers[userCount] = ethereumAddress;
        return true;
    }

    function addCar(int256 user_id) public returns (bool) {
        ownerSignature.push(user_id);
        return true;
    }

    function rentCar(int256 user_id, int256 car_id) public returns (bool) {
        borrowerSignature[user_id] = car_id;
        return true;
    }
}
