const express = require("express");  
const mongoose = require("mongoose");  
const connectToDatabase = require("./db");  
const dotenv = require("dotenv").config();  
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");  
const Users = require("./MODEL/authModel");
const Restaurant = require("./MODEL/resturantModel");
const orders = require("./MODEL/orderModule")
const deliveryPersonnel = require("./MODEL/deliveryPersonnelModule");
const Order = require("./MODEL/orderModule");
const DeliveryPersonnel = require("./MODEL/deliveryPersonnelModule");
const Menu = require("./MODEL/menuModel");
const { validateRegistration, validateLogin } = require("./MODEL/middlewares/validations");

const app = express();  
app.use(express.json()); // Middleware to parse JSON bodies  

const PORT = process.env.PORT || 5000;  

// Connect to Database  
connectToDatabase();  

app.listen(PORT, () => {  
    console.log(`Server running at http://localhost:${PORT}`);  
});  

app.get("/", (req, res) => {  
    return res.status(200).json({ message: "Welcome to our food delivery website" });  
});  
//Create User Account
app.post("/register", validateRegistration, async (req, res) => {  
    const { username, email, password, role } = req.body;  
    try {  

        const existingUser = await Users.findOne({ email });  

        if (existingUser) {  
            return res.status(400).json({ message: "User account already exists" });  
        }  

        // Hash the password before saving  
        const hashedPassword = await bcrypt.hash(password, 10);  
        const newUser = new Users({ username, email, password: hashedPassword, role });  
        await newUser.save();  

        return res.status(201).json({ message: "Registration successful", user: newUser });  
    } catch (error) {  
        return res.status(500).json({ message: "Server error", error: error.message });  
    }  
});
// update users password by locating them with email
app.put("/update-user/:email", async (req, res) => {  
    try {  
        const { email } = req.params;  
        const { password } = req.body;  
        const errors = [];  

        // Validate details   
        if (!password || typeof password !== 'string' || password.length < 8) {  
            errors.push("Please input a password that is a string and at least 8 characters long");  
            return res.status(400).json({ errors }); // Sending back validation error   
        }  

        const newUpdatedUser = await Users.findOneAndUpdate(  
            { email }, // Find by email  
            { password },  //new password
            { new: true }  //the updated information
        );  

        // Check if the user was found and updated   
        if (!newUpdatedUser) {  
            return res.status(404).json({ message: "User not found" });  
        }  

        return res.status(200).json({ message: "Successful", user: newUpdatedUser });  

    } catch (error) {  
        console.error(error);  
        return res.status(500).json({ message: "Internal server error." });  
    }  
});
//login
app.post("/login", validateLogin, async (req, res)=>{

    try {
    
        const { email, password } = req.body
    
        const user = await Users.findOne({email})
    
        if(!user){
            return res.status(404).json({message: "User account not found"})
        }
    
        const isMatched = bcrypt.compare(password, user.password )
    
        if(!isMatched){
            return res.status(400).json({message: "Incorrect password or email!"})
        }
    
        // Generating Tokens
        // Access Token
    
        const accessToken = jwt.sign({user}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "30m"})
    
        const refreshToken = jwt.sign({user}, `${process.env.REFRESH_TOKEN}`, {expiresIn: "10m"})
    
    
        //await sendUserEmail(email)
    
        return res.status(200).json({
            message: "Login Successful",
            accessToken,
            user
        })
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
    })
    
//create Menu
app.post("/menu", async(req, res)=>{
    try {
        const menu = new Menu(req.body)
        await menu.save(),
        res.status(201).send(menu)
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
})

app.get(`/menus`, async(req, res)=>{
    const menus = await Menu.find()
    res.send(menus);
})
//get oneMenu
app.get("/one-menu/:id", async (req, res)=>{

try {
    const { id } = req.params

    const oneMenu = await Menu.findById(id)
    if(!oneMenu){
        return res.status(404).json({message:"This item does not exist"})
    }
    return res.status(200).json({message:"Successful", menu: oneMenu})
} catch (error) {  
    console.error(error);  
    return res.status(500).json({ message: "Internal server error." });  
}  
})

//update menu 1
app.put("/edit-menu/:id", async (req, res) => {  
    try {  
        const { id } = req.params;  
        const { itemName, price } = req.body;  

        // Initialize an array to hold validation errors  
        const errors = [];  

        // Validate itemName  
        if (!itemName || typeof itemName !== 'string' || itemName.trim() === '') {  
            errors.push("itemName is required and must be a non-empty string.");  
        }  

        // Validate price  
        if (price === undefined || typeof price !== 'number' || price < 0) {  
            errors.push("price is required and must be a non-negative number.");  
        }  

        // If there are validation errors, return the errors in the response  
        if (errors.length > 0) {  
            return res.status(400).json({ errors });  
        }  

        // Proceed to update the menu item if validation is successful  
        const updatedMenu = await Menu.findByIdAndUpdate(  
            id,  
            { itemName, price },  
            { new: true }  
        );  

        // Check if the menu item was found and updated  
        if (!updatedMenu) {  
            return res.status(404).json({ message: "Menu item not found." });  
        }  

        return res.status(200).json({ message: "Successful", menu: updatedMenu });  

    } catch (error) {  
        console.error(error);  
        return res.status(500).json({ message: "Internal server error." });  
    }  
});
//delete menu request
app.delete("/delete-menu/:id", async (req, res)=>{
try {
    const { id } = req.params
    
    const deleteMenu = await Menu.findByIdAndDelete(id)
    if (!deleteMenu){
        return res.status(400).json({message: "User not found"})
    }
    return res.status(200).json({message: "Successful"})
}catch (error) {  
    console.error(error);  
    return res.status(500).json({ message: "Internal server error." });  
}  
})

// Create Restaurant  
app.post('/restaurant', async (req, res) => {  
    try {
        const restaurant = new Restaurant(req.body); 
        const errors = []

        if(!restaurant){
            errors.push("Please fill the empty gaps")
        }
        
        await restaurant.save();  
        res.status(201).send(restaurant); 
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });  
    }
});  

// Get all Restaurants  
app.get('/restaurants', async (req, res) => {  
    const restaurants = await Restaurant.find();  
    res.send(restaurants);  
});  

 // Place Order  
app.post('/order', async (req, res) => {  
   try {

const order = new Order(req.body);  
await order.save();  
res.status(201).send(order); 
   } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
}
});  

// Get Order History  


// Assign Delivery Personnel  
