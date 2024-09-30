const express = require("express")
const validatefxn = require("../controllers/tokenValidation")
const validateToken = require("../middlewares/ValidateAuth")

const router = express.Router()


router.post("/auth", validateToken, validatefxn)

module.exports = router