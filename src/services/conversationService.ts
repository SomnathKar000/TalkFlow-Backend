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

export { getAllConversationData };
