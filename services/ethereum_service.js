var Web3 = require('web3');
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


class EthereumService {
  constructor() {
    // logic to setup, may want to make singleton, don't know
    this.abi = JSON.parse('[ { "constant": false, "inputs": [ { "name": "message_", "type": "string" } ], "name": "addMessage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "msgNum", "type": "uint256" } ], "name": "displaymessage", "outputs": [ { "name": "message_", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "toMember", "type": "address" } ], "name": "makeMember", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "isMember", "outputs": [ { "name": "", "type": "bool", "value": true } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "messageCnt", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ]')    
    this.MAXMESSAGES = 255;
  }

  createRoom(userAddress) {

  }

  inviteUserToRoom(userAddress, roomAddress) {

  }

  readMessages(userAddress, roomAddress, optionalLastMessage = 0) {
    web3.eth.defaultAccount = userAddress;
    var messageContract = new web3.eth.Contract(this.abi, roomAddress);
    var calls = [];
    
    return this.getTotalMessages(userAddress, roomAddress)
      .then( function(numMessages) {
        if(numMessages == 0) {
          return [];
        }
        for(var i = optionalLastMessage; i < numMessages; i++) {
          calls.push(
          messageContract.methods.displaymessage(i).call()
          .then(function(results) {
            console.log(results);
            return results;
          }));
        }

        return Promise.all(calls);
      });
  }

  writeMessage(userAddress, roomAddress, message) {
    web3.eth.defaultAccount = userAddress;
    var messageContract = new web3.eth.Contract(this.abi, roomAddress);
    return messageContract.methods.addMessage(message).call()
    .then(function(results) {
      return results;
  });
  }

  isMemberOfChat(userAddress, roomAddress) {
    web3.eth.defaultAccount = userAddress;
    var messageContract = new web3.eth.Contract(this.abi, roomAddress);
    return messageContract.methods.isMember().call()
      .then(function(results) {
        return results;
    });
  }

  getTotalMessages(userAddress, roomAddress)
  {
    web3.eth.defaultAccount = userAddress;
    var messageContract = new web3.eth.Contract(this.abi, roomAddress);
    return messageContract.methods.messageCnt().call()
      .then(function(results) {
        return results;
    });
  }
}

/*
var ethere = new EthereumService();
var res = ethere.writeMessage('0x4Def9c6EF3b6874e0F72443983980E4Fd0f9e2a3', '0x3155588c22986872aD9BF29F96474b8FBf2986f6', 'hello from node');
res.then(console.log);
*/
