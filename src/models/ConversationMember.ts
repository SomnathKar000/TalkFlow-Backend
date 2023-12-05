import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/database";
import { User } from "./User";
import { Conversation } from "./Conversation";

export class ConversationMember extends Model {
  public userId!: string;
  public conversationId!: string;
  public readonly joinedDateTime!: Date;
}

ConversationMember.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: User,
        key: "userId",
      },
    },
    conversationId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Conversation,
        key: "conversationId",
      },
    },
    joinedDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    },
  },
  {
    sequelize,
    modelName: "ConversationMember",
    tableName: "conversationMembers",
    timestamps: true,
  }
);
