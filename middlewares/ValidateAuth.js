const jwt = require("jsonwebtoken")
const Users = require("../MODEL/userModel")

const validateToken = async (req, res, next)=>{

try {
    //accept the token from login user from req header and verify
    const loginToken = req.headers.authorization
    if(!loginToken){
        return res.status(401).json({message: "Access Denied"})
    }
    //verify and split to collect token from bearer
    const acceptedLoginToken = loginToken.split(" ")
    if(!acceptedLoginToken){
        return res.status(401).json({message: "User account not found"})
    }
   
    //collect token
    const token = acceptedLoginToken[1]
    //verify from .env
    const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN)
    //verify user
    const user = await Users.findOne({_id: verifiedToken.user._id})

    req.user = user

    console.log({user})
    next()
} catch (error) {
    res.status(500).json({message: error.message})
}
}
module.exports = validateToken


