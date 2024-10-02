const express = require("express");  
const mongoose = require("mongoose");  
const connectToDatabase = require("./db");  
const dotenv = require("dotenv").config();  
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors")
const morgan = require("morgan")

const usersRouter = require("./routes/userRoute")
const menuRouter = require("./routes/menuRoute")
const orderRouter = require("./routes/orderRoute")
const resturantRouter = require("./routes/resturantRoute");
const deliveryRouter = require("./routes/deliveryRoute")
const assignDeliveryRouter = require("./routes/assignDeliveryRoute");
const validateRoute = require("./routes/tokenValidateRoute");
const getDelPsnRoute = require ("./routes/deliveryRoute")
const delDelpsnRoute = require ("./routes/deliveryRoute")


const app = express();  
app.use(express.json()); // Middleware to parse JSON bodies  
app.use(cors())//dependecy for frontend connection
app.use(morgan())

const PORT = process.env.PORT || 5000; 


// Connect to Database  
connectToDatabase();  

app.listen(PORT, () => {  
    console.log(`Server running at http://localhost:${PORT}`);  
});  

app.get("/", (req, res) => {  
    return res.status(200).json({ message: "Welcome to our food delivery website" });  
}); 

// Protected Routes
app.use("/api",validateRoute)


app.use("/api",usersRouter) 
app.use("/api",menuRouter)
app.use("/api",orderRouter)
app.use("/api",resturantRouter)
app.use("/api",deliveryRouter)
app.use("/api",assignDeliveryRouter)
app.use("/api",getDelPsnRoute)
app.use("/api",delDelpsnRoute)

app.use((req, res) => {  
    return res.status(404).json({ message: "Sorry, this endpoint doesn't exist." });  
});