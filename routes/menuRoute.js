const express = require("express")
const validateToken = require("../middlewares/ValidateAuth")
const { menufxn, getMenufxn, getOneMenufnx, deleteMenufnx, updateMenufnx } = require("../controllers/menuController")


const router = express.Router()


router.post("/menu", validateToken, menufxn )

router.get(`/menus`, getMenufxn )

router.get("/one-menu/:id",validateToken, getOneMenufnx )

router.put("/edit-menu/:id",validateToken, updateMenufnx );

router.delete("/delete-menu/:id",validateToken, deleteMenufnx )

module.exports = router