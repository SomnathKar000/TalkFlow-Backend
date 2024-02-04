import {
  Sequelize,
  DataTypes,
  Model,
  HasManyAddAssociationMixin,
} from "sequelize";
import { sequelize } from "../utils/database";
import { User } from "./User";
import { Conversation } from "./Conversation";

export class ConversationMember extends Model {
  public emailId!: string;
  public conversationId!: string;
  public readonly joinedDateTime!: Date;
}

ConversationMember.init(
  {
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: User,
        key: "email",
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
    tableName: "conversationmembers",
    timestamps: true,
  }
);
