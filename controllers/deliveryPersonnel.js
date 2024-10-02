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

const getDeliveryfxn = async (req, res) => {  
    try {  
        const getdelivery = await DeliveryPersonnel.find();  
        
        // Create a response object that includes the data and its length  
        const response = {  
            count: getdelivery.length,  // Length of the array  
            deliveryPersonnel: getdelivery  // The actual array of delivery personnel  
        };  

        res.status(200).json(response);  
    } catch (error) {  
        res.status(500).json({ message: "Error retrieving delivery personnel", error });  
    }  
}

const delDeliveryfxn = async (req, res) => {  
    try {  
        const { id } = req.params; // Extract the ID from the request parameters  

        // Attempt to find and delete the delivery personnel by ID  
        const deleteDelivery = await DeliveryPersonnel.findByIdAndDelete(id);  
        
        // Check if the delivery personnel was found and deleted  
        if (!deleteDelivery) {  
            return res.status(404).json({ message: "Delivery personnel not found." }); // 404 Not Found  
        }  

        // Return a success response if deletion was successful  
        return res.status(200).json({ message: "Deleted successfully." }); // 200 OK  
    } catch (error) {  
        console.error(error); // Log the error for debugging  
        return res.status(500).json({ message: "Internal server error." }); // 500 Internal Server Error  
    }  
}
module.exports = { deliveryPersonnelfxn, getDeliveryfxn, delDeliveryfxn
}