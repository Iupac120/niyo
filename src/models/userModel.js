const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:[true,'username already in use']
    },
    password:{
        type: String,
        required: true,
        minLength:[6,'character is less than 6']
    }
},{
    timestamps: true
})

userSchema.pre("save", async function (next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.comparePassword = async function (userPassword){
    return bcrypt.compare(userPassword,this.password)
}

module.exports = mongoose.model("UserModel",userSchema)