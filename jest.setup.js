import mongoose from "mongoose";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/testdb");
});

afterAll(async () => {
  await mongoose.connection.close();
});
