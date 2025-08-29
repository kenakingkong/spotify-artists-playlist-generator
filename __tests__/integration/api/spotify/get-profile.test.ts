/**
 * @jest-environment node
 */

describe("---placeholder---", () => {
  it("should return a 200 status with a dummy body", async () => {
    // Simulated response
    const response = {
      status: 200,
      json: async () => ["item1", "item2"],
    };

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.length).toBe(2);
  });
});
