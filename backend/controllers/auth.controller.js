const authService = require("../services/auth.service");

async function registerUser(request, response, next) {
  try {
    const registeredUser = await authService.registerUser(
      request.body
    );

    return response.status(201).json({
      message: "User registered successfully",
      user: registeredUser,
    });
  } catch (error) {
    return next(error);
  }
}


async function loginUser(request, response, next) {
  try {
    const loginResult = await authService.loginUser(
      request.body
    );

    return response.status(200).json({
      message: "Login successful",
      user: loginResult.user,
      token: loginResult.token,
    });
  } catch (error) {
    return next(error);
  }
}

function getCurrentUser(request, response) {
  return response.status(200).json({
    message: "Authentication token is valid",
    user: request.user,
  });
}

module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  getCurrentUser: getCurrentUser,
};