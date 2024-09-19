const express = require("express");
const validateToken = require("../middlewares/ValidateAuth");
const { orderfxn, getordersfxn, updateorderById, deleteorderById } = require("../controllers/orderController");



const router = express.Router()

// Place Order  
router.post('/order', validateToken, orderfxn );
//get orders
router.get('/orders', validateToken, getordersfxn );
//update order using Id
router.put("/updateorder/:id", validateToken, updateorderById);
//delete order using Id
router.delete("/deleteorder/:id", validateToken, deleteorderById);

module.exports = router