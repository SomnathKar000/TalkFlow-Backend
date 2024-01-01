import {
  Sequelize,
  DataTypes,
  Model,
  BelongsToGetAssociationMixin,
} from "sequelize";
import { sequelize } from "../utils/database";
import { User } from "./User";
import { Conversation } from "./Conversation";

export class ConversationMember extends Model {
  public emailId!: string;
  public conversationId!: string;
  public readonly joinedDateTime!: Date;

  public getUser!: BelongsToGetAssociationMixin<User>;
  public getConversation!: BelongsToGetAssociationMixin<Conversation>;
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
    tableName: "conversationMembers",
    timestamps: true,
  }
);
