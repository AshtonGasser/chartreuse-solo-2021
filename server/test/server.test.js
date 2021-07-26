let app = require("../server");
let testServer = require("supertest");

describe("Test ROOT path", () => {
  it("should return 200 for /api/user/logout", async () => {
    // make a request!
    const response = await testServer(app).post("/api/user/logout");
    // analyze response!
    expect(response.statusCode).toBe(200);
  });
});
