import { Response } from "express";
import { AuthenticatedRequest } from "../services/UserService";
import { findUserByEmailOrUserId } from "../services/UserService";
import {
  createOneToOneConversation,
  createGroupConversation,
  renameGroupChatService,
  addToGroupService,
  removeFromGroupService,
} from "../services/conversationService";

const createConversation = async (req: AuthenticatedRequest, res: Response) => {
  const { senderEmail } = req.body;
  const userId = req.user?.id!;

  const { conversationId } = await createOneToOneConversation(
    userId,
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
  const userId = req.user?.id!;

  const { conversationId } = await createGroupConversation(userId, groupName);
  res.status(200).json({
    success: true,
    message: "Group chat created successfully",
    conversationId,
  });
};
const renameGroupChat = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  const { conversationId, groupName } = req.body;
  const user = await findUserByEmailOrUserId({ userId });

  await renameGroupChatService(user.email, conversationId, groupName);

  res.status(200).json({
    success: true,
    message: "Group chat renamed successfully",
  });
};
const addToGroup = async (req: AuthenticatedRequest, res: Response) => {
  const { userEmail, conversationId } = req.body;
  const userId = req.user?.id;
  const user = await findUserByEmailOrUserId({ userId });
  await addToGroupService(user.email, conversationId, userEmail);
  res.status(200).json({
    success: true,
    message: "User added to group successfully",
  });
};
const removeFromGroup = async (req: AuthenticatedRequest, res: Response) => {
  const { conversationId, userEmail } = req.body;
  const userId = req.user?.id;
  const user = await findUserByEmailOrUserId({ userId });
  await removeFromGroupService(user.email, conversationId, userEmail);
  res.status(200).json({
    success: true,
    message: "User removed from group successfully",
  });
};

export {
  createGroupChat,
  createConversation,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
};
