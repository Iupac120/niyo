const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const authMiddleware = async function (req,res,next){
    if(req.headers.authorization /*|| req.headers.authorization.startsWith("Bearer")*/){
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ')[1]
        if(token == null) return res.status(401).json({error:"error occured"})
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        console.log("user",req.user)
        next()
    }
}

module.exports = authMiddleware