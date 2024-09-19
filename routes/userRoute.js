const express = require("express")
const { regfxn, loginfxn, getusersfxn, updateUserfxn, deleteUserfxn } = require("../controllers/userController")
const { validateRegistration, validateLogin } = require("../middlewares/validations")

const router = express.Router()

router.post("/register",validateRegistration, regfxn)

router.post("/login", validateLogin, loginfxn)

router.get("/users", getusersfxn )

router.put("/update-user/:email", updateUserfxn )

router.delete("/delete-user/:email", deleteUserfxn)

module.exports = router