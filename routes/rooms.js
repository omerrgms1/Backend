const express = require('express');
const { verifyAdmin } = require('../utils/verifyToken');
const { createRoom, updatedRoom, deleteRoom, getRoom, getAllRooms, updatedRoomAvailability, cancelRoomReservation } = require('../controllers/room');

const router = express.Router();

//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);
//UPDATE
router.put("/:id", verifyAdmin, updatedRoom);
router.put("/availability/:id", updatedRoomAvailability);
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
// Rezervasyonu iptal etmek için PUT isteği
router.put("/cancel/:id", cancelRoomReservation);
//GET
router.get("/:id", getRoom)
//GET ALL
router.get("/", getAllRooms)

module.exports = router