const request = require("supertest");
const app = require("../../src/app");

describe("GET /api/health", () => {
  it("returns the API health response", async () => {
    const response = await request(app).get("/api/health").expect(200);

    expect(response.body).toEqual({
      success: true,
      message: "UniApply SA API is running.",
    });
  });
});
