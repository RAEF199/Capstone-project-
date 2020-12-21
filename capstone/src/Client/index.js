import './Style/homePage.scss'
import './Style/earth.jpeg'

//import js files
import {
    removButt,
    savebutt,
    Difference_In_Days
} from './js/app'
import {
    getGeonames,
    getWeatherbit,
    getpixabay,
    postData
} from './js/getData'

export {
    removButt,
    savebutt,
    Difference_In_Days,
    getGeonames,
    getWeatherbit,
    getpixabay,
    postData
}

document.getElementById('save').addEventListener('click', savebutt)
document.getElementById('remove').addEventListener('click', removButt)