const Users = require("../MODEL/userModel")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const sendUserEmail = require("../sendEmail");
const jwt = require("jsonwebtoken")

//register users
const regfxn = async (req, res) => {  
    const { username, email, password, role } = req.body;  
    try {  
        // Hash the password before saving  
        const hashedPassword = await bcrypt.hash(password, 10);  
        const newUser = new Users({ username, email, password: hashedPassword, role });  
        await newUser.save(); 
        
        await sendUserEmail(email)

        return res.status(201).json({ message: "Registration successful", user: newUser });  
    } catch (error) {  
        return res.status(500).json({ message: "Server error", error: error.message });  
    }  
}
//login to the database
const loginfxn = async (req, res)=>{

    try {
    
        const { email, password } = req.body
    
        const user = await Users.findOne({email})
    
        if(!user){
            return res.status(404).json({message: "User account not found"})
        }
    
        const isMatched = bcrypt.compare(password, user.password )
    
        if(!isMatched){
            return res.status(400).json({message: "Incorrect password or email!"})
        }

    
        // Generating Tokens
        // Access Token
    
        const accessToken = jwt.sign({user}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "30m"})
    
        const refreshToken = jwt.sign({user}, `${process.env.REFRESH_TOKEN}`, {expiresIn: "10m"})
    
    
        //await sendUserEmail(email)
    
        return res.status(200).json({
            message: "Login Successful",
            accessToken,
            user
        })
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}
//get all the registered users
const getusersfxn = async (req,res)=>{
    try {
        const allUsers = await Users.find();
    res.send(allUsers)
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message }) 
    }
}
// update users password by locating them with email
const updateUserfxn = async (req, res) => {  
    try {  
        const { email } = req.params;  
        const { password } = req.body;  
        const errors = [];  
        // Validate details   
        if (!password || typeof password !== 'string' || password.length < 8) {  
            errors.push("Please input a password that is a string and at least 8 characters long");  
            return res.status(400).json({ errors }); // Sending back validation error   
        }  

        const newUpdatedUser = await Users.findOneAndUpdate(  
            { email }, // Find by email  
            { password },  //new password
            { new: true }  //the updated information
        );  
        // Check if the user was found and updated   
        if (!newUpdatedUser) {  
            return res.status(404).json({ message: "User not found" });  
        }  

        return res.status(200).json({ message: "Successful", user: newUpdatedUser });  

    } catch (error) {  
        console.error(error);  
        return res.status(500).json({ message: "Internal server error." });  
    }  
}

//delete user using email
const deleteUserfxn = async (req, res) => {  
    try {  
        const { email } = req.params;  
        // Use an object to query for the user by email  
        const deleteUser = await Users.findOneAndDelete({ email: email });  
        //check if user email really exists
        if (!deleteUser) {  
            return res.status(404).json({ message: "User not found" });  
        }  
        
        return res.status(200).json({ message: "Successful" });  
    } catch (error) {  
        console.error(error);  
        return res.status(500).json({ message: "Internal server error." });  
    }  
}

module.exports = {
    regfxn, 
    loginfxn,
    getusersfxn,
    updateUserfxn,
    deleteUserfxn
}