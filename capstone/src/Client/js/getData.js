//Geonames API
const getGeonames = async (url, username, city) => {
    const res = await fetch(url + city + username);
    try {
        const data = res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
//End Geonames API 

//Weatherbit API
const getWeatherbit = async (url, key) => {
    const res = await fetch(url + key);
    try {
        const data = res.json();
        return data;
    } catch (error) {
        console.log(error);
    }

}
//End Weatherbit API

//pixabay API 
const getpixabay = async (url) => {
    const res = await fetch(url);
    try {
        const data = res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
//End pixabay API

//Post for all APIs
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(res => res.json());
    try {
        console.log(res);
    } catch (error) {
        console.log(error);
    }

}

export{
    getGeonames,
    getWeatherbit,
    getpixabay,
    postData
}

