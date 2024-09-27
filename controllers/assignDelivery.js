const { AssignDelivery } = require("../MODEL/deliveryPersonnelModule");

// Assign Delivery Personnel 
const assignDeliveryfxn = async (req, res) => {  
    const { orderId, deliveryPersonnelId } = req.body;  

    try {  
        // Validate input  
        if (!orderId || !deliveryPersonnelId) {  
            return res.status(400).json({ message: "Order ID and Delivery Personnel ID are required." });  
        }  

        // Create a new assignment  
        const assignment = new AssignDelivery({  
            order: orderId,  
            deliveryPersonnelId: deliveryPersonnelId  
        });  

        await assignment.save();  

        return res.status(201).json({ message: "Delivery personnel assigned successfully.", assignment });  
    } catch (error) {  
        return res.status(500).json({ message: "Server error", error: error.message });  
    }  
}  

module.exports = assignDeliveryfxn;