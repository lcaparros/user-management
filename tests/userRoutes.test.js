import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import userRoutes from "../routes/userRoutes.js";
import authRoutes from "../routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

let adminToken, userToken;

describe("User Routes", () => {
  beforeAll(async () => {
    await User.deleteMany({});

    await request(app)
      .post("/api/auth/register")
      .send({
        username: "adminuser",
        email: "admin@example.com",
        password: "adminpassword",
        roles: ["admin"],
      });

    const adminResponse = await request(app).post("/api/auth/login").send({
      email: "admin@example.com",
      password: "adminpassword",
    });

    adminToken = adminResponse.body.token;

    await request(app)
      .post("/api/auth/register")
      .send({
        username: "normaluser",
        email: "user@example.com",
        password: "userpassword",
        roles: ["user"],
      });

    const userResponse = await request(app).post("/api/auth/login").send({
      email: "user@example.com",
      password: "userpassword",
    });

    userToken = userResponse.body.token;
  });

  afterAll(async () => {
    await User.deleteMany({});
    mongoose.connection.close();
  });

  test("Get list of users with admin role", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `${adminToken}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("Access denied for non-admin role", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `${userToken}`);
    expect(response.statusCode).toBe(403);
    expect(response.body.message).toBe(
      "Access denied. You do not have the required roles."
    );
  });

  test("Access denied without token", async () => {
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Access denied. No token provided.");
  });

  test("Access denied with invalid token", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", "invalidtoken");
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid token");
  });

  test("Access denied with expired token", async () => {
    const expiredToken = jwt.sign(
      { id: new mongoose.Types.ObjectId(), roles: ["admin"] },
      process.env.JWT_SECRET,
      { expiresIn: "-1s" }
    );

    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `${expiredToken}`);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Token expired");
  });
});
