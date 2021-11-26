const express = require('express');
const api = express.Router();
const fetch = require('node-fetch');
const cors = require('cors');

api.use(cors());
api.use(express.json())

api.post('/city', async (req, res) => {
try{
    const {
        key,
        latitude,
        longitude
    } = req.body

    const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${key}&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`)

    const data = await response.json()

    res.json(data)

}catch(err){
    console.log(err)
    res.status(400).json({
        error: 'Error 400: Cannot find location'
    })
}
})

api.post('/weather', async (req, res) => {
    try{
        const {
            q,
            units,
            APPID
        } = req.body
    
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${q}&units=${units}&appid=${APPID}`)
    
        const data = await response.json()
        
        res.json(data)
    
    }catch(err){
        console.log(err)
        res.status(400).json({
            error: 'Cannot find weather'
        })
    }
    })

module.exports = api;