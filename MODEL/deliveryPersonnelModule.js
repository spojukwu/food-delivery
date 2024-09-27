const mongoose = require("mongoose");  

// Delivery Personnel Schema  
const deliverySchema = new mongoose.Schema({  
    name: { type: String, required: true },  
    contactInfo: { type: String, required: true },  
    vehicleDetails: { type: String, required: true },  
    currentStatus: { type: String, enum: ['available', 'busy'], default: 'available' }  
});   

const DeliveryPersonnel = mongoose.model('DeliveryPersonnel', deliverySchema);   

// Assign Delivery Schema  
const assignDeliverySchema = new mongoose.Schema({  
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },  
    deliveryPersonnel: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPersonnel', required: true }  
});  

const AssignDelivery = mongoose.model('AssignDelivery', assignDeliverySchema);  

// Export the models  
module.exports = { DeliveryPersonnel, AssignDelivery };