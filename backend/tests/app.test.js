import request from "supertest";
import app from "../app.js";

describe("Express App Tests", () => {
  it("GET / should return 200 and a message", async () => {
    const res = await request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(res.body.message).toBe("Hello World");
  });
});

describe("POST /auth/register", () => {
  describe("when valid credentials are provided", () => {
    it("returns 201 and a message", async () => {
      const payload = {
        name: "noah",
        email: "test@example.com",
        password: "password",
      };

      const res = await request(app)
        .post("/auth/register")
        .set("Content-Type", "application/json")
        .send(payload);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("email");
      expect(res.body).toHaveProperty("name");
      expect(res.body.message).toBe("Successfully created a new user");
      expect(res.body.email).toBe(payload.email);
      expect(res.body.name).toBe(payload.name);
      expect(res.body.id).toBeDefined();
    });
  });
});
