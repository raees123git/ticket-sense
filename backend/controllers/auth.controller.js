function registerUser(request, response) {
  const { name, email } = request.body;

  return response.status(201).json({
    message: "Registration route is working",
    user: {
      name,
      email,
    },
  });
}

module.exports = {
  registerUser,
};