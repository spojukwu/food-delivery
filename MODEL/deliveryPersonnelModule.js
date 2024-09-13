const mongoose = require ("mongoose")

const deliverySchema = new mongoose.Schema({  
    name: { type: String, required: true },  
    contactInfo: { type: String, required: true },  
    vehicleDetails: { type: String, required: true },  
    currentStatus: { type: String, enum: ['available', 'busy'], default: 'available' }  
});  

const DeliveryPersonnel = mongoose.model('DeliveryPersonnel', deliverySchema);  
module.exports = DeliveryPersonnel; 