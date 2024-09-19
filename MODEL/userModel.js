const mongoose = require('mongoose');  
//const bcrypt = require('bcrypt');  

const userSchema = new mongoose.Schema({  
    username: { type: String, required: true, unique: true },  
    email: { type: String, required: true, unique: true },  
    password: { type: String, required: true },  
    role: { type: String, enum: ['customer', 'restaurant_owner', 'delivery_personnel'], default: 'customer' }  
},{
    timestamps: true 
});  


const Users = mongoose.model('Users', userSchema);  
module.exports = Users;  