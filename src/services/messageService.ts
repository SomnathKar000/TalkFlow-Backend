import { CustomError } from "../middleware/errorHandling";
import { Conversation } from "../models/Conversation";
import { ConversationMember } from "../models/ConversationMember";
import { Message } from "../models/Message";

const getallMessages = async (email: string | undefined) => {
  if (!email) {
    throw new CustomError("Invalid data", 400);
  }
  console.log(email);
  try {
    const conversationIds = await ConversationMember.findAll({
      where: {
        emailId: email,
      },
      attributes: ["conversationId"],
    });
    const conversations = await Promise.all(
      conversationIds.map(
        async ({ conversationId }) =>
          await Conversation.findAll({ where: { conversationId } })
      )
    );

    return conversations;
  } catch (error) {
    console.log(error);
    throw new CustomError("Unable to get messages", 400);
  }
};

const newMessage = async (
  senderId: string,
  message_text: string,
  conversationId: string
) => {
  try {
    const conversation = await Conversation.findOne({
      where: {
        conversationId,
      },
    });
    if (!conversation) {
      throw new CustomError("Conversation does not exist", 400);
    }
    await conversation.update({ latestMessage: message_text });
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

const getConversationMessages = async (
  conversationId: string
): Promise<Message[]> => {
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

export { getallMessages, newMessage, getConversationMessages };
