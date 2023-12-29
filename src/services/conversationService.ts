import { User } from "../models/User";
import { Message } from "../models/Message";
import { Conversation } from "../models/Conversation";
import { ConversationMember } from "../models/ConversationMember";
import { CustomError } from "../middleware/errorHandling";

const getAllConversationData = async (email: string | undefined) => {
  if (!email) {
    throw new CustomError("Invalid data", 400);
  }

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new CustomError("User does not exist", 400);
    }
    const conversationData = await ConversationMember.findAll({
      where: {
        userId: user.email,
      },
      include: [
        {
          model: Conversation,
          include: [
            User,
            {
              model: Message,
              limit: 1,
              order: [["createdAt", "DESC"]],
            },
          ],
        },
      ],
    });
    return conversationData;
  } catch (error) {
    console.log("Error in getAllConversationData:", error);
    throw new CustomError("Unable to get the Data", 400);
  }
};

const createOneToOneConversation = async (
  userEmail: string,
  senderEmail: string
): Promise<Conversation> => {
  try {
    const user = await User.findOne({
      where: {
        email: senderEmail,
      },
    });
    if (!user) {
      throw new CustomError("User does not exist", 400);
    }

    const conversation = await Conversation.create({ isGroup: false });
    await ConversationMember.create({
      emailId: userEmail,
      conversationId: conversation.conversationId,
    });
    await ConversationMember.create({
      emailId: senderEmail,
      conversationId: conversation.conversationId,
    });
    return conversation;
  } catch (error) {
    throw new CustomError("Unable to create conversation", 400);
  }
};

const createGroupConversation = async (
  userEmail: string,
  groupName: string
): Promise<Conversation> => {
  try {
    const conversation = await Conversation.create({
      isGroup: true,
      conversationName: groupName,
      groupAdmin: userEmail,
    });
    await ConversationMember.create({
      emailId: userEmail,
      conversationId: conversation.conversationId,
    });

    return conversation;
  } catch (error) {
    throw new CustomError("Unable to create conversation", 400);
  }
};

const addToGroup = async (
  adminEmail: string,
  conversationId: string,
  userEmail: string
) => {
  try {
    const user = await User.findOne({ where: { email: userEmail } });
    if (!user) {
      throw new CustomError("User does not exist", 400);
    }
    const conversation = await Conversation.findOne({
      where: { conversationId, groupAdmin: adminEmail },
    });
    if (!conversation) {
      throw new CustomError("Conversation does not exist", 400);
    }
    await ConversationMember.create({
      emailId: userEmail,
      conversationId: conversationId,
    });
  } catch (error) {
    throw new CustomError("Unable to add user to group", 400);
  }
};

const removeFromGroup = async (
  adminEmail: string,
  conversationId: string,
  userEmail: string
) => {
  try {
    const conversation = await Conversation.findOne({
      where: { conversationId, groupAdmin: adminEmail },
    });
    if (!conversation) {
      throw new CustomError("Conversation does not exist", 400);
    }
    const members = await ConversationMember.findAll({
      where: { conversationId },
    });
    members.forEach(async (member) => {
      if (member.emailId === userEmail) {
        await member.destroy();
      }
    });
    await ConversationMember.destroy({
      where: { emailId: userEmail, conversationId },
    });
  } catch (error) {
    throw new CustomError("Unable to remove user from group", 400);
  }
};

const renameGroupChat = async (
  adminEmail: string,
  conversationId: string,
  newGroupName: string
) => {
  try {
    const group = await Conversation.findOne({
      where: { conversationId, groupAdmin: adminEmail },
    });
    if (!group) {
      throw new CustomError("Conversation does not exist", 400);
    }
    await group.update({ conversationName: newGroupName });
  } catch (error) {
    throw new CustomError("Unable to rename group chat", 400);
  }
};

export {
  getAllConversationData,
  createOneToOneConversation,
  createGroupConversation,
  addToGroup,
  removeFromGroup,
  renameGroupChat,
};
