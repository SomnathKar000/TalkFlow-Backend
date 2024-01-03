import {
  Model,
  DataTypes,
  Sequelize,
  HasManyAddAssociationMixin,
} from "sequelize";
import { sequelize } from "../utils/database";
import { ConversationMember } from "./ConversationMember";

export class Conversation extends Model {
  public conversationId!: string;
  public isGroup!: boolean;
  public conversationName!: string;
  public latestMessage!: string;
  public groupAdmin!: string;
  public readonly createdAt!: Date;

  // public getMembers!: HasManyAddAssociationMixin<ConversationMember, string>;
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

// Conversation.hasMany(ConversationMember, {
//   foreignKey: "conversationId",
//   sourceKey: "conversationId",
// });
