const { generateToken } = require("../utils/jwt");
const bcrypt = require("bcryptjs");
const AppError = require("../errors/app-error");
const prisma = require("../config/prisma");

async function registerUser(userData) {
  const normalizedEmail = userData.email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingUser) {
    throw new AppError(
      "A user with this email already exists",
      409
    );
  }

  const passwordHash = await bcrypt.hash(userData.password, 10);

  const createdUser = await prisma.user.create({
    data: {
      name: userData.name.trim(),
      email: normalizedEmail,
      passwordHash: passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    // This select tells Prisma to return only these fields after creating the user. we are not returning back the password intentionally.
  });

  return createdUser;
}


async function loginUser(loginData) {
  const normalizedEmail = loginData.email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!existingUser) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(
    loginData.password,
    existingUser.passwordHash
  );

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  const safeUser = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role,
    createdAt: existingUser.createdAt,
  };

  const token = generateToken(safeUser);
  return {
    user: safeUser,
    token: token,
  };
}



module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
};