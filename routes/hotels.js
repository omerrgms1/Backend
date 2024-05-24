const express = require('express');
const Hotel = require('../models/Hotel');
const { createError } = require('../utils/error');
const { createHotel, updatedHotel, deleteHotel, getHotel, getAllhotels, countByCity, countByType, getHotelRooms } = require('../controllers/hotel');
const { verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);
//UPDATE
router.put("/:id", verifyAdmin, updatedHotel);
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
//GET
router.get("/find/:id", getHotel)
//GET ALL
router.get("/", getAllhotels)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getHotelRooms)


module.exports = router