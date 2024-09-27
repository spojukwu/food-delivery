const { DeliveryPersonnel } = require("../MODEL/deliveryPersonnelModule");

// create delivery personnel
const deliveryPersonnelfxn = async (req, res) => {  
    try {  
        // Destructure fields from req.body  
        const { name, contactInfo, vehicleDetails, currentStatus } = req.body;  

        // Initialize an array to collect errors  
        const errors = [];   

        // Perform validations  
        if (!name) {  
            errors.push("Please add your name");  
        }   
        if (!contactInfo) {  
            errors.push("Please add contact info");  
        }  
        if (!vehicleDetails) {  
            errors.push("Please add vehicle details");  
        }  

        // If there are validation errors, return a 400 response  
        if (errors.length > 0) {  
            return res.status(400).json({ message: "Validation errors", errors });  
        }  

        // Create a new delivery personnel  
        const deliveryPersonnel = new DeliveryPersonnel({  
            name,  
            contactInfo,  
            vehicleDetails,  
            currentStatus   
        });  

        // Save the delivery personnel to the database  
        await deliveryPersonnel.save();  
        
        return res.status(201).json({  
            message: "Successful",   
            user: deliveryPersonnel  
        });  
    } catch (error) {  
        return res.status(500).json({  
            message: "Server error",   
            error: error.message  
        });  
    }  
}

module.exports = deliveryPersonnelfxn