import generateRandomString from "@/utils/generateRandomString";

describe("utils tests", () => {
  it("generateRandomString returns a base64 String", () => {
    const result = generateRandomString();
    expect(typeof result).toBe("string");
    expect(result.length).toBe(64);
  });
});
