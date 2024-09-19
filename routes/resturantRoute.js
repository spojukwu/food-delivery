const express = require("express");
const validateToken = require("../middlewares/ValidateAuth");
const { createresturantfxn, getresturantfxn, updateresturantfxn, deleteresturantfxn } = require("../controllers/resturantController");


const router = express.Router();

router.post('/restaurant', validateToken, createresturantfxn );

router.get('/restaurants', getresturantfxn );

router.put("/update-restaurant/:id", validateToken,updateresturantfxn)

router.delete("/deleteres/:id", validateToken, deleteresturantfxn )

module.exports = router