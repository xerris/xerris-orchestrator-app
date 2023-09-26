function addNumbers(a, b) {
  return a + b;
}

describe("math", () => {
  test("adds 1 + 2 to equal 3", () => {
    const result = addNumbers(1, 2);

    expect(result).toBe(3);
  });
});
