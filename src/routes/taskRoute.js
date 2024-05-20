const express = require('express')
const router = express.Router()
const trycatchHandler = require("../utils/trycatch")
const authMiddleware = require("../middleware/auth")
const {validateTask} = require("../middleware/validate")
const {getTasks,createTask,updateTask,deleteTask} = require("../controllers/taskController")

router.get("/",authMiddleware,trycatchHandler(getTasks))
router.post("/",authMiddleware,validateTask,trycatchHandler(createTask))
router.put("/",authMiddleware,validateTask,trycatchHandler(updateTask))
router.delete("/",authMiddleware,trycatchHandler(deleteTask))

module.exports = router