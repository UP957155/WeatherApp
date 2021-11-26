const URL = 'http://localhost:8080/city'
const API_KEY = 'G5Wi2f2ZPmQr26T1pcfYqcZpAxCbXnTC'

export const fetchCityName = async (latitude, longitude) => {
    try{
        const response = await fetch(URL, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                key: API_KEY,
                latitude: latitude,
                longitude: longitude
            })
        })

        
    const data = await response.json()

    return data

    }catch(err){
        console.log(err)
        return {
            error: 'Location not found! Cannot connect to server'
        }
    }
}