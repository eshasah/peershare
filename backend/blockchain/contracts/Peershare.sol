// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.11;
pragma solidity ^0.5.0;
import "./ECDSA.sol";

// smart contract to add new user, new cars and any ride on the blockchain
contract Peershare {
    // state variables
    //user registration
    mapping(address => string) public userSignature;
    mapping(address => bool) public activeUsers;
    uint256 userCount = 0;
    //car management
    mapping(bytes32 => bytes) public borrowerSignature;
    mapping(bytes32 => bytes) public ownerSignature;

    // payment transaction
    mapping(address => uint256) private balances;
    event Transfer(address indexed from, address indexed to, uint256 value);
    event AddUser(address indexed user);
    event AddCar(bytes ownerSignature, bytes32 carHash);
    event RentCar(bytes borrowerSignature, bytes32 carHash);
    event ReturnCar(bytes borrowerSignature, bytes32 carHash);

    function getUserCount() public view returns (uint256) {
        return uint256(userCount);
    }

    function getUser(address ethereumAddress) public view returns (uint256) {
        if (activeUsers[ethereumAddress]) {
            return uint256(0);
        }
        return uint256(1);
    }

    function addUser(address ethereumAddress, string memory userHash)
        public
        returns (bool)
    {
        // Add user address
        userCount = userCount + 1;
        activeUsers[ethereumAddress] = true;

        //storing signature
        userSignature[ethereumAddress] = userHash;

        emit AddUser(ethereumAddress);
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
        emit AddCar(signature, carHash);
        return bool(true);
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
        emit RentCar(signature, carHash);
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
        emit ReturnCar(borrowerSignature[carHash], carHash);
        return true;
    }

    function transferFrom(
        address payable sender,
        address payable recipient,
        uint256 amount
    ) external payable returns (bool) {
        _transfer(sender, recipient, amount);
        //_approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "BEP20: transfer amount exceeds allowance"));
        return true;
    }

    function _transfer(
        address payable sender,
        address payable recipient,
        uint256 amount
    ) internal {
        require(sender != address(0), "BEP20: transfer from the zero address");
        require(recipient != address(0), "BEP20: transfer to the zero address");
        //balances[sender] = balances[sender].sub(amount, "BEP20: transfer amount exceeds balance");
        //balances[sender] -=amount;
        //balances[recipient]+=amount;
        // balances[recipient] = balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }

    function getBalance(address sender) public view returns (uint256) {
        return address(sender).balance;
    }
}
