
const express = require('express');
const { getCities } = require('../controllers/city');

const router = express.Router();

router.get('/cities', async (req, res) => {
  try {
    const cities = await getCities();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
