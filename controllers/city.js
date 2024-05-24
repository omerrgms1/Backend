const Hotel = require('../models/Hotel');

const getCities = async () => {
  try {
    const hotels = await Hotel.find();
    const allCities = hotels.map(hotel => hotel.city);
    const uniqueCities = [...new Set(allCities)];
    return uniqueCities;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

module.exports = { getCities };
