const AppError = require("../errors/app-error");

function validateLogin(request, response, next) {
  const { email, password } = request.body;

  if (!email?.trim() || !password) {
    return next(
      new AppError("Email and password are required", 400)
    );
  }

  if (!email.includes("@")) {
    return next(
      new AppError("Please provide a valid email address", 400)
    );
  }

  next();
}

module.exports = {
  validateLogin: validateLogin,
};