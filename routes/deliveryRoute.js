const express = require("express")

const validateToken = require("../middlewares/ValidateAuth");
const { deliveryPersonnelfxn, getDeliveryfxn, delDeliveryfxn } = require("../controllers/deliveryPersonnel");



const router = express.Router()

router.post("/deliveryPersonnel",validateToken, deliveryPersonnelfxn,)
router.get("/getDeliveryperson", getDeliveryfxn);
router.delete("/deleteDelPersonnel/:id", delDeliveryfxn )

module.exports = router