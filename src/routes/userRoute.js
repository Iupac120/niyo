const express = require("express")
const router = express.Router()
const trycatchHandler = require("../utils/trycatch")
const {register,login} = require("../controllers/userController")

router.post("/register",trycatchHandler(register))
router.post("/login",trycatchHandler(login))

module.exports = router