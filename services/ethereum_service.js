var Web3 = require('web3');
var solc = require('solc');
let fs = require("fs");

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
    this.MAXMESSAGES = 1024;
  }

  createRoom(userAddress, keystore, password) {
    web3.eth.defaultAccount = userAddress;
    var wallet = web3.eth.accounts.wallet.decrypt([JSON.parse(keystore)], password);
    var privateKey = wallet[0].privateKey;
    var account = web3.eth.accounts.privateKeyToAccount(privateKey);

    let code = '0x' + fs.readFileSync('services/chatRoom_sol_ChatRoom.bin');
    var messageContract = new web3.eth.Contract(this.abi);
    return messageContract.deploy({
        data: code,
      }).send({
        from: userAddress,
        gas: 1500000,
    }, function(error, transactionHash){  })
    .then(function(newContractInstance){
      return newContractInstance.options.address;
    });

  }

  inviteUserToRoom(userAddress, roomAddress, keystore, password, otherUserAddress) {
    web3.eth.defaultAccount = userAddress;
    var wallet = web3.eth.accounts.wallet.decrypt([JSON.parse(keystore)], password);
    var privateKey = wallet[0].privateKey;
    var account = web3.eth.accounts.privateKeyToAccount(privateKey);

    var messageContract = new web3.eth.Contract(this.abi, roomAddress);
    var invite = messageContract.methods.makeMember(otherUserAddress);
    var encodedABI = invite.encodeABI();

    var tx = {
      from: userAddress,
      to: roomAddress,
      gas: 2000000,
      data: encodedABI
    };

    return web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
      return web3.eth.sendSignedTransaction(signed.rawTransaction);
    });
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
            return results;
          }));
        }

        return Promise.all(calls);
      });
  }

  writeMessage(userAddress, roomAddress, keystore, password, message) {
    web3.eth.defaultAccount = userAddress;
    var wallet = web3.eth.accounts.wallet.decrypt([JSON.parse(keystore)], password);
    var privateKey = wallet[0].privateKey;
    var account = web3.eth.accounts.privateKeyToAccount(privateKey);

    var messageContract = new web3.eth.Contract(this.abi, roomAddress);
    var invite = messageContract.methods.addMessage(message);
    var encodedABI = invite.encodeABI();

    var tx = {
      from: userAddress,
      to: roomAddress,
      gas: 2000000,
      data: encodedABI
    };

    return web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
      return web3.eth.sendSignedTransaction(signed.rawTransaction);
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

  getTotalMessages(userAddress, roomAddress) {
    web3.eth.defaultAccount = userAddress;
    var messageContract = new web3.eth.Contract(this.abi, roomAddress);
    return messageContract.methods.messageCnt().call()
      .then(function(results) {
        return results;
    });
  }
}

/*
var user1Public = '0x4Def9c6EF3b6874e0F72443983980E4Fd0f9e2a3';
var user1Keystore = '{"address":"4def9c6ef3b6874e0f72443983980e4fd0f9e2a3","crypto":{"cipher":"aes-128-ctr","ciphertext":"e2d64542e496cf256fcaf2c8550f7b96c97de77193e68fafee994b5c23be2938","cipherparams":{"iv":"7918c5a1351779ab51de1518c2420bdf"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"66c1330c02d6d4a200e2a692f07606c4b99c8bcbf72f4e0e93a370c3089952de"},"mac":"0587c99632b758307b774d60a86135be3e63e9768f6bb79218009eb7965bdd47"},"id":"bbf299eb-3e10-46c1-8ae2-3c16a62d7b16","version":3}'

var user2Public = '0xa67ca4e40a07793b9e45978285fc4d2188536a0d';
var user2Keystore = '{"address":"a67ca4e40a07793b9e45978285fc4d2188536a0d","crypto":{"cipher":"aes-128-ctr","ciphertext":"a9cc594de096fa3b45097f4f5591000f4da0d3a09726917a9dce81fea856268f","cipherparams":{"iv":"7eb5cc097ee3966ac29a5d6b5392b872"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"9280a95ded2ccec3d6e47824502f2295321d9c53a2e8cf389ded1ccd58dfee6f"},"mac":"1857a9ef7fcf149b39a612aa39eff8a899cae939157c1d045225632546645fdc"},"id":"f55b079a-ef90-4e4c-a0c3-85b6a02dbdd5","version":3}';
var user2Pass = 'hackathon'

var user3Public = '0x50F6A47427730e86FA6fE7B4f8eBd6fc41e7Ac94';
var user3Keystore = '{"address":"50f6a47427730e86fa6fe7b4f8ebd6fc41e7ac94","crypto":{"cipher":"aes-128-ctr","ciphertext":"805ef64bc4fdae6932dbad536c11498def104792230fa56df96ca969f239636a","cipherparams":{"iv":"0f7a4dce4520352c2c7c3f087a8c04b2"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"cbb3f363dd92c4f25dd50573a7c65c039e96dcecdef9f3fb95eeefd3fad8e834"},"mac":"f50e9552780a32ce1d765f2887c8261a50629eb55ca69c71b9256b7a24b2b900"},"id":"1718d3fc-4ec8-4134-b2cf-cd9c812ee1c4","version":3}'
var user3Pass = 'hackathon'

var ethere = new EthereumService();
var roomAddress = '0xdEA54629fbBc62DcbcEA615f38c60D0Dec4088b9';
ethere.readMessages(user2Public, roomAddress).then(console.log)

*/
/*
ethere.createRoom(user2Public, user2Keystore, user2Pass)
.then(function(chatroom){
  console.log(chatroom);
  ethere.inviteUserToRoom(user2Public, chatroom, user2Keystore, user2Pass, user3Public)
  .then(function(){
    ethere.isMemberOfChat(user3Public,chatroom).then(console.log);
    ethere.writeMessage(user2Public, chatroom, user2Keystore, user2Pass, 'hello from node2')
    .then(function(){
      ethere.readMessages(user2Public, chatroom).then(console.log)
    })
  })
});
*/

module.exports = EthereumService;

