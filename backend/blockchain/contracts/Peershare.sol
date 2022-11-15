// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.11;
pragma solidity >=0.4.22 <0.9.0;
import "./ECDSA.sol";

// smart contract to add new user, new cars and any ride on the blockchain
contract Peershare {
    // state variables
    mapping(bytes32 => bytes) public borrowerSignature;
    mapping(bytes32 => bytes) public ownerSignature;
    mapping(bytes32 => bytes) userSignature;
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

    function addCar(bytes32 carHash, bytes memory signature)
        public
        returns (bool)
    {

        // Get signer from signature
        address signer = ECDSA.recover(
            ECDSA.toEthSignedMessageHash(
                keccak256(abi.encodePacked(carHash, msg.sender))
            ),
            signature
        );
        require(
            signer == msg.sender,
            "Unauthorised signer has been dectected."
        );

        ownerSignature[carHash] = signature;
        return true;
    }

    function rentCar(
        bytes32 carHash,
        address ownerAddress,
        bytes memory signature
    ) public returns (bool) {
        // Get address from owner signature
        address _ownerAddress = ECDSA.recover(
            ECDSA.toEthSignedMessageHash(
                keccak256(abi.encodePacked(carHash, ownerAddress))
            ),
            ownerSignature[carHash]
        );

        // Verify the car belong to the right owner
        require(
            _ownerAddress == ownerAddress,
            "Car does not belong to the owner."
        );

        // Get signer from signature
        address signer = ECDSA.recover(
            ECDSA.toEthSignedMessageHash(
                keccak256(abi.encodePacked(carHash, msg.sender))
            ),
            signature
        );

        // Verify the borrower address
        require(
            signer == msg.sender,
            "Unauthorised signer has been dectected."
        );

        // Add borrower signature
        borrowerSignature[carHash] = signature;

        return true;
    }

    function returnCar(bytes32 carHash, address ownerAddress)
        public
        returns (bool)
    {
        // Get address from owner signature
        address _ownerAddress = ECDSA.recover(
            ECDSA.toEthSignedMessageHash(
                keccak256(abi.encodePacked(carHash, ownerAddress))
            ),
            ownerSignature[carHash]
        );

        // Verify the car belong to the right owner
        require(
            _ownerAddress == ownerAddress,
            "Car does not belong to the owner."
        );

        // Get address from borrower signature
        address _borrowerAddress = ECDSA.recover(
            ECDSA.toEthSignedMessageHash(
                keccak256(abi.encodePacked(carHash, msg.sender))
            ),
            borrowerSignature[carHash]
        );

        // Verify the car returning belong to the right borrower
        require(
            _borrowerAddress == msg.sender,
            "Car does not belong to the borrower."
        );

        // Delete the borrower signature for the car
        delete borrowerSignature[carHash];

        return true;
    }
}
