const request = require("supertest");
const app = require('./../src/main')

describe("GET /", () => {
  it("respond with ", (done) => {
    request(app).get("/api/").expect("Hello World", done);
  })
});