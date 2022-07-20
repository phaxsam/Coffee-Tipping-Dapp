pragma solidity ^0.8.9;


//deployed to goerli testnet @ 0xE67eF9a886a4E33FD0f5391D40bbAaF9694E70bD

contract GiftMeCoffe {

event NewMemo(address indexed from, uint256 timestamp, string name, string message);

struct Memo{
    address from;
    uint256 amountTipped;
    uint256 timestamp;
    string name;
    string message;
}

Memo[] memos;

address payable public owner;

constructor(){
    owner = payable(msg.sender);
}

function buyCoffe(string memory _name, string  memory _message) public payable {
    require(msg.value > 0, "youcan not give me nothing");

//Adding memo to the storage
    memos.push(Memo(
        msg.sender,
        msg.value,
        block.timestamp,
        _name,
        _message
    ));
    emit NewMemo(msg.sender, block.timestamp, _name, _message);
}

function goGetCoffeNow() public {
    require(owner.send(address(this).balance), "Thanks helping me to withdraw");
}

function getMemos() public view returns(Memo[] memory) {
    return memos;
}

}