const express = require('express');
const axios = require('axios');
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const router = express.Router();
const limiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 10
});

const speedLimiter = slowDown({
  windowMs: 30 * 1000, // 30 seconds
  delayAfter: 1,
  delayMs: 500
});

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

let cacheData;
let cacheTime;

router.get('/', limiter, speedLimiter, (req, res, next) => {
  //middleware
  const apiKeys = req.get(`X-API-KEY`);
  if (process.env.API_KEY === apiKeys) {
    next();
  } else {
    const error = new Error(`Invalid API Key`);
    next(error);
  }
}, async (req, res, next) => {
  // in memory cache
  if (cacheTime && cacheTime > Date.now() > -30 * 1000) {
    return res.json(cacheData);
  }
  try {
    const params = new URLSearchParams({
      appid: process.env.OPENWEATHERMAP_API_KEY,
      q: 'ashdod',
    });
    const { data } = await axios.get(`${BASE_URL}${params}`);
    cacheData = data;
    cacheTime = Date.now();
    data.cacheTime = cacheTime;
    return res.json(data);
  } catch (error) {
    // will call my error handler
    return next(error);
  }
});

module.exports = router;
