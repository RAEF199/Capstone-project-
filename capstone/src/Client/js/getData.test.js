import {
    getGeonames,
    getWeatherbit,
    getpixabay,
    postData
} from "./getData.js";

describe("test if the  exist ", () => {
    test('test if the function defined', () => {
        expect(getGeonames()).toBeDefined();
    });
})

describe("test if the  exist ", () => {
    test('test if the function defined', () => {
        expect(getWeatherbit()).toBeDefined();
    });
})

describe("test if the  exist ", () => {
    test('test if the function defined', () => {
        expect(getpixabay()).toBeDefined();
    });
})

describe("test if the  exist ", () => {
    test('test if the function defined', () => {
        expect(postData()).toBeDefined();
    });
})