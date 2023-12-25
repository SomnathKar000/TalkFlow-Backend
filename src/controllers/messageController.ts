import { Response } from "express";
import { AuthenticatedRequest } from "../services/UserService";
import { getallMessages, newMessage } from "../services/messageService";
import { CustomError } from "../middleware/errorHandling";

const getAllMessages = (req: AuthenticatedRequest, res: Response) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError("Email is required", 400);
  }
  const messages = getallMessages(email);

  res
    .status(200)
    .json({
      success: true,
      message: "Successfully feched all messages",
      messages,
    });
};

const sendMessage = (req: AuthenticatedRequest, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Successfully sent a message" });
};

export { getAllMessages, sendMessage };
