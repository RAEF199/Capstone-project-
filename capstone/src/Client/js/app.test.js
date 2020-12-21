import {
    Difference_In_Days,
    savebutt,
    removButt
} from "./app.js";

describe("test if the  exist ", () => {
    test('test if the function defined', () => {
        expect(Difference_In_Days).toBeDefined();
    });
})

//function to adddays to current day
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
test("if the function return right result", () => {
    const date1 = new Date()
    const date2 = new Date('08/25/2020')
    expect(Difference_In_Days(date1,date2)).toBe(2);
})

describe("test if the  exist ", () => {
    test('test if the function defined', () => {
        expect(savebutt).toBeDefined();
    });
})

describe("test if the  exist ", () => {
    test('test if the function defined', () => {
        expect(removButt).toBeDefined();
    });
})

