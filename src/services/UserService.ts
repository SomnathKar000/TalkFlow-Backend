import jwt from "jsonwebtoken";
import { Request } from "express";
import { config } from "dotenv";
import { genSalt, hash, compare } from "bcryptjs";
import { User } from "../models/User";
import { CustomError } from "../middleware/errorHandling";

config();

const JWT_SECRET = process.env.JWT_SECRET!;

interface TokenData {
  user: {
    id: string;
  };
}
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

const validateToken = (token: string): TokenData => {
  try {
    const data = jwt.verify(token, JWT_SECRET) as TokenData;
    return data;
  } catch (error) {
    throw new CustomError("Invalid token", 400);
  }
};

const generateToken = (id: string): string => {
  const userData: TokenData = {
    user: {
      id,
    },
  };
  const token = jwt.sign(userData, JWT_SECRET);
  return token;
};

const encryptPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<void> => {
  const isMatch = await compare(password, hashedPassword);
  if (!isMatch) {
    throw new CustomError("Invalid password", 400);
  }
};

const createUserData = async (
  name: string,
  email: string,
  password: string
): Promise<string> => {
  try {
    const { userId } = await User.create({ name, email, password });
    return userId;
  } catch (error) {
    throw new CustomError("Unable to create user", 400);
  }
};

const findUserByEmailOrUserId = async (data: {
  email?: string;
  userId?: string;
}) => {
  if (!data.email && !data.userId) {
    throw new CustomError("Invalid data", 400);
  }
  const condition = data.email
    ? { email: data.email }
    : { userId: data.userId };
  try {
    const user = await User.findOne({ where: condition });
    if (!user) {
      throw new CustomError("User does not exist", 400);
    }
    return user;
  } catch (error) {
    throw new CustomError("Unable to find user", 400);
  }
};

export {
  validateToken,
  generateToken,
  encryptPassword,
  comparePassword,
  createUserData,
  findUserByEmailOrUserId,
};
