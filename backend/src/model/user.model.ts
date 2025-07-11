import {
  Column,
  DataType,
  Table,
  CreatedAt,
  UpdatedAt,
  HasMany,
  Model,
} from "sequelize-typescript";
import { IUser, IUserCreate } from "../interface/user.interface";
import { Message } from "./message.model";
@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model<IUser, IUserCreate> implements IUser {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  username!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  avatar?: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isOnline!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @HasMany(() => Message)
  messages!: Message[];
}
