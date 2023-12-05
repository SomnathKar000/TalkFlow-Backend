import { Sequelize, Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

export class User extends Model {
  public userId!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public pic!: string;
  public readonly createdAt!: Date;
}

User.init(
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal("uuid_generate_v4()"),
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    },
  },
  {
    sequelize,
    tableName: "user",
    modelName: "User",
    timestamps: true,
  }
);
