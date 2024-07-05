const express = require("express");
const router = express.Router();

const userCtrl = require('../controllers/user')

router.post("/login", userCtrl.login);
router.post("/accounts", userCtrl.getAccounts);

module.exports = router;