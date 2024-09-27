const express = require("express")
const deliveryPersonnelfxn = require("../controllers/deliveryPersonnel")
const validateToken = require("../middlewares/ValidateAuth")



const router = express.Router()

router.post("/deliveryPersonnel",validateToken, deliveryPersonnelfxn,)

module.exports = router