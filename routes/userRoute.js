const express = require("express")
const { regfxn, loginfxn, getusersfxn, deleteUserfxn, resetPwdfxn } = require("../controllers/userController")
const { validateRegistration, validateLogin } = require("../middlewares/validations")

const router = express.Router()

router.post("/register",validateRegistration, regfxn)

router.post("/login", validateLogin, loginfxn)

router.get("/users", getusersfxn )
//reset password
router.put("/update-user/:email", resetPwdfxn )

router.delete("/delete-user/:email", deleteUserfxn)

module.exports = router