const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true,
    },
    roomNumbers: [{ number: Number, unavailableDAtes: { type: [Date] } }],
    //yapılan harf hatası veritabanı sıfırlandıktan sonra düzeltilmeli 
},
    { timestamps: true }
);

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room