const express = require("express");  
const mongoose = require("mongoose");  
const connectToDatabase = require("./db");  
const dotenv = require("dotenv").config();  
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");  
const validateToken = require("./middlewares/ValidateAuth");
const usersRouter = require("./routes/userRoute")
const menuRouter = require("./routes/menuRoute")
const orderRouter = require("./routes/orderRoute")
const resturantRouter = require("./routes/resturantRoute")

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


app.use(usersRouter) 

app.use(menuRouter)

app.use(orderRouter)

app.use(resturantRouter)









// Assign Delivery Personnel  
app.post("/delivery", validateToken, (req, res)=>{

    return res.status(200).json({
        message: "Successful", 
        user: req.user
    })
})   