import { Response } from "express";
import {
  AuthenticatedRequest,
  findUserByEmailOrUserId,
} from "../services/UserService";
import {
  getallMessages,
  newMessage,
  getConversationMessages,
} from "../services/messageService";
import { CustomError } from "../middleware/errorHandling";

const getAllMessages = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  const user = await findUserByEmailOrUserId({ userId });
  const messages = await getallMessages(user.email);

  res.status(200).json({
    success: true,
    message: "Successfully feched all messages",
    messages,
  });
};

const sendMessage = async (req: AuthenticatedRequest, res: Response) => {
  const senderId = req.user?.id;
  if (senderId === undefined) {
    throw new CustomError("Invalid user", 400);
  }
  const { message } = req.body;
  const { conversationId } = req.params;

  await newMessage(senderId, message, conversationId);
  res
    .status(200)
    .json({ success: true, message: "Successfully sent a message" });
};

const getConversation = async (req: AuthenticatedRequest, res: Response) => {
  const { conversationId } = req.params;
  const messages = await getConversationMessages(conversationId);

  res.status(200).json({
    success: true,
    message: "Successfully fetched conversation",
    messages,
  });
};

export { getAllMessages, sendMessage, getConversation };
