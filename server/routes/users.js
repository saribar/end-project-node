const express = require("express")
const router = express.Router()
const User = require("../schemas/user");
const {addUser,deleteUser,updateUser,getUserById} = require("../controllers/Users");



router.post('/', addUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
router.get('/:userId',getUserById);




module.exports = router