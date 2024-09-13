const mongoose = require('mongoose');  

const menuSchema = new mongoose.Schema({  
    itemName: { type: String, required: true },  
    description: { type: String, required: true },  
    price: {   
        type: Number,   
        required: true,  
        min: 0  
    },  
    currency: {   
        type: String,   
        enum: ['USD', 'NGN'], // Specify allowed currency types  
        default: 'NGN' // Default to Naira  
    },  
    availability: { type: Boolean, default: true }  
});  



const Menu = mongoose.model('Menu', menuSchema);  
module.exports = Menu;