import { Request, Response } from "express";
import {
  createUserData,
  generateToken,
  encryptPassword,
  findUserByEmailOrUserId,
  comparePassword,
} from "../services/UserService";
import { AuthenticatedRequest } from "../services/UserService";
import { CustomError } from "../middleware/errorHandling";

const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await findUserByEmailOrUserId({ email });
  if (user) {
    throw new CustomError("Email already exists", 400);
  }
  const hashedPassword = await encryptPassword(password);
  const userId = await createUserData(name, email, hashedPassword);
  const token = generateToken(userId);
  res.status(200).json({
    success: true,
    message: "User created successfully",
    token,
  });
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await findUserByEmailOrUserId({ email });

  comparePassword(password, user.password);

  const token = generateToken(user.userId);
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    token,
  });
};

const getuser = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new CustomError("Invalid user", 404);
  }
  const { email, name } = await findUserByEmailOrUserId({ userId: user.id });
  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    user: {
      name,
      email,
    },
  });
};

const updateuser = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "User updated successfully",
  });
};

export { createUser, loginUser, getuser, updateuser };
