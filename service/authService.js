const User = require('../models/User')
const jwt = require('../lib/jsonwebToken')
const AppError = require('../utils/AppError')

exports.getUserbyEmail = async(email) => {
    const user = await User.findOne({email})

    return user
}
exports.getUserbyUsername = async(username) => {
    const user = await User.findOne({username})

    return user
}

exports.register = (username,email,password)=>{
    return User.create({username,email,password})
}
exports.login = async(email , password)=>{
    //apply methods from user Model
    //!!!
    const user = await this.getUserbyEmail(email)

    if(!user){
        throw new AppError('Email or Password is incorrect.',{user})
    }
    const isValid = await user.comparePassword(password)
    if(!isValid){
        throw new AppError('Email or Password is incorrect.')
    }
    const payload = {username: user.username}
    const token = await jwt.sign(payload,'THISISSECRETFORPROJECT', {expiresIn: '2h'})

    return token
}
