const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({  
    userId: { type: mongoose.Schema.Types.ObjectId, ref: `Users`,  required: true }, // Reference to the user  
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }, // Reference to the restaurant  
    orderedItems: [{   
        menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true }, // Reference to the menu item  
        quantity: { type: Number, required: true, min: 1 } // Quantity of the item ordered  
    }],  
    totalCost: { type: Number, required: true, min: 0 }, // Total cost of the order  
    orderStatus: {   
        type: String,   
        enum: ['pending', 'preparing', 'out for delivery', 'delivered'],   
        default: 'pending' // Default status  
    }  
}, 
{ timestamps: true });   

const Order = mongoose.model('Order', orderSchema);  
module.exports = Order;