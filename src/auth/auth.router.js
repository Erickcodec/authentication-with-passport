const express = require("express");
const router = express.Router();
const authService = require("./auth.services");

router.post("/login", authService.login);

module.exports = router;
