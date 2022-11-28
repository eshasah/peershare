// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.11;
pragma solidity ^0.5.0;

// smart contract to add new user, new cars and any ride on the blockchain
contract Peershare {
    // state variables
    //user registration
    mapping(address => string) public userSignature;
    mapping(address => bool) public activeUsers;
    uint256 userCount = 0;
    //car management
    mapping(string => address) public borrowerSignature;
    mapping(string => address) public ownerSignature;
    uint256 carCount = 0;
    // payment transaction
    mapping(address => uint256) private balances;

    //events to broadcast the changes
    event Transfer(address indexed from, address indexed to, uint256 value);
    event AddUser(address indexed user);
    event AddCar(address indexed owner, string carHash);
    event RentCar(address indexed borrower, string carHash);
    event ReturnCar(address indexed borrower, string carHash);

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

    function getCarCount() public view returns (uint256) {
        return uint256(carCount);
    }

    function addCar(string memory carHash, address owner)
        public
        returns (bool)
    {
        // add owner to the owner map array
        ownerSignature[carHash] = owner;
        carCount = carCount + 1;

        emit AddCar(owner, carHash);
        return bool(true);
    }

    function rentCar(string memory carHash, address borrower)
        public
        returns (bool)
    {
        // Add borrower to the borrower map array
        borrowerSignature[carHash] = borrower;
        emit RentCar(borrower, carHash);
        return true;
    }

    function returnCar(string memory carHash, address borrower)
        public
        returns (bool)
    {
        // Delete the borrower signature for the car
        delete borrowerSignature[carHash];
        emit ReturnCar(borrower, carHash);
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
