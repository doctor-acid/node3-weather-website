const request = require('postman-request')

const location = (place, callback) => {
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(place)+'.json?access_token=pk.eyJ1IjoiYXZuaXNoaXVzMzMzMyIsImEiOiJja2VqcmhueG0weDl0MnNvNmttbGRwZHNpIn0.Mj9ug0cV0ZrrEz6ZtX8bwQ&limit=1'

    request({url: url2, json: true}, (error, response) => {
        if(error){
            callback('unable to connect to the Geo Location services, check your Network', undefined)
        } else if (response.body.features.length === 0){
            callback('Unable to find the given position. please check and type a valid location', undefined)
        } else{
            const body = response.body.features[0]
            callback(undefined, {
                latitude : body.center[0],
                longitude : body.center[1],
                location : body.place_name
            } )
        }
    })
}

const forecast = (lat = 78.2174, lon =30.2336, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=04f94059ff4badaf7d7fa56a1dcddd60&query='+lon+','+lat

    request({url, json:true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather api. please check your connection', undefined)
        } else if(response.body.error){
            callback('Unable to find data for the given location. Please check the input Location', undefined)
        } else {
            callback(undefined, response.body.current)
            // gives back properties - temperature, feelslike, weather_descriptions
        }
    })
}

module.exports = {
    location,
    forecast
}