const request = require('request')


const forecast = (latitude, longitude, callback) => {

   
    //http://api.weatherstack.com/current?access_key=6406b2a44944c02e7a25cd7121817c97&query=New%20York&units=m
    const url = 'http://api.weatherstack.com/current?access_key=6406b2a44944c02e7a25cd7121817c97&query=' + latitude + ',' + longitude + '&units=m';



    request({ url: url, json: true }, (err, res) => {
console.log('forecast : ',res.body);
        if (err) {
            callback('unable', undefined)
        }
        else if (res.body.err) {
            callback('another', undefined)
        }
        else {

            callback(undefined, "Current temprature is  " + res.body.current.temperature + " chance of rain in % " + res.body.current.precip)


        }

    })

}



module.exports = forecast