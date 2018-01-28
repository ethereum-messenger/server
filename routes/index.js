const express = require('express');
const router = express.Router();
const EthereumService = require('../services/ethereum_service');

router.post('/rooms', async (req, res, next) => {
  const {userAddress, keystore, password} = req.body;
  const service = new EthereumService();
  console.log('in rooms');
  try {
    const roomAddress = await service.createRoom(userAddress, keystore, password);
    res.json({userAddress, roomAddress});
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.post('/invitations', async (req, res, next) => {
  const {userAddress, roomAddress, keystore, password, inviteeAddress} = req.body;
  //console.log(userAddress, roomAddress, keystore, password, inviteeAddress);
  const service = new EthereumService();
  try {
    const response = await service.inviteUserToRoom(userAddress, roomAddress, keystore, password, inviteeAddress);
    res.json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.get('/rooms/messages', async (req, res, next) => {
  const {userAddress, roomAddress, optionalLastMessage} = req.query;
  console.log(userAddress, roomAddress, optionalLastMessage);

  const service = new EthereumService();
  try {
    const messages = await service.readMessages(userAddress, roomAddress, optionalLastMessage);
    res.json({messages});
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.post('/rooms/messages', async (req, res, next) => {
  const {userAddress, roomAddress, keystore, password} = req.body;
  console.log(userAddress, roomAddress, keystore, password);
  const message = `${userAddress}: ${req.body.message}`;

  const service = new EthereumService();
  try {
    const response = await service.writeMessage(userAddress, roomAddress, keystore, password, message);
    res.json(response);
  } catch (err) {
    return res.status(500).send();
  }
});

module.exports = router;
