const express = require('express')
const router = express.Router()
const RestaurantService = require('../services/restaurant-service')

router.get('/all', async (req, res, next) => {
    const participants = await RestaurantService.alphaRestaurants()
    res.render('restaurant-list', {participants})
});

router.get('/:id', async (req, res, next) => {
    const restaurant = await RestaurantService.find(req.params.id)
    const open = []
    if (!restaurant) {
        res.status(404)
        res.send({})
        return;
    }
    for (let i = 0; i < restaurant.openingHours.length; i++) {
        let intervals = []
        for (let j = 0; j < restaurant.openingHours[i].intervals.length; j++) {
            intervals.push(` ${restaurant.openingHours[i].intervals[j].from} - ${restaurant.openingHours[i].intervals[j].to}`)}
        open.push(` ${restaurant.openingHours[i].weekday}: ${intervals}`)
        }
    res.render('restaurant-detail', {restaurant, open})
});

router.get('/all/by_neighborhood', async (req, res, next) => {
    neighborhoods = ["Kreuzberg", "Mitte", "Prenzlauer Berg", "Charlottenburg", "Friedrichshain", "Moabit", "Schoneberg", "Neukolln"]
    const restosByNeighborhood = []
    for (let i = 0; i < neighborhoods.length; i++) {
        restosByNeighborhood.push(await RestaurantService.gatherNeighborhood(neighborhoods[i]))
    }    
    res.render('restaurant-list-neighborhood', { restosByNeighborhood, neighborhoods })            
});

router.post('/', async (req, res, next) => {
    const restaurant = await RestaurantService.add(req.body)
    res.send(restaurant)
})

router.delete('/:id', async (req, res, next) => {
    await RestaurantService.del(req.params.id)
    res.send('The restaurant has been deleted.')
})



module.exports = router;

