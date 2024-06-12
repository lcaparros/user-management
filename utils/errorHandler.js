export const errorHandler = (res, error) => {
  console.error(error);

  if (error.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid token" });
  } else if (error.name === "TokenExpiredError") {
    res.status(401).json({ message: "Token expired" });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
};
