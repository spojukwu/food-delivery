const mongoose = require("mongoose")

const Order = require("../MODEL/orderModule")

const orderfxn = async (req, res) => {  
    try {
         const order = new Order(req.body);  
         await order.save();  
         res.status(201).send(order); 
    } catch (error) {
     return res.status(500).json({ message: "Server error", error: error.message });
 }
 }
const getordersfxn = async (req, res) => {  
   
    try {
     const Orders = await Order.find()//({ userId: req.params.userId });  
     res.send(Orders); 
    } catch (error) {
     return res.status(500).json({ message: "Server error", error: error.message });
    }
     
 }
const updateorderById = async (req, res) => {  
    const { id } = req.params;  
    const { totalCost } = req.body;  

    // Validate request body  
    if (!totalCost) {  
        return res.status(400).json({ message: "Please input the required field" });  
    }  

    try {  
        // Update the order by ID  
        const updatedOrder = await Order.findOneAndUpdate(  
            { _id: id }, // Find the order by ID  
            { totalCost }, // Fields to update  
            { new: true } // Return the updated document  
        );  

        // Check if the order was found and updated  
        if (!updatedOrder) {  
            return res.status(404).json({ message: "Order not found" });  
        }  

        return res.status(200).json({ message: "Successful", order: updatedOrder });  
    } catch (error) {  
        console.error(error); // Log any errors for debugging  
        return res.status(500).json({ message: "An error occurred while updating the order" });  
    }  
}
const deleteorderById = async (req,res)=>{
    const { id } = req.params

    try {
        const deleteorder = await Order.findByIdAndDelete(id)
        if(!deleteorder){
            return res.status(400).json({message: "Order not found"})
        }
        return res.status(200).json({message: "Successful"})
    } catch (error) {
       console.error(eror);
        return res.status(500).json(
            {message: "An error occured while deleting user"}
        )
    }
}

 module.exports = {orderfxn,getordersfxn,updateorderById,deleteorderById}