import {
  Model,
  DataTypes,
  Sequelize,
  HasManyAddAssociationMixin,
} from "sequelize";
import { sequelize } from "../utils/database";
import { Message } from "./Message";
import { ConversationMember } from "./ConversationMember";

export class Conversation extends Model {
  public conversationId!: string;
  public isGroup!: boolean;
  public conversationName!: string;
  public latestMessage!: string;
  public groupAdmin!: string;
  public readonly createdAt!: Date;

  public getMembers!: HasManyAddAssociationMixin<ConversationMember, string>;
  public static async findConversationWithMembers(conversationId: string) {
    return this.findByPk(conversationId, {
      include: [
        {
          model: Message,
          where: { conversationId },
          attributes: ["messageId", "senderName", "message_text", "date"],
        },
        {
          model: ConversationMember,
          where: { conversationId },
        },
      ],
    });
  }
}

Conversation.init(
  {
    conversationId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal("uuid_generate_v4()"),
    },
    isGroup: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    conversationName: {
      type: DataTypes.STRING,
    },
    latestMessage: {
      type: DataTypes.STRING,
    },
    groupAdmin: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: "conversation",
    modelName: "Conversation",
  }
);

Conversation.hasMany(Message, {
  foreignKey: "conversationId",
  sourceKey: "conversationId",
});

Conversation.hasMany(ConversationMember, {
  foreignKey: "conversationId",
  sourceKey: "conversationId",
});
