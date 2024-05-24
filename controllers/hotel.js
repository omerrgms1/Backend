const Hotel = require('../models/Hotel')
const Room = require('../models/Room')

const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (err) {
        next(err);
    }
}

const updatedHotel = async (req, res) => {

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedHotel)
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteHotel = async (req, res) => {

    try {
        await Hotel.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Hotel has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
}

const getHotel = async (req, res) => {
    try {
        const selectedHotel = await Hotel.findById(
            req.params.id
        );
        res.status(200).json(selectedHotel)
    } catch (err) {
        res.status(500).json(err)
    }
}

// const getAllhotels = async (req, res) => {
//     const {min,max,...others} = req.query;
//     try {
//         const Hotels = await Hotel.find({...others,cheapestPrice:{$gt:min | 1 ,$lt:max || 999},
//         }).limit(req.query.limit);
//         res.status(200).json(Hotels)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }

const getAllhotels = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query; // limit değerini de alın
    try {
        // min ve max değerlerini doğru şekilde alıp işleyin
        const minPrice = parseInt(min) || 1;
        const maxPrice = parseInt(max) || 999;

        // Diğer sorgu parametrelerini de almayı unutmayın
        const query = {
            ...others,
            cheapestPrice: { $gt: minPrice, $lt: maxPrice }
        };

        // Eğer limit değeri varsa sorguya ekleyin
        const limitValue = parseInt(limit) || 0; // varsayılan değer 0
        const Hotels = limitValue > 0 ? await Hotel.find(query).limit(limitValue) : await Hotel.find(query);

        res.status(200).json(Hotels);
    } catch (err) {
        next(err)
    }
};


const countByCity = async (req, res) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    } catch (err) {
        res.status(500).json(err)
    }
}
const countByType = async (req, res, next) => {

    try {
        const bungalovCount = await Hotel.countDocuments({ type: "Bungalov" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "Bungalov", count: bungalovCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount },
        ])
    } catch (err) {
        next(err)
    }
}

const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room);
        })
        );
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

module.exports = { createHotel, updatedHotel, deleteHotel, getHotel, getAllhotels, countByCity, countByType, getHotelRooms }