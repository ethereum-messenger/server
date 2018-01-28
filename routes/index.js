const express = require('express');
const router = express.Router();
const EthereumService = require('../services/ethereum_service');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile('index.html');
});

router.post('/rooms', async (req, res, next) => {
  const userAddress = req.body.userAddress;
  const service = new EthereumService();
  try {
    const roomAddress = await service.createRoom(userAddr);
    res.json({userAddress, roomAddress});
  } catch (err) {
    return res.status(500).send();
  }
});

router.post('/invitations', async (req, res, next) => {
  const body = req.body;
  const roomAddress = body.roomAddress;
  const inviteeAddress = body.inviteeAddress;
  const service = new EthereumService();
  try {
    const response = await service.inviteUserToRoom(inviteeAddress, roomAddress);
    res.json(response);
  } catch (err) {
    return res.status(500).send();
  }
});

router.get('/rooms/messages', async (req, res, next) => {
  const userAddress = req.params.userAddress;
  const roomAddress = req.params.roomAddress;
  const optionalLastMessage = req.params.optionalLastMessage;
  const service = new EthereumService();
  try {
    const messages = await service.readMessages(userAddress, roomAddress, optionalLastMessage);
    res.json({messages});
  } catch (err) {
    return res.status(500).send();
  }
});

router.post('/rooms/messages', (req, res, next) => {
  const userAddress = req.params.userAddress;
  const roomAddress = req.params.roomAddress;
  const message = req.body.message;
  const service = new EthereumService();
  try {
    const response = await service.writeMessage(userAddress, roomAddress, message);
    res.json(response);
  } catch (err) {
    return res.status(500).send();
  }
});

module.exports = router;
