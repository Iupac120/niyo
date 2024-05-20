const Task = require("../models/taskModel")
const io = require("../../app")

const getTasks = async (req,res) => {
    const tasks = await Task.find({user:req.user._id})
    res.json(tasks)
}

const createTask = async (req,res) => {
    const {title,description} = req.body
    const task = new Task({
        user:req.user._id,
        title,
        description
    })
    const createdTask = await task.save()
    //emit task to client
    io.emit("new task",task)
    res.status(201).json(createdTask)
}

const updateTask = async (req,res) => {
    const {title,description,completed} = req.body
    const task = await Task.findById(req.params.id)
    if(task.user.toString() !== req.user._id) return res.status(401).json("unauthorised")
    if(task){
        task.title = title || task.title,
        task.description = description || task.description,
        task.completed = completed
    }
    const updatedTask = await task.save()
    if(updatedTask){
        res.status(200).json(updatedTask)
    }else{
        res.status(404).json("not found")
    }
}

const deleteTask = async (req,res) => {
    const task = await Task.findById(req.params.id)
    if(task.user.toString() !== req.user._id) return res.status(401).json("unauthorised")
    if(task){
        task.remove()
        res.status(200).json("task removed")
    }else{
        res.status(404).json("task not found")
    }
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}