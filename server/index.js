const axios = require("axios")
const bruh=async ()=>{await axios("http://api.weatherapi.com/v1/current.json?key=0cb021f26c2e44d4be562400220110&q=London&aqi=n").then((e)=>{
    console.log(e)
}
    )
}
const bruh2=async()=>{
    await axios(`http://api.weatherapi.com/v1/forecast.json?key=0cb021f26c2e44d4be562400220110&q=London&days=2&aqi=no&alerts=no`).then((e)=>{
        console.log(e.data.forecast.forecastday.date)
    })
}

bruh()