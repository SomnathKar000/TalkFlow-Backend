import { Response } from "express";
import { AuthenticatedRequest } from "../services/UserService";
import { CustomError } from "../middleware/errorHandling";
import { findUserByEmailOrUserId } from "../services/UserService";
import {
  createOneToOneConversation,
  createGroupConversation,
} from "../services/conversationService";

const createConversation = async (req: AuthenticatedRequest, res: Response) => {
  const { senderEmail } = req.body;
  const userId = req.user!.id;
  if (!senderEmail) {
    throw new CustomError("Sender email is required", 400);
  }

  const user = await findUserByEmailOrUserId({ userId });

  const { conversationId } = await createOneToOneConversation(
    user.email,
    senderEmail
  );
  res.status(200).json({
    success: true,
    message: "Conversation created successfully",
    conversationId,
  });
};
const createGroupChat = async (req: AuthenticatedRequest, res: Response) => {
  const { groupName } = req.body;
  const userId = req.user!.id;
  if (!groupName) {
    throw new CustomError("Group name is required", 400);
  }
  const user = await findUserByEmailOrUserId({ userId });

  const { conversationId } = await createGroupConversation(
    user.email,
    groupName
  );
  res
    .status(200)
    .json({
      success: true,
      message: "Group chat created successfully",
      conversationId,
    });
};
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
