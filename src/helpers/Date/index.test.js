import {getMonth} from "./index"
 
const mockedDate1 = new Date(2022, 0, 1);
const mockedDate2 = new Date(2022, 6, 1);

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {
            expect(getMonth(mockedDate1)).toBe("janvier")
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            expect(getMonth(mockedDate2)).toBe("juillet")
        });
    });
})

