import { Response } from "express";
import { AuthenticatedRequest } from "../services/UserService";
const getAllMessages = (req: AuthenticatedRequest, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Successfully feched all messages" });
};

const sendMessage = (req: AuthenticatedRequest, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: "Successfully sent a message" });
};

export { getAllMessages, sendMessage };
