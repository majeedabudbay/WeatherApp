const express = require('express')
const router = express.Router()
const City = require('../models/City')
let urllib = require('urllib')
const path = require('path')





router.get('/sanity', function(req, res){
    res.send("weather app")
})



router.get('/city/:cityName', function(req, res){
    urllib.request(`http://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}
    &units=metric&APPID=94940697044b8294948f4db0e248ed08`, function (err, data, response){
        const city = JSON.parse(data)
        if(city.cod !== 200){
            res.end()
        }else{


            const newCity = {
                name: city.name,
                temperature: Math.floor(city.main.temp),
                condition: city.weather[0].description,
                conditionPic: `https://openweathermap.org/img/wn/${city.weather[0].icon}.png`
            }
            res.send(newCity)
        }

        
    })
})

router.get('/cities', function(req, res){

    
    City.find({}, function(err, cities){
        res.send(cities)
    })

})


router.post('/city', function(req, res){
    const name = req.body.name
    const temperature = req.body.temperature
    const condition = req.body.condition
    const conditionPic = req.body.conditionPic
   
    const cityTemp = new City({ name: name, temperature: temperature, condition: condition,
         conditionPic: conditionPic })
    cityTemp.save()
    res.send(cityTemp)
})


router.delete('/city/:cityName', function(req, res){
    const cityName = req.params.cityName
    City.deleteOne({ name: cityName }).exec(function(err,result) {
        res.end()
    })
})

module.exports = router
