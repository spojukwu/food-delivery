const Restaurant = require("../MODEL/resturantModel");

//create resturant
const createresturantfxn = async (req, res) => {  
    try {
        const restaurant = new Restauranturant(req.body); 
        const errors = []

        if(!restaurant){
            errors.push("Please fill the empty gaps")
        }
        
        await restaurant.save();  
        res.status(201).send(restaurant); 
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });  
    }
}
//get resturant
const getresturantfxn = async (req, res) => {  
    const restaurants = await Restaurant.find();  
    res.send(restaurants);  
}
//update resturant
const updateresturantfxn = async (req, res) => {  
    const { id } = req.params;  

    try {  
        const { name, location, contactInfo } = req.body;  
        // Initialize an array to hold validation errors  
        const errors = [];  

        if (!name) {  
            errors.push("Restaurant name is required.");  
        }  
        if (!location) {  
            errors.push("Please input the location.");  
        }  
        if (!contactInfo) {  
            errors.push("Please add contact info.");  
        }  

        // If there are validation errors, return them  
        if (errors.length > 0) {  
            return res.status(400).json({ errors });  
        }  

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(  
            id,  
            { name, location, contactInfo },  
            { new: true }  
        );  

        // Check if the restaurant was found and updated  
        if (!updatedRestaurant) {  
            return res.status(404).json({ message: "Restaurant not found." });  
        }  

        return res.status(200).json({ message: "Successful", restaurant: updatedRestaurant });  
    } catch (error) {  
        console.error(error); // Log the error for debugging purposes  
        return res.status(500).json({ message: "An error occurred while updating the restaurant." });  
    }  
}
//delete resturant
const deleteresturantfxn = async (req, res) => {  
    try {  
        const { id } = req.params;  
        const errors = [];  
        
        // Await the delete operation  
        const deleteRes = await Restaurant.findByIdAndDelete(id);  
        
        // Check if the restaurant was not found  
        if (!deleteRes) {  
            errors.push('Restaurant not found');  
        }  
        
        // If there are errors, return them  
        if (errors.length > 0) {  
            return res.status(400).json({ errors });  
        }  
        
        // If successful, return a success message  
        return res.status(200).json("Successful");  
        
    } catch (error) {  
        console.error(error); // Log the error for debugging  
        return res.status(500).json({ message: "An error occurred while deleting the restaurant" });  
    }  
}
module.exports = {
    createresturantfxn,
    getresturantfxn,
    updateresturantfxn,
    deleteresturantfxn
}