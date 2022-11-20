// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.11;
pragma solidity >=0.4.22 <0.9.0;
import "./ECDSA.sol";

// smart contract to add new user, new cars and any ride on the blockchain
contract Peershare {
    // state variables
    //user registration
    mapping(bytes32 => bytes) public userSignature;
    mapping(uint256 => address) public activeUsers;
    uint256 userCount = 0;
    //car management
    mapping(bytes32 => bytes) public borrowerSignature;
    mapping(bytes32 => bytes) public ownerSignature;

    // payment transaction
    mapping(address => uint256) private balances;
    event Transfer(address indexed from, address indexed to, uint256 value);

    function getUser(address ethereumAddress) public view returns (address) {
        address res = address(0x0);
        // Verify if the user is unique in blockchain
        for (uint256 i = 0; i < userCount; i++) {
            if (activeUsers[i] == ethereumAddress) {
                res = activeUsers[i];
            }
        }
        return res;
    }

    function addUser(
        address ethereumAddress,
        bytes32 userHash,
        bytes memory signature
    ) public returns (bool) {
        // Add user address
        userCount = userCount + 1;
        activeUsers[userCount] = ethereumAddress;

        //storing signature
        userSignature[userHash] = signature;
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

    // function transferFrom(
    //     address payable sender,
    //     address payable recipient,
    //     uint256 amount
    // ) external payable returns (bool) {
    //     _transfer(sender, recipient, amount);
    //     //_approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "BEP20: transfer amount exceeds allowance"));
    //     return true;
    // }

    // function _transfer(
    //     address payable sender,
    //     address payable recipient,
    //     uint256 amount
    // ) internal {
    //     require(sender != address(0), "BEP20: transfer from the zero address");
    //     require(recipient != address(0), "BEP20: transfer to the zero address");
    //     //balances[sender] = balances[sender].sub(amount, "BEP20: transfer amount exceeds balance");
    //     //balances[sender] -=amount;
    //     //balances[recipient]+=amount;
    //     // balances[recipient] = balances[recipient].add(amount);
    //     emit Transfer(sender, recipient, amount);
    // }

    // function getBalance(address sender) public view returns (uint256) {
    //     return address(sender).balance;
    // }

    // function sendViaCall(address payable _to) public payable {
    //     // Call returns a boolean value indicating success or failure.
    //     // This is the current recommended method to use.
    //     (bool sent, bytes memory data) = _to.call{value: msg.value}("");
    //     require(sent, "Failed to send Ether");
    // }

    // function transferToOwner() external {
    //     require(
    //         msg.sender == 0x3c0D14AAdc11C4F5af19e628bB0B9216248efB1E,
    //         "caller is not owner"
    //     );
    //     payable(msg.sender).transfer(1000000);
    // }
}
