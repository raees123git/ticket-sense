const jwt = require("jsonwebtoken");
const AppError = require("../errors/app-error");

function authenticateUser(request, response, next) {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    return next(
      new AppError(
        "Authentication required. Please log in.",
        401
      )
    );
  }

  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(
      new AppError(
        "Invalid authorization header",
        401
      )
    );
  }

  try {
    const decodedPayload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    request.user = {
      id: decodedPayload.userId,
      role: decodedPayload.role,
    };

    next();
  } catch (error) {
    return next(
      new AppError(
        "Invalid or expired authentication token",
        401
      )
    );
  }
}

module.exports = {
  authenticateUser: authenticateUser,
};