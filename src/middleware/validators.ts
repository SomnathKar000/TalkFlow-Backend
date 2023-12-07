import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../services/UserService";
import { CustomError } from "../middleware/errorHandling";

const loginValidator = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isLength({ min: 5 }).withMessage("Invalid Password"),
];
const createUserValidator = loginValidator.concat([
  body("name").isLength({ min: 3 }).withMessage("Invalid Name"),
]);

const validationErrorHandler = (
  req: AuthenticatedRequest | Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new CustomError(error.array()[0].msg, 400);
  }
  next();
};

export { loginValidator, createUserValidator, validationErrorHandler };
