const express = require("express")
const app = express()
require("dotenv").config()
app.use(express.json())
const http = require("http")
const cors = require("cors")
const {Server} = require("socket.io")
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"*",
        method:['GET','POST','PUT','DELETE']
    }
})
io.on('connection',(socket) => {
    console.log("new client added")
    socket.on('disconnect',() => {
        console.log('client disconnected')
    })
})
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