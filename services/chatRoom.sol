pragma solidity ^0.4.18;

contract ChatRoom {
    
    struct Member {
        address name;
        bool isMember;
    }
    
    struct Message {
        string value;
    }
    
    mapping(address => Member) members;
    Message[255] messages;
    uint public messageCnt = 0;
    address admin;
    
    function ChatRoom() public {
        admin = msg.sender;
        members[admin].isMember = true;
    }
    
    function makeMember(address toMember) public {
        if (!isMember()) {
            return;
        }
        members[toMember].isMember = true;
    }
    
    function addMessage(string message_) public {
        if (!isMember()) {
            return;
        }
        messages[messageCnt].value = message_;
        messageCnt++;
    }
    
    function isMember() public view returns (bool) {
        Member storage acc = members[msg.sender];
        return acc.isMember;
    }
    
    function displaymessage(uint msgNum) public view returns (string message_) {
        if (!isMember()) {
            return;
        }
        message_ = messages[msgNum].value;
    }
}