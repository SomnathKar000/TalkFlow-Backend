import { body, validationResult, param } from "express-validator";
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

const getConversationValidator = [
  param("conversationId")
    .isLength({ min: 3 })
    .withMessage("Invalid Conversation Id"),
];
const newMessageValidator = getConversationValidator.concat([
  body("message").isLength({ min: 3 }).withMessage("Invalid Message"),
]);

const addOrRemoveFromGroupValidator = [
  body("conversationId").exists().withMessage("conversationId is required"),
  body("userEmail").isEmail().withMessage("Invalid userEmail"),
];

const createGroupChatValidator = [
  body("groupName").exists().withMessage("Provide groupName"),
];

const renameGroupChatValidator = createGroupChatValidator.concat([
  body("conversationId").exists().withMessage("conversationId is required"),
]);

const createConversationValidator = [
  body("senderEmail").isEmail().withMessage("Invalid senderEmail"),
];

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

export {
  loginValidator,
  createUserValidator,
  newMessageValidator,
  addOrRemoveFromGroupValidator,
  createGroupChatValidator,
  renameGroupChatValidator,
  createConversationValidator,
  validationErrorHandler,
};
