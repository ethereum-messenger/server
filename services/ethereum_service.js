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
    this.abi = JSON.parse('[ { "constant": false, "inputs": [ { "name": "message_", "type": "string" } ], "name": "addMessage", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "msgNum", "type": "uint256" } ], "name": "displaymessage", "outputs": [ { "name": "message_", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "toMember", "type": "address" } ], "name": "makeMember", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "isMember", "outputs": [ { "name": "", "type": "bool", "value": true } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ]')    
  }

  createRoom(userAddress) {

  }

  inviteUserToRoom(userAddress, roomAddress) {

  }

  readMessages(userAddress, roomAddress, optionalLastMessage) {

  }

  writeMessage(userAddress, roomAddress, message) {
    
  }

  isMemberOfChat(userAddress, roomAddress) {
    web3.eth.defaultAccount = userAddress;
    var messageContract = new web3.eth.Contract(this.abi, roomAddress);
    return messageContract.methods.isMember().call()
      .then(function(results) {
        return results;
    });
  }
}
/*
var ethere = new EthereumService();
var res = ethere.isMemberOfChat('0x4Def9c6EF3b6874e0F72443983980E4Fd0f9e2a3', '0xe7Eb2369123258723bE494b09A8cd38976A5d1d4');
res.then(console.log);
*/