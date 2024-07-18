const express = require("express")
const router = express.Router()

const {getAllMessages} = require("..//controllers/message");

router.get('/',getAllMessages);

module.exports = router