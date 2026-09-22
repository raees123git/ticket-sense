const AppError = require("../errors/app-error");

function validateRegister(request, response, next) {
  const { name, email, password } = request.body;

  if (!name?.trim() || !email?.trim() || !password) {
    return next(
      new AppError("Name, email, and password are required", 400)
    );
  }

  if (!email.includes("@")) {
    return next(
      new AppError("Please provide a valid email address", 400)
    );
  }

  if (password.length < 8) {
    return next(
      new AppError("Password must contain at least 8 characters", 400)
    );
  }

  next();
}

module.exports = {
  validateRegister,
};