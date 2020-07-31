const express = require('express');

const emojis = require('./emojis');
const ashdodWeather = require('./ashdod-weather');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/weather/ashdod', ashdodWeather);

module.exports = router;
