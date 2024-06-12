export const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
      return res
        .status(403)
        .json({ message: "Access denied. No roles provided." });
    }
    const rolesArray = [...allowedRoles];
    const userRoles = req.user.roles;
    console.log(req.user);

    const hasRole = userRoles.some((role) => rolesArray.includes(role));

    if (!hasRole) {
      return res.status(403).json({
        message: "Access denied. You do not have the required roles.",
      });
    }

    next();
  };
};
