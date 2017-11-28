const express = require('express');
const router = express.Router();
const RestoServices = require('../services/restaurant-service')
const moment = require('moment');

router.get('/', (req, res, next) => {
    res.render('home')
});

router.post('/', async (req, res, next) => {
    let address = req.body.address
    let inputTime = req.body.time
    let time = inputTime.replace(':','');
    let weekday = req.body.weekday;    
    let selection = await RestoServices.findResults(time,weekday,address,req.body.threshold);
    console.log(selection);
    res.render('home-response', {time, weekday, selection})
})


module.exports = router;
