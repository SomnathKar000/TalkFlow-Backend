import { CustomError } from "../middleware/errorHandling";
import { Message } from "../models/Message";

const getallMessages = async (conversationId: string | undefined) => {
  if (!conversationId) {
    throw new CustomError("Invalid data", 400);
  }

  try {
    const messages = await Message.findAll({
      where: {
        conversationId,
      },
      order: [["date", "ASC"]],
    });
    return messages;
  } catch (error) {
    throw new CustomError("Unable to get messages", 400);
  }
};

const newMessage = async (
  senderId: string,
  message_text: string,
  conversationId: string
) => {
  try {
    await Message.create({
      senderId,
      message_text,
      conversationId,
    });
    return true;
  } catch (error) {
    throw new CustomError("Unable to send message", 400);
  }
};

export { getallMessages, newMessage };
