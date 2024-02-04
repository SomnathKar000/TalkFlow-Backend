import { DataTypes, Sequelize, Model } from "sequelize";
import { sequelize } from "../utils/database";
import { User } from "./User";
import { Conversation } from "./Conversation";

export class Message extends Model {
  public messageId!: string;
  public senderId!: string;
  public senderName!: string;
  public message_text!: string;
  public conversationId!: string;
  public readonly date!: Date;
}

Message.init(
  {
    messageId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal("uuid_generate_v4()"),
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
    },
    senderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conversationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Conversation,
        key: "conversationId",
      },
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("now"),
    },
  },
  {
    sequelize,
    modelName: "Message",
    tableName: "messages",
    timestamps: true,
  }
);
