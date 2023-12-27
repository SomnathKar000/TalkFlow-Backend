import { Response } from "express";
import { AuthenticatedRequest } from "../services/UserService";
import { CustomError } from "../middleware/errorHandling";

const createConversation = (req: AuthenticatedRequest, res: Response) => {};
const createGroupChat = (req: AuthenticatedRequest, res: Response) => {};
const renameGroupChat = (req: AuthenticatedRequest, res: Response) => {};
const addToGroup = (req: AuthenticatedRequest, res: Response) => {};
const removeFromGroup = (req: AuthenticatedRequest, res: Response) => {};

export {
  createGroupChat,
  createConversation,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
};
