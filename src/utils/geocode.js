const request = require('request')

const geocode = (address, callback) => {

    const geourl = 'http://api.weatherstack.com/current?access_key=6406b2a44944c02e7a25cd7121817c97&query='+ address;

    request({ url: geourl, json: true }, (err, res) => {
console.log('geo : ',res.body);
        if (err) {
            callback('unable', undefined)
        }
        else if (res.body.err) {
            callback('no data found', undefined)
        }
        else {

            callback(undefined, {
                latitude: res.body?.location?.lat,
                longitude: res.body?.location?.lon,
                location: res.body?.location?.name,
            })
        }

    })

}



module.exports = geocode