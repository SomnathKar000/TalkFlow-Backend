import { User } from "../models/User";
import { sequelize } from "../utils/database";
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
    const conversationData = await sequelize.query(
      `SELECT * FROM conversation WHERE conversationId IN (SELECT DISTINCT conversationId FROM ConversationMembers WHERE emailId = '${user.email}')`
    );
    return conversationData;
  } catch (error) {
    console.log("Error in getAllConversationData:", error);
    throw new CustomError("Unable to get the Data", 400);
  }
};

const createOneToOneConversation = async (
  userId: string,
  senderEmail: string
): Promise<Conversation> => {
  try {
    const user1 = await User.findOne({
      where: {
        email: senderEmail,
      },
    });
    const user2 = await User.findOne({
      where: {
        userId,
      },
    });
    if (!user1 || !user2) {
      throw new CustomError("User does not exist", 400);
    }

    const conversation = await Conversation.create({ isGroup: false });
    await ConversationMember.create({
      emailId: user2.email,
      userName: user2.name,
      conversationId: conversation.conversationId,
    });
    await ConversationMember.create({
      emailId: senderEmail,
      userName: user1.name,
      conversationId: conversation.conversationId,
    });
    return conversation;
  } catch (error) {
    console.log(error);
    throw new CustomError("Unable to create conversation", 400);
  }
};

const createGroupConversation = async (
  userId: string,
  groupName: string
): Promise<Conversation> => {
  try {
    const user = await User.findOne({
      where: {
        userId,
      },
    });
    if (!user) {
      throw new CustomError("User does not exist", 400);
    }
    const conversation = await Conversation.create({
      isGroup: true,
      conversationName: groupName,
      groupAdmin: user.email,
    });
    await ConversationMember.create({
      emailId: user.email,
      userName: user.name,
      conversationId: conversation.conversationId,
    });

    return conversation;
  } catch (error) {
    throw new CustomError("Unable to create conversation", 400);
  }
};

const addToGroupService = async (
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
      userName: user.name,
      conversationId: conversationId,
    });
  } catch (error) {
    throw new CustomError("Unable to add user to group", 400);
  }
};

const removeFromGroupService = async (
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

const renameGroupChatService = async (
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
  addToGroupService,
  removeFromGroupService,
  renameGroupChatService,
};
