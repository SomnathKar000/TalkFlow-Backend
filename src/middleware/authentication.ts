import { Response, NextFunction } from "express";
import { CustomError } from "./errorHandling";
import { validateToken, AuthenticatedRequest } from "../services/UserService";

const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["auth-token"];

  if (!token) {
    throw new CustomError("Authentication Failed", 401);
  }
  const authToken = Array.isArray(token) ? token[0] : token;
  const userData = validateToken(authToken);
  req.user = userData.user;
  next();
};

export { authenticate };
