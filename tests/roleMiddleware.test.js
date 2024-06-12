import { verifyRoles } from "../middlewares/roleMiddleware.js";
import { jest } from "@jest/globals";

describe("Role Middleware", () => {
  const next = jest.fn();

  test("User with required role passes", () => {
    const req = {
      user: { roles: ["admin"] },
    };
    const res = {};
    const middleware = verifyRoles("admin");
    middleware(req, res, next);
    expect(next).toBeCalled();
  });

  test("User without required role fails", () => {
    const req = {
      user: { roles: ["user"] },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const middleware = verifyRoles("admin");
    middleware(req, res, next);
    expect(res.status).toBeCalledWith(403);
    expect(res.json).toBeCalledWith({
      message: "Access denied. You do not have the required roles.",
    });
  });
});
