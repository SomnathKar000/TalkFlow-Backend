import { CustomError } from "../middleware/errorHandling";
import { Conversation } from "../models/Conversation";
import { ConversationMember } from "../models/ConversationMember";
import { Message } from "../models/Message";
import { User } from "../models/User";

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
    });
    const conversations = await Promise.all(
      conversationIds.map(
        async ({ conversationId }) =>
          await Conversation.findConversationWithMembers(conversationId)
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
    const user = await User.findOne({
      where: { userId: senderId },
    });
    if (!user) {
      throw new CustomError("User does not exist", 400);
    }
    await conversation.update({ latestMessage: message_text });
    const MessageData = await Message.create({
      senderId,
      senderName: user.name,
      message_text,
      conversationId,
    });
    const message = {
      messageId: MessageData.messageId,
      senderName: MessageData.senderName,
      message_text,
      date: MessageData.date,
    };
    return message;
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
