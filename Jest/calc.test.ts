const calc = require("./calc");

describe("calc", () => {
  describe("Multiplication", () => {
    test("multi 2 + 2 to equal 4", () => {
      const result = calc(2, 2, "Multiplication");
      expect(result).toEqual(4);
    });
    // OR
    it("Should return 4, when the inputs are 2, 2 ", () => {
      const result = calc(2, 2, "Multiplication");
      expect(result).toEqual(4);
    });
  });
  describe("Division", () => {
    test("divide 2 , 2 to equal 1", () => {
      const result = calc(2, 2, "Division");
      expect(result).toEqual(1);
    });
    it("Should throw error when second number is zero!", () => {
      expect(() => calc(2, 0, "Division")).toThrowError(
        "Second number cant be zero!"
      );
    });
  });
});
