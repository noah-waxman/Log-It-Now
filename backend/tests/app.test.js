import request from "supertest";
import app from "../app.js";
import { truncateTable } from "../db.js";

beforeEach(async () => {
  await truncateTable("users");
});

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
  describe("when an email that already exists is provided", () => {
    it("returns status 409 and an error", async () => {
      const payload = {
        name: "noah",
        email: "test@example.com",
        password: "password",
      };

      await request(app)
        .post("/auth/register")
        .set("Content-Type", "application/json")
        .send(payload);

      const res = await request(app)
        .post("/auth/register")
        .set("Content-Type", "application/json")
        .send(payload);

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toBe("Email already exists");
    });
  });
  describe("when required fields are missing", () => {
    it.each([
      [{ email: "test@example.com", password: "password" }, "name"],
      [{ name: "noah", password: "password" }, "email"],
      [{ name: "noah", email: "test@example.com" }, "password"],
      [{}, "all fields"],
    ])("returns 400 when %s is missing", async (payload) => {
      const res = await request(app).post("/auth/register").send(payload);

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Name, email, and password are required.");
    });
  });
});
