import request from "supertest";
import express from "express";
import User from "../models/User.js";
import authRoutes from "../routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("Auth Controller", () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  test("Register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
        roles: ["user"],
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("User registered successfully");

    const user = await User.findOne({ email: "testuser@example.com" });
    expect(user).not.toBeNull();
    expect(user.username).toBe("testuser");
    expect(user.roles).toContain("user");
  });

  test("Login with registered user", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
