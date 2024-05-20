const express = require("express")
const app = express()
require("dotenv").config()
app.use(express.json())
const connectDB = require("./src/config/db")
const userRoute  = require("./src/routes/userRoute")
const taskRoute  = require("./src/routes/taskRoute")
const PORT = process.env.PORT || 3000

app.use("/api/v1/users",userRoute)
app.use("/api/v1/tasks",taskRoute)
app.listen(PORT, async() => {
    await connectDB(process.env.MONGO_URI)
    console.log(`server is running on port ${PORT}`)
})