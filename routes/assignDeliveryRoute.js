const express = require("express")
const assignDeliveryfxn = require("../controllers/assignDelivery")
const validateToken = require("../middlewares/ValidateAuth")

const router = express.Router()

router.post('/assignDelivery',validateToken, assignDeliveryfxn )

module.exports = router