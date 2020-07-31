const express = require('express');
const axios = require('axios');

const router = express.Router();

const BASE_URL = 'api.openweathermap.org/data/2.5/weather?';

router.get('/', async (req, res, next) => {
  try {
    const params = new URLSearchParams({
      appid: process.env.OPENWEATHERMAP_API_KEY,
      q: 'ashdod',
    });
    const data = await axios.get(`${BASE_URL}${params}`);
    res.json(data);
  } catch (error) {
    // will call my error handler
    console.log('>>>>>>>>>>>>>>>>>>>>>>');
    console.log(error);
    console.log('<<<<<<<<<<<<<<<<<<<<<<');
    next(error);
  }
});

module.exports = router;
