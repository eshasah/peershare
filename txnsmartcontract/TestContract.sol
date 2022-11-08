pragma solidity ^0.8.4;

// library SafeMath {
// function sub(uint256 a, uint256 b) internal pure returns (uint256) {
//     return sub(a, b, "SafeMath: subtraction overflow");
//   }

//   function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
//     require(b <= a, errorMessage);
//     uint256 c = a - b;

//     return c;
//   }
//    function add(uint256 a, uint256 b) internal pure returns (uint256) {
//     uint256 c = a + b;
//     require(c >= a, "SafeMath: addition overflow");
//     return c;
//   }
// }
contract TestContract{
   // using SafeMath for uint256;
    mapping (address => uint256) private balances;
   
     event Transfer(address indexed from, address indexed to, uint256 value);

function transferFrom(address payable sender, address payable recipient, uint256 amount) external  payable returns (bool) {
    _transfer(sender, recipient, amount);
    //_approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "BEP20: transfer amount exceeds allowance"));
    return true;
  }
 
function _transfer(address payable sender, address payable recipient, uint256 amount) internal  {
    require(sender != address(0), "BEP20: transfer from the zero address");
    require(recipient != address(0), "BEP20: transfer to the zero address");
  //balances[sender] = balances[sender].sub(amount, "BEP20: transfer amount exceeds balance");
  //balances[sender] -=amount; 
  //balances[recipient]+=amount;
  // balances[recipient] = balances[recipient].add(amount);
    emit Transfer(sender, recipient, amount);
  }
  
   function getBalance(address sender) public view returns (uint) {
        return address(sender).balance;
    }
      function sendViaCall(address payable _to) public payable {
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    function transferToOwner()  external{
require(msg.sender==0x3c0D14AAdc11C4F5af19e628bB0B9216248efB1E,"caller is not owner");
payable(msg.sender).transfer(1000000);

    }
}