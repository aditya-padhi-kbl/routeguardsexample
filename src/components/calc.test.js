import { multiply, add } from "./calc";
/**
 * These test cases are to play around calc.js.  Just for fun
 */
describe(`Test Suite for calc`, () => {
  describe(`Test Suite for multiply which can accept dynamic parameters`, () => {
    it(`should return the same value when single argument is passed `, () => {
      expect(multiply(2)).toBe(2);
    });
    it(`should return the same value when single argument is passed `, () => {
      expect(multiply(2, 3, 4)).toBe(24);
    });
    it(`should return the same value when single argument is passed `, () => {
      expect(multiply(2, Infinity)).toBe(Infinity);
    });
  });

  describe(`Test Suite for add which can accept dynamic parameters`, () => {
    it(`should return the same value when single argument is passed `, () => {
      expect(add(2)).toBe(2);
    });
    it(`should return the same value when single argument is passed `, () => {
      expect(add(2, 3, 4)).toBe(9);
    });
    it(`should return the same value when single argument is passed `, () => {
      expect(add(2, Infinity)).toBe(Infinity);
    });
  });
});
