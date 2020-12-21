//Geonames API
const GeonamesURL = 'http://api.geonames.org/geoCodeAddressJSON?q=';
const username = '&username=RA787';

//Weatherbit API
const WeatherbitKey = '&key=1587d819352f4a8a831d69fa570c2f1e';

//pixabay API 
const pixabayKey = '17879222-8ca025ab9dbc193de7bdcda37';

//save buuton
const savebutt=async () => {
    console.log('hi');
    todayDate = new Date();
    city = document.getElementById('location').value;
    departing = document.getElementById('departing').value;
    departingDate = new Date(departing);
    depDateFormat = departingDate.getDate() + "/" + (departingDate.getMonth() + 1) + "/" + departingDate.getFullYear();
    Return = document.getElementById('return').value;
    returnDate = new Date(Return);
    //fetch from Geonames API
    await Client.getGeonames(GeonamesURL, username, city).then(data => {
        console.log(data);
        longitude = data.address.lng;
        latitude = data.address.lat;
    })
    //End fetch from Geonames API

    //fetch from Weatherbit API 
    if (Client.Difference_In_Days(todayDate,departingDate) < 7) {
        const WeatherbitURL = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}`;
        await Client.getWeatherbit(WeatherbitURL, WeatherbitKey).then(data => {
            console.log(data);
            temp = data.data[0].temp;
            feelsLike = data.data[0].app_temp;
            weather = data.data[0].weather.description;
            countryCode = data.data[0].country_code;
        })
    }
    else {
        const WeatherbitURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}`;
        await Client.getWeatherbit(WeatherbitURL, WeatherbitKey).then(data => {
            console.log(data);
            max_temp = data.data[0].max_temp;
            min_temp = data.data[0].min_temp;
            feelsLikeMax = data.data[0].app_max_temp;
            feelsLikeMin = data.data[0].app_min_temp;
            weather = data.data[0].weather.description;
            countryCode = data.country_code;
            console.log(countryCode);
            console.log(max_temp + " " + feelsLikeMin + " " + weather);
        })
    }
    //End fetch from Weatherbit API 

    //fetch from pixabay API 
    const pixabayURL = `https://pixabay.com/api/?key=${pixabayKey}&q=${city.replace(' ', '+')}&image_type=photo`;
    await Client.getpixabay(pixabayURL).then(data => {
        console.log(data.hits[0].largeImageURL);
        image = data.hits[0].largeImageURL;
    })
    //End fetch from pixabay API

    //Post all data & updatUI
    document.getElementById('box2').insertAdjacentHTML("afterbegin", "<div id='trips'><p id='paragraph'></p></div>");
    if (Client.Difference_In_Days(todayDate,departingDate) < 7) {
        updateUICurrent(longitude, latitude, temp, feelsLike, weather, countryCode, image);
    } else {
        updateUIForcast(longitude, latitude, max_temp, min_temp, feelsLikeMax, feelsLikeMin, countryCode, image);
    }
    document.getElementById('location').value = '';
    document.getElementById('return').value='';
    document.getElementById('departing').value = '';
}//end save

//remove button
function removButt(){
    document.getElementById('location').value = '';
    document.getElementById('return').value='';
    document.getElementById('departing').value = '';
    document.querySelectorAll('#trips').forEach(el => el.remove());

}//end remove

//Post all data & updatUI
const updateUICurrent = (longitude, latitude, temp, feelsLike, weather, countryCode, image) => {
    document.getElementById('trips').innerHTML = `<p id='paragraph'><img id='cityPhoto' src='${image}'><br><b> My trip to: ${city.charAt(0).toUpperCase() + city.slice(1)}<br>Departing: ${depDateFormat}<br>Length of the trip: ${Client.Difference_In_Days(departingDate,returnDate)} days</b><br> ${city.charAt(0).toUpperCase() + city.slice(1)}, ${countryCode} <br>Typical weather:<br>temp: ${temp}<br>Feels like: temp: ${feelsLike}<br>Weather description: ${weather}<br><br></p>`;
    Client.postData('/info', {
        lng: longitude,
        lat: latitude,
        temp: temp,
        feelsLike: feelsLike,
        weather: weather,
        countryCode: countryCode,
        img: image
    })
}

const updateUIForcast = (longitude, latitude, max_temp, min_temp, feelsLikeMax, feelsLikeMin, countryCode, image) => {
    console.log(depDateFormat);
    Client.postData('/info', {
        lng: longitude,
        lat: latitude,
        max_temp: max_temp,
        min_temp: min_temp,
        feelsLikeMax: feelsLikeMax,
        feelsLikeMin: feelsLikeMin,
        countryCode: countryCode,
        img: image
    })
    document.getElementById('trips').innerHTML = `<p id='paragraph'><img id='cityPhoto' src='${image}'><br><b> My trip to: ${city.charAt(0).toUpperCase() + city.slice(1)}<br>Departing: ${depDateFormat}<br>Length of the trip: ${Client.Difference_In_Days(departingDate,returnDate)} days</b><br> ${city.charAt(0).toUpperCase() + city.slice(1)}, ${countryCode} ${Client.Difference_In_Days(todayDate,departingDate)} days away<br>Typical weather for then is:<br>High-temp: ${max_temp}, Low-temp: ${min_temp}<br>Feels like: High-temp: ${feelsLikeMax}, Low-temp: ${feelsLikeMax}<br>Weather description: ${weather}<br><br></p>`;
}

//return difference in days
function Difference_In_Days (date1,date2)
{
    const Difference_In_Time = date2.getTime() - date1.getTime();
    const DifferenceInDays = parseInt(Difference_In_Time / (1000 * 3600 * 24));
    return DifferenceInDays;
}

export {
    removButt,
    savebutt,
    Difference_In_Days
}