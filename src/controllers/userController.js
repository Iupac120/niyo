const User = require("../models/userModel")
const createToken =  require("../utils/jwt")

const register = async (req,res) => {
    const {username,password} = req.body
    const userExist = await User.findOne({username})
    if(userExist) return res.status(401).json({message:"name in use"})
    const user = User.create({
        username,
        password
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            username:(await user).username,
            token:createToken(user._id)
        })
    }else{
        res.status(400).json("fail to create user")
    }
}

const login =  async (req,res) => {
    const {username,password} = req.body
    const userExist = await User.findOne({username})
    if(!userExist) return res.status(401).json("username does not exist")
    const isMatch = await userExist.comparePassword(password)
    if(!isMatch) return res.status(401).json("incorrect password")
    const token = createToken(userExist._id)
    res.status(201).json({
        id:userExist._id,
        name:userExist.username,
        token
    })
}

module.exports = {
    register,
    login
}