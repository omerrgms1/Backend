const Room = require("../models/Room")
const Hotel = require("../models/Hotel")
const createError = require("../utils/error")

const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },
            });
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch (err) {
        next(err)
    }

}

const updatedRoom = async (req, res) => {

    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedRoom)
    } catch (err) {
        res.status(500).json(err)
    }
}
const updatedRoomAvailability = async (req, res) => {

    try {
        await Room.updateOne({"roomNumbers._id":req.params.id},{
           $push:{
            "roomNumbers.$.unavailableDAtes": req.body.dates
            //model/room.js te bulunan harf hatası (DAtes)  veritabanı tekrar oluşturulacağı esnada model den sonra burası düzeltilmeli
           },
        })
        res.status(200).json(updatedRoom)
    } catch (err) {
        res.status(500).json(err)
    }
}
const cancelRoomReservation = async (req, res) => {
    try {
        const roomId = req.params.id;
        const datesToRemove = req.body.dates;

        // Odanın rezervasyon durumunu güncelle
        await Room.updateOne(
            { "roomNumbers._id": roomId },
            {
                $pullAll: {
                    "roomNumbers.$.unavailableDAtes": datesToRemove
                }
            }
        );

        res.status(200).json(updatedRoom);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteRoom = async (req, res) => {
    const hotelId = req.params.hotelid;

    try {
        await Room.findByIdAndDelete(
            req.params.id
        );
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            });
        } catch (err) {
            next(err)
        }
        res.status(200).json("Room has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
}

const getRoom = async (req, res) => {
    try {
        const selectedRoom = await Room.findById(
            req.params.id
        );
        res.status(200).json(selectedRoom)
    } catch (err) {
        res.status(500).json(err)
    }
}

const getAllRooms = async (req, res) => {
    try {
        const Rooms = await Room.find();
        res.status(200).json(Rooms)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = { createRoom, updatedRoom, deleteRoom, getRoom, getAllRooms,updatedRoomAvailability,cancelRoomReservation }
