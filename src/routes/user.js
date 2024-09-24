const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');

router.get('/user', UserController.getUsers);
router.post('/create', UserController.createUser);
router.post('/edit/:_id', UserController.updateUser);
router.delete('/delete/:_id', UserController.deleteUser)

module.exports = router;
