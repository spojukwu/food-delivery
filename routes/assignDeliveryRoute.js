const express = require("express")
const assignDeliveryfxn = require("../controllers/assignDelivery")

const router = express.Router()

router.post('/assignDelivery', assignDeliveryfxn )