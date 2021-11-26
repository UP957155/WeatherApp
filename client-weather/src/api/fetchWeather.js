const URL = 'http://localhost:8080/weather'
const API_KEY = 'f33a484cf794d08d0148764789aaba32'

export const fetchWeather = async (query) => {
    try{
        const response = await fetch(URL,{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                q: query,
                units: 'metric',
                APPID: API_KEY
            })
        })

        const data = await response.json()
    
        return data

    }catch(err){
        console.log(err)
        return {
            error: 'Weather not found! Cannot connect to server'
        }
    }
    
}